import styles from "../styles/leaderboard.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { Heading, Rank, Divider } from "@components";
export default function Leaderboard() {
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
      {rankingsData && (
        <div className={styles.winners}>
          {rankingsData.slice(0, 3)?.map((item, index) => (
            <Rank
              key={index}
              position={`${index + 1}`}
              points={"2"}
              label={"address"}
              winner
              className={styles.winner}
              {...item}
            />
          ))}
        </div>
      )}

      <Divider height={20} />
      {rankingsData?.slice(3, rankingsData.length)?.map((item, index) => (
        <Rank
          key={index}
          position={`${index + 4}`}
          label={"address"}
          {...item}
        />
      ))}
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {},
  };
}
