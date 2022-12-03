/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";
import Link from "next/link";
import {
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
  Instructions,
  Content,
  Rank,
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
  teams,
  instructionsData,
} from "utils/data";
// import { HelioPay } from "@heliofi/react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { getSession, useSession, signOut } from "next-auth/react";
import base58 from "bs58";
import { apiPost } from "../utils/apiPost";
import { signIn } from "next-auth/react";
import SendHelio from "utils/createSweepstakeHelio";
import SendSolanaTokens from "utils/createSweepstakeSolana";
import SendSplTokens from "utils/createSweepstakeSpl";
import SendUser from "utils/createUser";
import { ToastContainer } from "react-toastify";
import { useConnection } from "@solana/wallet-adapter-react";
import "react-toastify/dist/ReactToastify.css";

export default function Home({
  accountData,
  session,
  nfts,
  tokensBalance,
  solanaBalance,
  sweepstakes,
  results,
  rankings,
}) {
  const ref = useRef(null);
  const router = useRouter();
  const { connection } = useConnection();
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const { handleUser, confirmationUser, processingUser, errorUser } =
    SendUser();
  const {
    handleSolanaPayment,
    confirmationSolana,
    processingSolana,
    errorSolana,
  } = SendSolanaTokens();
  const { handlePayment, confirmation, processing, error } = SendSplTokens();
  const { handleHelioPayment, confirmationHelio, processingHelio, errorHelio } =
    SendHelio();

  const [count, setCount] = useState(0);
  const [groupStage, setGroupStage] = useState([]);
  const [output, setOutput] = useState(tableData);
  const [team, setTeam] = useState(null);
  const [paymentToken, setPaymentToken] = useState("");
  const [groupsFilled, setGroupsFilled] = useState(false);
  const [sweepstakeDisabled, setSweepstakeDisabled] = useState(false);
  const [confirmDiscord, setConfirmDiscord] = useState(false);
  const [localUserState, setLocalUserState] = useState(web3.Keypair.generate());
  const [localUserStateSweepstake, setLocalUserStateSweepstake] = useState(
    web3.Keypair.generate()
  );
  const [helio, setHelio] = useState(true);

  const handleScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Smart contract communication
  const getProvider = () => {
    if (!anchorWallet) {
      return null;
    }

    const provider = new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: "processed",
    });

    return provider;
  };

  const provider = getProvider();
  const id = new BN(session?.user?.user?.id);

  useEffect(() => {
    // Triggers a signature request if session (user) is not yet authenticated
    if (session === null) {
      signCustomMessage();
    }

    // // Triggers a user initialization method request for the smart contract
    // if (session !== null && provider && !predictionsTransformed) {
    //   handleUser(id, localUserState?.publicKey, localUserState);
    // }
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
      } catch (e) {
        console.log({ e });
        return null;
      }
    }
  };

  const profileData = {
    tokens: [
      {
        title: {
          text: "USDC",
        },
        content: {
          text: "token",
        },
        available: 0,
        required: process.env.NEXT_PUBLIC_USDC_MINT_AMOUNT,
        mint: process.env.NEXT_PUBLIC_USDC_MINT,
      },
      {
        title: {
          text: "DUST",
        },
        content: {
          text: "token",
        },
        available: 0,
        required: process.env.NEXT_PUBLIC_DUST_MINT_AMOUNT,
        mint: process.env.NEXT_PUBLIC_DUST_MINT,
      },
      {
        title: {
          text: "FORGE",
        },
        content: {
          text: "token",
        },
        available: 0,
        required: process.env.NEXT_PUBLIC_FORGE_MINT_AMOUNT,
        mint: process.env.NEXT_PUBLIC_FORGE_MINT,
      },
    ],
  };

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

  // Fetched tokenBalances from API
  const fetchedTokensBalance = profileData?.tokens.map((item) => {
    return {
      ...item,
      available:
        Number(
          tokensBalance?.filter((token) => item.mint === token.mint)[0]?.amount
        ) || item?.available,
    };
  });

  // Fetched sweepstake predictions from API
  let predictions;
  let predictionsTransformed;
  let predictionsTransformedResults;
  let worldChampion;
  let worldChampionTransformed;

  if (sweepstakes) {
    predictions = sweepstakes[0]?.predictions;
    worldChampion = sweepstakes[0]?.worldChampion;

    predictionsTransformed = predictions?.map((item, index) => ({
      ...item,
      rowId: index,
      scoreA: item?.scoreA.toString(),
      scoreB: item?.scoreB.toString(),
      points: item?.points.toString(),
    }));

    predictionsTransformedResults = predictionsTransformed?.map((item) => ({
      ...item,
      resultA: results
        ?.find((result) => result.matchId === item.matchId)
        ?.scoreA?.toString(),
      resultB: results
        ?.find((result) => result.matchId === item.matchId)
        ?.scoreB?.toString(),
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
  const filledCount = output.filter(
    (item) => item.scoreA && item.scoreB
  ).length;

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

  const shaInput = {
    id,
    ...finalOutput,
  };
  // Submit transaction function which creates a payment/transaction
  const handleSubmit = () => {
    if (wallet?.publicKey && session && confirmationUser) {
      const shaInput = {
        id,
        ...finalOutput,
      };

      if (paymentToken !== "sol") {
        console.log(paymentToken);
        handlePayment(
          shaInput,
          paymentToken,
          localUserState?.publicKey,
          process.env.NEXT_PUBLIC_DAGOATS_ADDRESS_SPL,
          localUserStateSweepstake?.publicKey,
          localUserStateSweepstake,
          session?.user?.credentials?.accessToken,
          finalOutput
        );
      } else {
        console.log("solpayment");
        handleSolanaPayment(
          shaInput,
          localUserState?.publicKey,
          process.env.NEXT_PUBLIC_DAGOATS_ADDRESS_SOL,
          localUserStateSweepstake?.publicKey,
          localUserStateSweepstake,
          session?.user?.credentials?.accessToken,
          finalOutput
        );
      }
    }
  };

  useEffect(() => {
    if (confirmation || confirmationSolana || confirmationHelio) {
      setSweepstakeDisabled(true);
      setCount(0);
    }
  }, [confirmation, confirmationSolana, confirmationHelio]);

  const handleDisconnect = () => {
    signOut({ redirect: "/" });
  };

  const paymentOptions = [
    {
      label: process.env.NEXT_PUBLIC_SOL_AMOUNT + " SOL",
      value: "sol",
    },
    {
      label: process.env.NEXT_PUBLIC_USDC_MINT_AMOUNT + " USDC",
      value: process.env.NEXT_PUBLIC_USDC_MINT,
    },
    {
      label: process.env.NEXT_PUBLIC_DUST_MINT_AMOUNT + " DUST",
      value: process.env.NEXT_PUBLIC_DUST_MINT,
    },
    {
      label: process.env.NEXT_PUBLIC_FORGE_MINT_AMOUNT + " FORGE",
      value: process.env.NEXT_PUBLIC_FORGE_MINT,
    },
  ];
  // sort by value

  let sortedPredictions;
  if (results) {
    sortedPredictions = predictionsTransformedResults?.sort(
      (a, b) => a.type - b.type || a.id - b.id || a.rowId - b.rowId
    );
  } else {
    sortedPredictions = predictionsTransformed?.sort(
      (a, b) => a.type - b.type || a.id - b.id || a.rowId - b.rowId
    );
  }

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
      <Cta {...ctaData} onClick={handleScroll} />
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
          (session && wallet?.publicKey) ||
          worldChampionTransformed?.value ||
          confirmation ||
          confirmationSolana ||
          confirmationHelio
        }
        onChange={(e) => setTeam(e)}
      />
      <Divider height={60} />
      {rankings && session && wallet?.publicKey && (
        <div className={styles.leaderboard}>
          <Divider height={60} />
          <Button
            text={"Leaderboard"}
            textColor={"light"}
            size={"xxs"}
            onClick={() => router.push("/leaderboard")}
          />
          <div className={styles.winners}>
            {rankings?.slice(0, 3)?.map((item, index) => (
              <Rank
                key={index}
                position={`${index + 1}`}
                points={item?.totalPoints.toString()}
                label={"address"}
                winner
                className={styles.winner}
                session={session}
                {...item}
              />
            ))}
          </div>
        </div>
      )}
      <Divider height={40} />
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
              matches={predictionsTransformed ? sortedPredictions : output}
              count={count}
              disabled={
                (session && wallet?.publicKey) || predictionsTransformed
              }
              onChange={(e) => setOutput(e)}
              worldChampion={
                worldChampionTransformed?.value
                  ? worldChampionTransformed?.value
                  : finalOutput?.worldChampion
              }
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
              {!predictionsTransformed && (
                <Content color={"assertive"} text={"Entries are closed"} />
              )}
              {/* {!sweepstakeDisabled && !predictionsTransformed && (
                <div className={styles.submitWrapper}>
                  <div className={styles.selectWrapper}>
                    {filledCount === 64 && (
                      <Select
                        placeholder={"Choose token"}
                        options={paymentOptions}
                        onChange={(e) => setPaymentToken(e?.value)}
                        className={styles.select}
                      />
                    )}
                    {session && wallet?.publicKey && (
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
                          !finalOutput.worldChampion ||
                          !confirmDiscord
                        }
                        onClick={handleSubmit}
                      />
                    )}
                  </div>
                </div>
              )} */}
            </div>
            {/* {session && wallet?.publicKey && (
              <div
                className={styles.helioButton}
                style={{
                  opacity:
                    sweepstakeDisabled ||
                    predictionsTransformed ||
                    filledCount !== 64 ||
                    paymentToken === "" ||
                    !finalOutput.worldChampion ||
                    !confirmDiscord
                      ? 0.5
                      : 1,
                  pointerEvents:
                    sweepstakeDisabled ||
                    predictionsTransformed ||
                    filledCount !== 64 ||
                    paymentToken === "" ||
                    !finalOutput.worldChampion ||
                    !confirmDiscord
                      ? "none"
                      : "auto",
                }}
              >
                {!sweepstakeDisabled && !predictionsTransformed && (
                  <Content className={styles.or} text={"Or"} size={"xs"} />
                )}
                <HelioPay
                  cluster={process.env.NEXT_PUBLIC_HELIO_NETWORK}
                  payButtonTitle={
                    sweepstakeDisabled || predictionsTransformed
                      ? "SUBMITTED"
                      : "SUBMIT (SOL)"
                  }
                  paymentRequestId={process.env.NEXT_PUBLIC_HELIO_PAYMENT_ID}
                  theme={{
                    colors: {
                      primary: "#F76C1B",
                    },
                  }}
                  onSuccess={() =>
                    handleHelioPayment(
                      session?.user?.credentials?.accessToken,
                      finalOutput
                    )
                  }
                />
              </div>
            )} */}
            {/* {session && wallet?.publicKey && (
              <div className={styles.legal}>
                <input
                  type={"checkbox"}
                  value={"yes"}
                  checked={
                    confirmDiscord ||
                    sweepstakeDisabled ||
                    predictionsTransformed
                  }
                  onChange={() => setConfirmDiscord(!confirmDiscord)}
                  disabled={sweepstakeDisabled || predictionsTransformed}
                />
                <label>
                  I confirm that I am in the{" "}
                  <Link href={"https://discord.gg/dagoats"}>
                    <a target={"_blank"} rel="noreferrer">
                      DaGoats Discord
                    </a>
                  </Link>
                </label>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <Divider height={80} />
      <div ref={ref}>
        <Heading download {...headingRulesData} />
      </div>
      <div className={styles.rulesWrapper}>
        {rulesData?.map((item, index) => (
          <Rules key={index} {...item} />
        ))}
      </div>
      <Divider height={80} />
      <Instructions items={instructionsData} />
      {/* TO-DO: Create a separate grid component for the table and timeline */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

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

  const results = await getData(
    "https://backend-x7q2esrofa-no.a.run.app/api/v1/results"
  );

  const rankings = await getData(
    `https://backend-x7q2esrofa-no.a.run.app/api/v1/users?orderBy=totalPoints&order=DESC&limit=${3}`
  );

  console.log(rankings);

  return {
    props: {
      accountData: accountData || null,
      nfts: filteredNfts || null,
      tokensBalance: tokensBalanceData || null,
      solanaBalance: solanaBalanceData || null,
      session: session || null,
      sweepstakes: user?.sweepstakes || null,
      results: results || null,
      rankings: rankings || null,
    },
  };
}
