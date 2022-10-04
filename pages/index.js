import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "../styles/home.module.scss";
import {
  Title,
  Table,
  Heading,
  Divider,
  Timeline,
  Button,
  Cta,
  Collection,
  CardRules,
  Example,
  Profile,
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
  const [data, _] = useState(tableData);
  const [output, setOutput] = useState([]);

  const handleTable = (count) => {
    setCount(count);
  };

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
          <Timeline active={count} {...timelineData} />
        </div>
        <div className={styles.tableWrapper}>
          <Table matches={data} count={count} onChange={(e) => setOutput(e)} />
          <Divider height={20} />
          <div className={styles.actions}>
            <div className={styles.pagination}>
              {count !== 0 && (
                <Button
                  classname={styles.next}
                  text={"Prev"}
                  link
                  onClick={() => handleTable(count - 1)}
                  size={"m"}
                />
              )}
              <Button
                classname={styles.next}
                text={"Next"}
                link
                onClick={() => handleTable(count + 1)}
                size={"m"}
              />
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

    accountMetadata = await Promise.all(
      accountData?.map(
        async (item) => await fetchData("nft", item?.mint, "metadata")
      )
    );

    accountMetadataUri = accountMetadata.map(
      (item) => item?.metaplex.metadataUri
    );

    // array of all nfts with traits, collection, name and image
    nfts = await Promise.all(
      accountMetadataUri.map(
        async (item) => await fetch(item).then((res) => res.json())
      )
    );
  }

  const filteredNfts = nfts?.filter((item) => item.symbol === "DIP");

  return {
    props: {
      accountData: accountData || null,
      nfts: filteredNfts || null,
    },
  };
}
