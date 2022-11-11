/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useTransition, useCallback } from "react";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
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
  Rules,
  Example,
  Profile,
  Groups,
  TeamSelect,
  Icon,
} from "@components";
import Select from "react-select";
import { getData, postData } from "utils/api";
import { fetchData } from "utils/apiMoralis";
import {
  tableData,
  headingData,
  headingRulesData,
  rulesData,
  ctaData,
  examplesData,
  paymentOptions,
  teams,
  profileData,
} from "utils/data";
import { useWallet } from "@solana/wallet-adapter-react";
import { getSession, useSession, signOut } from "next-auth/react";
import base58 from "bs58";
import { apiPost } from "../utils/apiPost";
import { signIn } from "next-auth/react";
import SendSolanaTokens from "utils/sendTransaction";
import SendSolanaSplTokens from "utils/splTransaction";
import { ToastContainer, toast } from "react-toastify";
import { useConnection } from "@solana/wallet-adapter-react";
import "react-toastify/dist/ReactToastify.css";
import { SystemProgram } from "@solana/web3.js";
import idl from "../utils/idl.json";

export default function Home({
  accountData,
  session,
  nfts,
  tokensBalance,
  solanaBalance,
  sweepstakes,
}) {
  const { connection } = useConnection();
  const router = useRouter();
  const wallet = useWallet();
  // const { data: session, status } = useSession();
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
  const [localUserState, setLocalUserState] = useState();

  const timelineData = {
    rounds: [
      {
        text: "Groups",
        onClick: () => setCount(0),
      },
      {
        text: "Ro16",
        onClick: () => setCount(8),
      },
      {
        text: "Quarter",
        onClick: () => setCount(9),
      },
      {
        text: "Semi",
        onClick: () => setCount(10),
      },
      {
        text: "3rd",
        onClick: () => setCount(11),
      },
      {
        text: "Final",
        onClick: () => setCount(12),
      },
    ],
  };

  // Triggers a signature request if session (user) is not yet authenticated
  useEffect(() => {
    if (session === null) {
      signCustomMessage();
    }
  }, [session, wallet.publicKey]);

  // If user switches wallet address during session, signout and disconnect
  useEffect(() => {
    if (wallet.publicKey && session) {
      if (wallet.publicKey?.toBase58() !== session?.user?.user?.address) {
        signOut();
        wallet.disconnect();
      }
    }
  }, [wallet.publicKey]);

  console.log(session);

  useEffect(() => {
    if (!localStorage.getItem("userState-storage")) {
      localStorage.setItem("userState-storage", web3.Keypair.generate());
    }
    setLocalUserState(localStorage.getItem("userState-storage"));
  }, []);

  const getProvider = () => {
    if (!wallet) {
      return;
    }
    return new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
  };

  console.log(session);
  // Signature function for signing messages with the user address.
  const signCustomMessage = async () => {
    if (wallet.publicKey) {
      const address = wallet.publicKey.toBase58();
      const message = address;
      const encodedMessage = new TextEncoder().encode(message);

      const signedMessage = await wallet.signMessage(encodedMessage, "utf8");
      const signature = base58.encode(signedMessage);
      try {
        await signIn("authCredentials", {
          address,
          signature,
          callbackUrl: "/",
        });
        const provider = getProvider();
        const program = new Program(idl, idl.metadata.address, provider);
        return program.methods
          .createUser(session?.user?.user?.id)
          .accounts({
            userState: localUserState?.publicKey,
            authority: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([localUserState, provider.wallet])
          .rpc();
      } catch (e) {
        console.log({ e });
        return null;
      }
    }
  };

  const fetchedTokensBalance = profileData?.tokens.map((item) => {
    return {
      ...item,
      available:
        Number([]?.filter((token) => item.mint === token.mint)[0]?.amount) ||
        item?.available,
    };
  });

  // Fetched sweepstake predictions from API

  let predictions;
  let predictionsTransformed;
  let worldChampion;
  let worldChampionTransformed;

  if (sweepstakes) {
    predictions = sweepstakes[0]?.predictions;
    worldChampion = sweepstakes[0]?.worldChampion;

    // TO-DO: points should be number
    predictionsTransformed = predictions?.map((item) => ({
      ...item,
      points: item?.points.toString(),
    }));

    worldChampionTransformed = {
      label: teams?.filter((item) => item.countryShortCode === worldChampion)[0]
        ?.countryName,
      value: worldChampion,
    };
  }

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
        !item.extensionA &&
        !item.extensionB &&
        item.scoreA === item.scoreB
    );
  };

  const ro16Filled =
    checkFilled(8).length === 8 && checkFilledDraw(8).length === 0;
  const quarterFilled =
    checkFilled(9).length === 4 && checkFilledDraw(9).length === 0;
  const semiFilled =
    checkFilled(10).length === 2 && checkFilledDraw(10).length === 0;
  const thirdFilled =
    checkFilled(11).length === 1 && checkFilledDraw(11).length === 0;
  const finalFilled =
    checkFilled(12).length === 1 && checkFilledDraw(12).length === 0;

  // Keeps track of how many matches are filled in
  const filledCount =
    output.filter((item) => item.scoreA && item.scoreB).length + 1;

  const disabledCheck =
    (!groupsFilled && count === 7) ||
    ((!groupsFilled || !ro16Filled) && count === 8) ||
    ((!groupsFilled || !ro16Filled || !quarterFilled) && count === 9) ||
    ((!groupsFilled || !ro16Filled || !quarterFilled || !semiFilled) &&
      count === 10) ||
    ((!groupsFilled ||
      !ro16Filled ||
      !quarterFilled ||
      !semiFilled ||
      !thirdFilled) &&
      count === 11);

  // Status notifications based on the payment/transaction responses
  useEffect(() => {
    processingSolana && toast("Processing...");
  }, [processingSolana]);

  useEffect(() => {
    processing && toast("Processing...");
  }, [processing]);

  useEffect(() => {
    confirmationSolana && toast.success("Transaction completed!");
  }, [confirmationSolana]);

  useEffect(() => {
    confirmation && toast.success("Transaction completed!");
  }, [confirmation]);

  useEffect(() => {
    errorSolana && toast.error("Something went wrong!");
  }, [errorSolana]);

  useEffect(() => {
    error && toast.error("Something went wrong!");
  }, [error]);

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
    worldChampion: team?.value || "AR",
    predictions: transformOutputTypes,
  };

  // Submit transaction function which creates a payment/transaction
  const handleSubmit = () => {
    if (wallet.publicKey && session) {
      const paymentAmount = paymentOptions?.filter(
        (item) => item.value === paymentToken
      )[0].amount;

      const paymentDecimals = paymentOptions?.filter(
        (item) => item.value === paymentToken
      )[0].decimals;

      // console.log(paymentAmount, "amount");
      // console.log(paymentDecimals, "decimals");
      if (paymentToken !== "sol") {
        console.log(paymentToken);
        handlePayment(
          paymentToken,
          process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS,
          paymentAmount,
          paymentDecimals
        );
      } else {
        console.log("solpayment");
        handleSolanaPayment(
          wallet.publicKey,
          process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS,
          paymentAmount
        );
      }
    }
  };

  // Submit sweepstake function which sends the output to the database based on conditions
  const submitSweepstake = async () => {
    if (
      wallet.publicKey &&
      session &&
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

  // Triggers the submitSweepstake function based on conditions (confirmation)
  useEffect(() => {
    submitSweepstake();
  }, [confirmation, confirmationSolana]);
  // console.log("pk", publicKey);
  // console.log("sess", session);

  const handleDisconnect = () => {
    signOut({ redirect: "/" });
  };

  // console.log(finalOutput);
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
        session={session}
        publicKey={wallet.publicKey?.toBase58()}
        nfts={nfts}
        disconnect={handleDisconnect}
        tokens={fetchedTokensBalance}
        solana={solanaBalance}
      />
      <Divider height={100} />
      <Heading {...headingData} />
      <Divider height={20} />
      <Cta {...ctaData} />
      <Divider height={80} />
      <div className={styles.examples}>
        {examplesData?.map((example, index) => (
          <Example key={index} {...example} />
        ))}
      </div>
      <Divider height={40} />
      <TeamSelect
        defaultValue={
          worldChampionTransformed?.value
            ? worldChampionTransformed
            : { label: "Argentina", value: "AR" }
        }
        disabled={
          worldChampionTransformed?.value || confirmation || confirmationSolana
        }
        onChange={(e) => setTeam(e)}
      />
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
                ro16Filled={ro16Filled}
                quarterFilled={quarterFilled}
                semiFilled={semiFilled}
                thirdFilled={thirdFilled}
                finalFilled={finalFilled}
                {...timelineData}
              />
            </div>
            <Table
              groupStage={groupStage}
              matches={predictionsTransformed ? predictionsTransformed : output}
              count={count}
              disabled={
                predictionsTransformed || confirmation || confirmationSolana
              }
              onChange={(e) => setOutput(e)}
              worldChampion={finalOutput?.worldChampion}
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
                    disabled={disabledCheck}
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
              {(sweepstakeDisabled || predictionsTransformed) && (
                <Button
                  text={"Submitted"}
                  color={"balanced"}
                  disabled
                  textColor={"light"}
                  size={"xxs"}
                />
              )}
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
                  {session && (
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
                        filledCount !== 64 ||
                        paymentToken === "" ||
                        !finalOutput.worldChampion
                      }
                      onClick={handleSubmit}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Divider height={80} />
      <Heading {...headingRulesData} />
      <div className={styles.rulesWrapper}>
        {rulesData?.map((item, index) => (
          <Rules key={index} {...item} />
        ))}
      </div>
      <Divider height={80} />
      {/* TO-DO: Create a separate grid component for the table and timeline */}
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
  let tokensBalanceData;
  let solanaBalanceData;

  if (session) {
    user = await getData(
      `https://backend-x7q2esrofa-no.a.run.app/api/v1/users/${session?.user?.user?.id}`
    );

    const tokensBalance = await fetchData(
      "account",
      session?.user?.user?.address,
      "tokens"
    );

    if (tokensBalance?.statusCode !== 400) {
      tokensBalanceData = tokensBalance;
    } else {
      tokensBalanceData = [];
    }

    const solanaBalance = await fetchData(
      "account",
      session?.user?.user?.address,
      "balance"
    );

    if (tokensBalance?.statusCode !== 400) {
      solanaBalanceData = solanaBalance;
    } else {
      solanaBalanceData = null;
    }
  }

  return {
    props: {
      accountData: accountData || null,
      nfts: filteredNfts || null,
      tokensBalance: tokensBalanceData || null,
      solanaBalance: solanaBalanceData || null,
      session: session || null,
      sweepstakes: user?.sweepstakes || null,
    },
  };
}
