import styles from "../../styles/leaderboard.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { Heading, Rank, Divider, Button } from "@components";
import { getData } from "../../utils/api";
import { useRouter } from "next/router";

export default function Leaderboard({ rankings, page }) {
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
      {rankings && (
        <div className={styles.winners}>
          {rankings?.slice(0, 3)?.map((item, index) => (
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
      {rankings?.slice(3, rankingsData.length)?.map((item, index) => (
        <Rank
          key={index}
          points={item?.totalPoints.toString()}
          position={`${index + 4}`}
          label={"address"}
          {...item}
        />
      ))}
      <Button type={"button"} onClick={() => router.push(page + 1)} />
    </div>
  );
}
export async function getStaticProps(context) {
  const offset = context.params.page;

  const rankings = await getData(
    `https://backend-x7q2esrofa-no.a.run.app/api/v1/users?order=ASC&limit=${10}&offset=${offset}`
  );

  if (!rankings.length) {
    return {
      notFound: true,
    };
  }

  console.log(rankings);
  console.log(offset);
  console.log(context.params.page);
  return {
    props: {
      rankings: rankings || null,
      page: context.params.page,
    },
  };
}

export async function getStaticPaths(context) {
  // Get total number of posts from API.

  // Build paths `blog/0`, `blog/1` ...etc.
  const paths = Array(10)
    .fill(0)
    .map((_, page) => ({
      params: {
        page: `${page + 1}`,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
