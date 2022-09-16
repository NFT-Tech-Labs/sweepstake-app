import React, { useState } from "react";
import styles from "../styles/home.module.scss";
import { Title, Table, Heading, Divider, Timeline, Button } from "@components";

export default function Home() {
  const [count, setCount] = useState(1);
  const headingData = {
    title: {
      text: "Sweepstakes",
    },
    content: {
      text: "Fill your sweeps in below",
      color: "stable-700",
    },
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

  const tableData = [
    {
      type: 1,
      date: "10 nov",
      time: "10:00",
      match: "NL-US",
      group: "A",
      points: "0",
    },
    {
      type: 1,
      date: "12 nov",
      time: "12:00",
      match: "HR-CA",
      group: "A",
      points: "0",
    },
    {
      type: 1,
      date: "14 nov",
      time: "14:00",
      match: "IT-DE",
      group: "A",
      points: "0",
    },
    {
      type: 2,
      date: "20 nov",
      time: "10:00",
      match: "BE-FR",
      group: "A",
      points: "0",
    },
    {
      type: 2,
      date: "22 nov",
      time: "12:00",
      match: "DK-SE",
      group: "A",
      points: "0",
    },
    {
      type: 2,
      date: "24 nov",
      time: "14:00",
      match: "MX-ES",
      group: "A",
      points: "0",
    },
  ];

  const filteredTable = tableData.filter((item) => item.type === count);

  return (
    <div className={styles.home}>
      <Divider height={80} />
      <Heading {...headingData} />
      <Divider height={40} />
      <div className={styles.grid}>
        <div className={styles.timelineWrapper}>
          <Timeline active={count} {...timelineData} />
        </div>
        <div className={styles.tableWrapper}>
          <Table matches={filteredTable} />
          <Divider height={20} />
          <div className={styles.actions}>
            {count !== 1 && (
              <Button
                classname={styles.next}
                text={"Prev"}
                link
                onClick={() => setCount(count - 1)}
              />
            )}
            <Button
              classname={styles.next}
              text={"Next"}
              link
              onClick={() => setCount(count + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
