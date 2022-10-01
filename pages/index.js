import React, { useState, useCallback, useEffect, useTransition } from "react";
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
} from "@components";
import { fetchData } from "utils/api";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import Login from "../components/login/login";
import { PublicKey } from "@solana/web3.js";
import { getSession, useSession, signOut } from "next-auth/react";
import base58 from "bs58";
import { apiPost } from "../utils/apiPost";
import { signIn } from "next-auth/react";

export default function Home({ accountData, nfts }) {
  const router = useRouter();
  const { publicKey, signMessage } = useWallet();
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const to = new PublicKey("4c86aFZQzdZKihfVPcqoPmuCzuH6ESeDD2myfTFacYGS");

  useEffect(() => {
    startTransition(() => {
      session && status === "authenticated" && router.push("/");
    });
  }, [session, status]);

  const tableData = [
    {
      id: 0,
      type: 0,
      date: "10 nov",
      time: "10:00",
      group: "A",
      points: "0",
      teamA: "NL",
      teamB: "US",
      valueA: 0,
      valueB: 1,
      resultA: 0,
      resultB: 1,
    },
    {
      id: 1,
      type: 0,
      date: "12 nov",
      time: "12:00",
      group: "B",
      points: "0",
      teamA: "HR",
      teamB: "CA",
      valueA: 0,
      valueB: 3,
      resultA: 0,
      resultB: 1,
    },
    {
      id: 2,
      type: 0,
      date: "10 nov",
      time: "10:00",
      group: "C",
      points: "0",
      teamA: "GB",
      teamB: "AR",
      valueA: 5,
      valueB: 1,
      resultA: 0,
      resultB: 1,
    },
    {
      id: 3,
      type: 0,
      date: "12 nov",
      time: "12:00",
      group: "D",
      points: "0",
      teamA: "ES",
      teamB: "BE",
      valueA: 5,
      valueB: 3,
      resultA: 5,
      resultB: 3,
    },
    {
      id: 4,
      type: 1,
      date: "20 nov",
      time: "10:00",
      group: "A",
      points: "0",
      teamA: "BE",
      teamB: "FR",
      valueA: 2,
      valueB: 1,
    },
    {
      id: 5,
      type: 1,
      date: "22 nov",
      time: "12:00",
      group: "B",
      points: "0",
      teamA: "MX",
      teamB: "AU",
      valueA: 3,
      valueB: 1,
    },
    {
      id: 6,
      type: 1,
      date: "22 nov",
      time: "12:00",
      group: "C",
      points: "0",
      teamA: "FI",
      teamB: "SN",
      valueA: 3,
      valueB: 1,
    },
    {
      id: 7,
      type: 1,
      date: "22 nov",
      time: "12:00",
      group: "D",
      points: "0",
      teamA: "DK",
      teamB: "SE",
      valueA: 3,
      valueB: 1,
    },
  ];

  const headingData = {
    title: {
      text: "Sweepstakes",
    },
    content: {
      text: "Fill your sweeps in below",
      color: "stable-700",
    },
  };

  const ctaData = {
    title: {
      text: "Be the next DaGoats champion",
    },
    content: {
      text: "Predict all matches and win $GOAT tokens!",
    },
    button: {
      text: "Read more",
    },
    image: "https://dagoats.io/wp-content/uploads/2022/06/maradona.png",
  };

  const timelineData = {
    rounds: [
      {
        text: "Matchday 1",
      },
      {
        text: "Matchday 2",
      },
      {
        text: "Matchday 3",
      },
      {
        text: "Round of 16",
      },
      {
        text: "Quarter finals",
      },
      {
        text: "Semi finals",
      },
      {
        text: "Third place",
      },
      {
        text: "Final",
      },
    ],
  };

  const [count, setCount] = useState(0);
  const [data, setData] = useState(tableData);
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
    // const message = "Sign to provide access to app";
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
      return;
    }
  };

  console.log(output);

  return (
    <div className={styles.home}>
      {/* <WalletMultiButton /> */}
      {publicKey && status !== "authenticated" && (
        <button onClick={() => signCustomMessage()}>Authenticate</button>
      )}
      {publicKey && status === "authenticated" && (
        <button onClick={() => signOut()}>SignOut</button>
      )}
      <Divider height={40} />
      <Collection nfts={nfts} />
      <Divider height={60} />
      {/* <Cta {...ctaData} />
      <Divider height={80} /> */}
      <Heading {...headingData} />
      <Divider height={40} />
      <div className={styles.grid}>
        <div className={styles.timelineWrapper}>
          {console.log(count)}
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
