import styles from "../../styles/leaderboard.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { Heading, Rank, Divider, Button } from "@components";
import { getData } from "../../utils/api";
import { useRouter } from "next/router";

export default function Leaderboard({ rankings, winners, page, offset }) {
  const router = useRouter();
  const rankingsData = [
    {
      address: "ARLQYuL9HEoUtBXpDG26YyvGUAnHJfYbLSstvrm1vS24",
      points: 50,
    },
    {
      address: "2ubTJVdSmopQKkvuXhUMVjUjZCQwzRuB6RWezAxUuAns",
      points: 60,
    },
    {
      address: "9WXbLF4mxmZorb6KSMf28eHbzVj6bUyvtNLKRHPDxxBs",
      points: 70,
    },
    {
      address: "9WXbLF4mxmZorb6KSMf28eHbzVj6bUyvtNLKRHPDxxBs",
      points: 70,
    },
    {
      address: "2ubTJVdSmopQKkvuXhUMVjUjZCQwzRuB6RWezAxUuAns",
      points: 70,
    },
    {
      address: "9WXbLF4mxmZorb6KSMf28eHbzVj6bUyvtNLKRHPDxxBs",
      points: 70,
    },
    {
      address: "9WXbLF4mxmZorb6KSMf28eHbzVj6bUyvtNLKRHPDxxBs",
      points: 70,
    },
    {
      address: "2ubTJVdSmopQKkvuXhUMVjUjZCQwzRuB6RWezAxUuAns",
      points: 70,
    },
    {
      address: "9WXbLF4mxmZorb6KSMf28eHbzVj6bUyvtNLKRHPDxxBs",
      points: 70,
    },
  ];

  return (
    <div className={styles.leaderboard}>
      <Heading
        title={{ text: "Leaderboard" }}
        content={{
          text: "The top predictions of all sweepstake participants!",
        }}
      />
      <Divider height={20} />
      {winners && (
        <div className={styles.winners}>
          {winners?.map((item, index) => (
            <Rank
              key={index}
              position={`${index + 1}`}
              points={item?.totalPoints.toString()}
              label={"address"}
              winner
              className={styles.winner}
              {...item}
            />
          ))}
        </div>
      )}
      <Divider height={20} />
      {offset === 0 &&
        rankings
          ?.slice(3, rankings?.length)
          .map((item, index) => (
            <Rank
              key={index}
              points={item?.totalPoints.toString()}
              position={`${offset + index + 4}`}
              label={"address"}
              {...item}
            />
          ))}
      {offset > 0 &&
        rankings.map((item, index) => (
          <Rank
            key={index}
            points={item?.totalPoints.toString()}
            position={`${offset + index + 1}`}
            label={"address"}
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
          onClick={() => router.push(`leaderboard/?page=${page + 1}`)}
        />
      </div>
    </div>
  );
}
export async function getServerSideProps({ query: { page = 0 } }) {
  const offset = page * 10;

  const rankings = await getData(
    `https://backend-x7q2esrofa-no.a.run.app/api/v1/users?order=ASC&limit=${10}&offset=${offset}`
  );

  const winners = await getData(
    `https://backend-x7q2esrofa-no.a.run.app/api/v1/users?order=ASC&limit=${3}`
  );

  if (!rankings.length) {
    return {
      notFound: true,
    };
  }

  console.log(rankings);
  console.log(offset);

  return {
    props: {
      rankings: rankings || null,
      winners: winners || null,
      page: +page,
      offset: offset,
    },
  };
}
