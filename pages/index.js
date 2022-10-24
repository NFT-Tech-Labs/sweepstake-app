/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useTransition } from "react";
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
import crypto, { sign } from "crypto";

export default function Home({ accountData, nfts, users }) {
  const router = useRouter();
  const { publicKey, signMessage, sendTransaction } = useWallet();
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

  useEffect(() => {
    startTransition(() => {
      session && status === "authenticated" && router.push("/");
    });
  }, [session, status]);

  useEffect(() => {
    if (!session && status !== "authenticated") {
      publicKey && signCustomMessage();
    } else {
      return;
    }
  }, [publicKey]);

  const [count, setCount] = useState(0);
  const [groupStage, setGroupStage] = useState([]);
  const [output, setOutput] = useState(tableData);
  const [team, setTeam] = useState(null);
  const [paymentToken, setPaymentToken] = useState("");
  const [groupsFilled, setGroupsFilled] = useState(false);
  const [loading, setLoading] = useState(processing);
  const [success, setSuccess] = useState(confirmation);

  // const signCustomMessage = async () => {
  //   const address = publicKey.toBase58();
  //   const chain = "mainnet";
  //   const account = {
  //     address: address,
  //     chain: chain,
  //     network: "solana",
  //   };
  //   const { message } = await apiPost("api/auth/request-message", account);

  //   const encodedMessage = new TextEncoder().encode(message);
  //   const signedMessage = await signMessage(encodedMessage, "utf8");
  //   const signature = base58.encode(signedMessage);
  //   try {
  //     await signIn("credentials", {
  //       message,
  //       signature,
  //       redirect: false,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }
  // };

  console.log(session);

  const user = users?.filter(
    (item) => item?.address === publicKey?.toBase58()
  )[0];

  console.log(publicKey);

  const signCustomMessage = async () => {
    if (publicKey) {
      const address = publicKey.toBase58();

      if (user) {
        const message = user?.nonce;
        const encodedMessage = new TextEncoder().encode(message);

        const signedMessage = await signMessage(encodedMessage, "utf8");
        const signature = base58.encode(signedMessage);
        try {
          await signIn("authCredentials", {
            address,
            signature,
            redirect: false,
          });
        } catch (e) {
          console.log(e);
          return null;
        }
      } else {
        const message = address;
        const encodedMessage = new TextEncoder().encode(message);

        const signedMessage = await signMessage(encodedMessage, "utf8");
        const signature = base58.encode(signedMessage);
        try {
          await signIn("createCredentials", {
            address,
            signature,
            redirect: false,
          });
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    }
  };

  useEffect(() => {
    output
      .slice(0, 48)
      ?.every((item) => item.scoreA !== null && item.scoreB !== null)
      ? setGroupsFilled(true)
      : setGroupsFilled(false);
  }, [output]);

  const checkFilled = (round) => {
    return output?.filter(
      (item) => item.type === round && item.scoreA && item.scoreB
    );
  };

  const filledCount =
    output.filter((item) => item.scoreA && item.scoreB).length + 1;

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

  const paymentOptions = [
    {
      label: "SOL",
      value: "sol",
      amount: 0.25,
    },
    {
      label: "DUST",
      value: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
      amount: 7,
    },
    {
      label: "DGOAT",
      value: "ChhPHqxm9RLXybxFS8k1bCFb8FjziDGfQ9G2am1YKqeC",
      amount: 1,
    },
    {
      label: "MVP",
      value: "9eHik3eHYXzCvQVCJgSWzzsFUTV8vQdPyAfSCpugbJfe",
      amount: 750,
    },
    {
      label: "LABS",
      value: "LABSwpcfDjvRRMmEs87Y9yrj4pS9eofVS6cSbJm2zCW",
      amount: 375,
    },
  ];

  const transformOutputTypes = output?.map((item) => ({
    ...item,
    matchId: item?.id,
    scoreA: Number(item?.scoreA),
    scoreB: Number(item?.scoreB),
  }));

  const finalOutput = {
    worldChampion: team?.value,
    predictions: transformOutputTypes,
  };

  console.log(finalOutput);

  const handleSubmit = () => {
    if (publicKey) {
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

  // const testSubmit = async () => {
  //   if (session) {
  //     const sweepstake = await postData(
  //       "https://backend-x7q2esrofa-no.a.run.app/api/v1/sweepstakes",
  //       session?.user?.credentials?.accessToken,
  //       finalOutput
  //     );

  //     return sweepstake;
  //   }
  // };

  return (
    <div className={styles.home}>
      {/* <button onClick={testSubmit}>SubmitSweepstake</button> */}
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
                ro16Filled={checkFilled(8).length === 8}
                quarterFilled={checkFilled(9).length === 4}
                semiFilled={checkFilled(10).length === 2}
                thirdFilled={checkFilled(11).length === 1}
                finalFilled={checkFilled(12).length === 1}
                {...timelineData}
              />
            </div>
            <Table
              groupStage={groupStage}
              matches={output}
              count={count}
              // processing={processing}
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
                  disabled={filledCount !== 64 || paymentToken === ""}
                  onClick={handleSubmit}
                />
                <Divider height={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
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

  const users = await getData(
    "https://backend-x7q2esrofa-no.a.run.app/api/v1/users"
  );

  return {
    props: {
      accountData: accountData || null,
      nfts: filteredNfts || null,
      users: users || null,
    },
  };
}
