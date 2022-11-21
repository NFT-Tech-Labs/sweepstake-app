import styles from "../../styles/leaderboard.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { Heading, Rank, Divider, Button } from "@components";
import { getData } from "../../utils/api";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
export default function Leaderboard({ rankings, page, offset, session }) {
  const router = useRouter();
  return (
    <div className={styles.leaderboard}>
      <Heading
        title={{ text: "DaGOATs WC Leaderboard" }}
        content={{
          text: "The top predictions of all sweepstake participants!",
        }}
      />
      <Divider height={20} />
      {page === 0 && rankings && (
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
      )}
      <Divider height={20} />
      {page === 0 &&
        rankings
          ?.slice(3, rankings?.length)
          .map((item, index) => (
            <Rank
              key={index}
              points={item?.totalPoints.toString()}
              position={`${offset + index + 4}`}
              label={"address"}
              session={session}
              {...item}
            />
          ))}
      {page !== 0 &&
        rankings?.map((item, index) => (
          <Rank
            key={index}
            points={item?.totalPoints.toString()}
            position={`${offset + index + 1}`}
            label={"address"}
            session={session}
            {...item}
          />
        ))}
      <div className={styles.pagination}>
        <Button
          type={"button"}
          text={"Prev"}
          size={"xxs"}
          textColor={"light"}
          disabled={page < 1}
          onClick={() => router.push(`leaderboard/?page=${page - 1}`)}
        />
        <Button
          type={"button"}
          text={"Next"}
          size={"xxs"}
          textColor={"light"}
          disabled={page > 7}
          onClick={() => router.push(`leaderboard/?page=${page + 1}`)}
        />
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const {
    query: { page = 0 },
  } = context;

  const offset = page * 10;
  const rankings = await getData(
    `https://backend-x7q2esrofa-no.a.run.app/api/v1/users?orderBy=totalPoints&order=DESC&limit=${10}&offset=${offset}`
  );

  if (!rankings.length) {
    return {
      notFound: true,
    };
  }
  console.log(session);

  return {
    props: {
      rankings: rankings || null,
      page: +page,
      offset: offset,
      session: session || null,
    },
  };
}
