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
  Group,
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
  // console.log(output.filter((item) => item.group === "A"));

  const getTeamPoints = (data, team) => {
    let total = 0;
    // let groups = [];
    data.map((item) => {
      const chosenTeamValue =
        (item.teamA === team && item.valueA) ||
        (item.teamB === team && item.valueB);

      const againstTeamValue =
        (item.teamA === team) === true ? item.valueB : item.valueA;

      chosenTeamValue > againstTeamValue
        ? (total += 3)
        : chosenTeamValue === againstTeamValue
        ? (total += 1)
        : (total += 0);
    });

    return total;
  };

  const groups = [
    {
      group: "A",
      teams: ["NL", "EC", "QA", "SN"],
    },
    {
      group: "B",
      teams: ["US", "WS", "IR", "GB"],
    },
  ];

  const groupStage = groups.map((item) => {
    return {
      group: item.group,
      teams: item.teams.map((item) => ({
        name: item,
        points: getTeamPoints(output, item),
      })),
    };
  });
  // sort group by points
  groupStage.map((item) => item.teams.sort((a, b) => b.points - a.points));
  console.log(groupStage);

  const groupWinners = (group) => {
    return groupStage.filter((item) => item.group === group);
  };

  const roundOf16 = () => {
    return [
      {
        id: 0,
        type: 1,
        date: "10 nov",
        time: "10:00",
        teamA: groupWinners("A")[0].teams[0].name,
        teamB: groupWinners("B")[0].teams[0].name,
        valueA: 0,
        valueB: 1,
        resultA: 0,
        resultB: 1,
      },
    ];
  };

  console.log(roundOf16());

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
          <Groups data={groupStage} />
          <Divider height={20} />
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
