/* eslint-disable react/prop-types */
import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";
import {
  Title,
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
} from "@components";
import { fetchData } from "utils/api";
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

export default function Home({ accountData, nfts }) {
  const router = useRouter();
  const { publicKey, signMessage } = useWallet();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();

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

  const signCustomMessage = async () => {
    const address = publicKey.toBase58();
    const chain = "mainnet";
    const account = {
      address: address,
      chain: chain,
      network: "solana",
    };
    const { message } = await apiPost("api/auth/request-message", account);
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await signMessage(encodedMessage, "utf8");
    const signature = base58.encode(signedMessage);
    try {
      await signIn("credentials", {
        message,
        signature,
        redirect: false,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const [groupsFilled, setGroupsFilled] = useState(false);
  const [groupStage, setGroupStage] = useState([]);
  const [output, setOutput] = useState(tableData);

  useEffect(() => {
    output?.every((item) => item.valueA !== null && item.valueB !== null)
      ? setGroupsFilled(true)
      : setGroupsFilled(false);
  }, [output]);

  // console.log(output, "output");

  return (
    <div className={styles.home}>
      <Divider height={40} />
      <Profile
        publicKey={publicKey?.toBase58()}
        nfts={nfts}
        disconnect={() => signOut()}
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
      <Divider height={40} />
      <div className={styles.grid}>
        <div className={styles.timelineWrapper}>
          <Timeline
            count={count}
            onChange={(e) => setCount(e)}
            {...timelineData}
          />
        </div>
        <div className={styles.tableWrapper}>
          <>
            <Title
              tag={"h4"}
              text={
                count === 8
                  ? "Round of 16"
                  : count === 9
                  ? "Quarter finals"
                  : count === 10
                  ? "Semi finals"
                  : count === 11
                  ? "Third place"
                  : count === 12
                  ? "Final"
                  : "Groupstage"
              }
            />
            <Divider height={20} />
          </>
          {count < 8 && (
            <>
              <Groups
                data={output}
                count={count}
                onChange={(e) => setGroupStage(e)}
                onSelect={(e) => setCount(e)}
              />
              <Divider height={20} />
            </>
          )}

          <Table
            groupStage={groupStage}
            matches={output}
            count={count}
            onChange={(e) => setOutput(e)}
          />
          <Divider height={20} />
          <div className={styles.actions}>
            <div className={styles.pagination}>
              {count !== 0 && (
                <Button
                  classname={styles.next}
                  text={"Prev"}
                  link
                  onClick={() => setCount(count - 1)}
                  size={"m"}
                />
              )}
              {groupsFilled && count > 6 && (
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
            <Button
              text={"Submit"}
              color={"positive"}
              textColor={"light"}
              size={"xxs"}
              disabled
            />
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

  return {
    props: {
      accountData: accountData || null,
      nfts: filteredNfts || null,
    },
  };
}
