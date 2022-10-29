/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";
import {
  Title,
  Content,
  Table,
  Heading,
  Divider,
  Timeline,
  Button,
  Cta,
  CardRules,
  Example,
  Profile,
  Groups,
  TeamSelect,
} from "@components";
import Select from "react-select";
import { getData, postData } from "utils/api";
import { fetchData } from "utils/apiNft";
import {
  tableData,
  headingData,
  cardRulesData,
  ctaData,
  examplesData,
  timelineData,
  profileData,
  paymentOptions,
} from "utils/data";
import { useWallet } from "@solana/wallet-adapter-react";
import { getSession, useSession, signOut } from "next-auth/react";
import base58 from "bs58";
import { apiPost } from "../utils/apiPost";
import { signIn } from "next-auth/react";
import SendSolanaTokens from "utils/sendTransaction";
import SendSolanaSplTokens from "utils/splTransaction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ accountData, nfts, sweepstakes }) {
  const router = useRouter();
  const { publicKey, signMessage } = useWallet();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const {
    handleSolanaPayment,
    confirmationSolana,
    processingSolana,
    errorSolana,
  } = SendSolanaTokens();
  const { handlePayment, confirmation, processing, error } =
    SendSolanaSplTokens();

  const [count, setCount] = useState(0);
  const [groupStage, setGroupStage] = useState([]);
  const [output, setOutput] = useState(tableData);
  const [team, setTeam] = useState(null);
  const [paymentToken, setPaymentToken] = useState("");
  const [groupsFilled, setGroupsFilled] = useState(false);
  const [sweepstakeDisabled, setSweepstakeDisabled] = useState(false);

  // Fetched sweepstake predictions from API
  let predictions;
  let predictionsTransformed;

  if (sweepstakes) {
    predictions = sweepstakes[0]?.predictions;

    // TO-DO: points should be number
    predictionsTransformed = predictions?.map((item) => ({
      ...item,
      points: item?.points.toString(),
    }));
  }

  // Triggers a signature request if session (user) is not yet authenticated
  useEffect(() => {
    if (!session && status !== "authenticated") {
      publicKey && signCustomMessage();
    } else {
      return;
    }
  }, [publicKey]);

  // Signature function for signing messages with the user address.
  const signCustomMessage = async () => {
    if (publicKey) {
      const address = publicKey.toBase58();
      const message = address;
      const encodedMessage = new TextEncoder().encode(message);

      const signedMessage = await signMessage(encodedMessage, "utf8");
      const signature = base58.encode(signedMessage);
      console.log(signature);
      try {
        await signIn("authCredentials", {
          address,
          signature,
          redirect: false,
        });
        router.reload();
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  };

  // Check if groupstage (48 matches) is filled (types 0-7)
  useEffect(() => {
    output
      .slice(0, 48)
      ?.every((item) => item.scoreA !== null && item.scoreB !== null)
      ? setGroupsFilled(true)
      : setGroupsFilled(false);
  }, [output]);

  // Check function to see if an individual round is filled (types 8-12)
  const checkFilled = (round) => {
    return output?.filter(
      (item) => item.type === round && item.scoreA && item.scoreB
    );
  };

  // Check function to see if an individual round with draws is filled (types 8-12)
  const checkFilledDraw = (round) => {
    return output?.filter(
      (item) =>
        item.type === round &&
        !item.extensionWinner &&
        item.scoreA === item.scoreB
    );
  };

  // Keeps track of how many matches are filled in
  const filledCount =
    output.filter((item) => item.scoreA && item.scoreB).length + 1;

  // Status notifications based on the payment/transaction responses
  useEffect(() => {
    (processing || processingSolana) && toast("Processing...");
  }, [processing, processingSolana]);
  useEffect(() => {
    (confirmation || confirmationSolana) &&
      toast.success("Transaction completed!");
  }, [confirmation, confirmationSolana]);
  useEffect(() => {
    (errorSolana || errorSolana) && toast.error("Something went wrong!");
  }, [error, errorSolana]);

  // Transforms the predictions output to correct format which is accepted by the API
  // TO-DO: scoreA and scoreB should be numbers
  const transformOutputTypes = output?.map((item) => ({
    ...item,
    scoreA: Number(item?.scoreA),
    scoreB: Number(item?.scoreB),
  }));

  // The output that gets send to the API
  // Selected team and Predictions filled in by the user
  const finalOutput = {
    worldChampion: team?.value,
    predictions: transformOutputTypes,
  };

  // Submit transaction function which creates a payment/transaction
  const handleSubmit = () => {
    if (publicKey && session) {
      const paymentAmount = paymentOptions?.filter(
        (item) => item.value === paymentToken
      )[0].amount;

      if (paymentToken !== "sol") {
        handlePayment(
          paymentToken,
          process.env.NEXT_PUBLIC_TREASURE_ADDRESS,
          paymentAmount
        );
      } else {
        handleSolanaPayment(
          publicKey,
          process.env.NEXT_PUBLIC_TREASURE_ADDRESS,
          paymentAmount
        );
      }
    }
  };

  // Submit sweepstake function which sends the output to the database based on conditions
  const submitSweepstake = async () => {
    if (
      publicKey &&
      session &&
      team &&
      filledCount === 64 &&
      (confirmation || confirmationSolana)
    ) {
      const sweepstake = await postData(
        "https://backend-x7q2esrofa-no.a.run.app/api/v1/sweepstakes",
        session?.user?.credentials?.accessToken,
        finalOutput
      );
      console.log("confirmed");
      setSweepstakeDisabled(true);
      setCount(0);
      return sweepstake;
    }
  };

  console.log(output);

  // Triggers the submitSweepstake function based on conditions (confirmation)
  useEffect(() => {
    submitSweepstake();
  }, [confirmation, confirmationSolana]);
  console.log(predictionsTransformed);
  return (
    <div className={styles.home}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Divider height={40} />
      <Profile
        publicKey={publicKey?.toBase58()}
        nfts={nfts}
        disconnect={() => signOut({ redirect: false })}
        {...profileData}
      />
      <Divider height={100} />
      <Heading {...headingData} />
      <Divider height={20} />
      <Cta {...ctaData} />
      <Divider height={40} />
      <CardRules {...cardRulesData} />
      <Divider height={20} />
      <div className={styles.examples}>
        {examplesData?.map((example, index) => (
          <Example key={index} {...example} />
        ))}
      </div>
      <Divider height={80} />
      {/* TO-DO: Create a separate grid component for the table and timeline */}
      {session && (
        <>
          <TeamSelect onChange={(e) => setTeam(e)} />
          <Divider height={80} />
          <div className={styles.grid}>
            <div className={styles.gridWrapper}>
              <div className={styles.groupsWrapper}>
                <Groups
                  data={output}
                  count={count < 8 ? count : 7}
                  onChange={(e) => setGroupStage(e)}
                  onSelect={(e) => setCount(e)}
                />
              </div>
              <div className={styles.tableWrapper}>
                <div className={styles.timelineWrapper}>
                  <Timeline
                    count={count}
                    onChange={(e) => setCount(e)}
                    groupsFilled={groupsFilled}
                    ro16Filled={
                      checkFilled(8).length === 8 &&
                      checkFilledDraw(8).length === 0
                    }
                    quarterFilled={
                      checkFilled(9).length === 4 &&
                      checkFilledDraw(9).length === 0
                    }
                    semiFilled={
                      checkFilled(10).length === 2 &&
                      checkFilledDraw(10).length === 0
                    }
                    thirdFilled={
                      checkFilled(11).length === 1 &&
                      checkFilledDraw(11).length === 0
                    }
                    finalFilled={
                      checkFilled(12).length === 1 &&
                      checkFilledDraw(12).length === 0
                    }
                    {...timelineData}
                  />
                </div>
                <Table
                  groupStage={groupStage}
                  matches={
                    predictionsTransformed ? predictionsTransformed : output
                  }
                  count={count}
                  disabled={predictionsTransformed}
                  onChange={(e) => setOutput(e)}
                />
                <Divider height={20} />
                <div className={styles.actions}>
                  <div className={styles.pagination}>
                    <Button
                      classname={styles.next}
                      text={"Prev"}
                      link
                      onClick={() => setCount(count - 1)}
                      size={"m"}
                      disabled={count === 0}
                    />
                    {groupsFilled && count > 6 && count < 12 && (
                      <Button
                        classname={styles.next}
                        text={"Next"}
                        link
                        onClick={() => setCount(count + 1)}
                        size={"m"}
                      />
                    )}
                    {count >= 0 && count < 7 && (
                      <Button
                        classname={styles.next}
                        text={"Next"}
                        link
                        onClick={() => setCount(count + 1)}
                        size={"m"}
                      />
                    )}
                  </div>
                  {!sweepstakeDisabled && !predictionsTransformed && (
                    <div className={styles.submitWrapper}>
                      {filledCount === 64 && (
                        <Select
                          placeholder={"Choose token"}
                          options={paymentOptions}
                          onChange={(e) => setPaymentToken(e?.value)}
                          className={styles.select}
                        />
                      )}
                      <Button
                        text={
                          filledCount !== 64 && paymentToken === ""
                            ? `${filledCount}/64`
                            : "Submit"
                        }
                        color={"positive"}
                        textColor={"light"}
                        size={"xxs"}
                        disabled={
                          filledCount !== 64 || paymentToken === "" || !team
                        }
                        onClick={handleSubmit}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // Hk6pt29VWbTfFn9kfS58jhPhQA8qUesEBcq9pzJjeXW4

  let accountData;
  let accountMetadata;
  let accountMetadataUri;
  let nfts;

  if (session?.user?.address) {
    accountData = await fetchData("account", session?.user?.address, "nft");

    // accountMetadata = await Promise.all(
    //   accountData?.map(
    //     async (item) => await fetchData("nft", item?.mint, "metadata")
    //   )
    // );

    // accountMetadataUri = accountMetadata?.map(
    //   (item) => item?.metaplex?.metadataUri
    // );

    // // array of all nfts with traits, collection, name and image
    // nfts = await Promise.all(
    //   accountMetadataUri?.map(
    //     async (item) => await fetch(item).then((res) => res.json())
    //   )
    // );
  }

  const filteredNfts = nfts?.filter((item) => item?.symbol === "DIP");

  let user;

  if (session) {
    user = await getData(
      `https://backend-x7q2esrofa-no.a.run.app/api/v1/users/${session?.user?.user?.id}`
    );
  }

  return {
    props: {
      accountData: accountData || null,
      nfts: filteredNfts || null,
      users: null,
      sweepstakes: user?.sweepstakes || null,
    },
  };
}
