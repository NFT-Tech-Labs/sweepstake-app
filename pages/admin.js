/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Heading, Button, Table, Groups } from "@components";
import { tableData } from "utils/data";
import { postData, getData } from "utils/api";
import { getSession, useSession, signOut } from "next-auth/react";
import styles from "../styles/admin.module.scss";

export default function Admin({ session, resultsData }) {
  const [count, setCount] = useState(0);
  const [groupStage, setGroupStage] = useState([]);
  const [output, setOutput] = useState(tableData);

  const comparedResults = output.map(
    (x) => resultsData.find((y) => y.matchId === x.matchId) || x
  );

  const latestResultsStructure = comparedResults?.map((item, index) => ({
    ...item,
    scoreA: item?.scoreA?.toString() || null,
    scoreB: item?.scoreB?.toString() || null,
    rowId: index,
    points: item?.points.toString(),
  }));

  const outputStructure = output?.map((item) => ({
    ...item,
    scoreA: Number(item?.scoreA),
    scoreB: Number(item?.scoreB),
  }));

  const handleSubmit = async () => {
    return Promise.all(
      outputStructure?.map((result) =>
        postData(
          "https://backend-x7q2esrofa-no.a.run.app/api/v1/results",
          session?.user?.credentials?.accessToken,
          result
        )
      )
    );
  };

  return (
    <div className={styles.admin}>
      <Heading
        title={{ text: "Admin" }}
        content={{
          text: "Fill in the results of the played matches",
          color: "stable-500",
        }}
      />
      <div className={styles.wrapper}>
        <Groups
          data={output}
          count={count < 8 ? count : 7}
          onChange={(e) => setGroupStage(e)}
          onSelect={(e) => setCount(e)}
        />
        <div>
          <Table
            groupStage={groupStage}
            matches={latestResultsStructure ? latestResultsStructure : output}
            count={count}
            onChange={(e) => setOutput(e)}
            worldChampion={"HR"}
          />
          <div className={styles.actions}>
            <div>
              <Button
                link
                onClick={() => setCount(count - 1)}
                text={"Prev"}
                disabled={count === 0}
              />
              <Button
                link
                onClick={() => setCount(count + 1)}
                text={"Next"}
                disabled={count > 11}
              />
            </div>
            <div>
              <Button
                text={"Submit"}
                color={"positive"}
                textColor={"light"}
                size={"xss"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const resultsData = await getData(
    "https://backend-x7q2esrofa-no.a.run.app/api/v1/results"
  );

  if (
    !session ||
    session?.user?.user?.address !==
      "2Bzon1sDooUatNhvpvBYDG89QzFMwr3bkGMxCCdsd9Lo"
  ) {
    return {
      notFound: true,
    };
  }

  console.log(session?.user?.user?.address);
  return {
    props: {
      session: session || null,
      resultsData: resultsData || null,
    },
  };
}