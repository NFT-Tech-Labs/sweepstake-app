import React, { useState, useCallback } from "react";
import styles from "../styles/home.module.scss";
import {
  Title,
  Table,
  Heading,
  Divider,
  Timeline,
  Button,
  Cta,
} from "@components";

export default function Home() {
  const tableData = [
    {
      id: 0,
      type: 0,
      date: "10 nov",
      time: "10:00",
      match: "NL-US",
      group: "A",
      points: "0",
      valueA: 0,
      valueB: 1,
    },
    {
      id: 1,
      type: 0,
      date: "12 nov",
      time: "12:00",
      match: "HR-CA",
      group: "B",
      points: "0",
      valueA: 0,
      valueB: 3,
    },
    {
      id: 2,
      type: 0,
      date: "10 nov",
      time: "10:00",
      match: "GB-AR",
      group: "C",
      points: "0",
      valueA: 5,
      valueB: 1,
    },
    {
      id: 3,
      type: 0,
      date: "12 nov",
      time: "12:00",
      match: "ES-BE",
      group: "D",
      points: "0",
      valueA: 5,
      valueB: 3,
    },
    {
      id: 4,
      type: 1,
      date: "20 nov",
      time: "10:00",
      match: "BE-FR",
      group: "A",
      points: "0",
      valueA: 2,
      valueB: 1,
    },
    {
      id: 5,
      type: 1,
      date: "22 nov",
      time: "12:00",
      match: "MX-AU",
      group: "B",
      points: "0",
      valueA: 3,
      valueB: 1,
    },
    {
      id: 6,
      type: 1,
      date: "22 nov",
      time: "12:00",
      match: "FI-SN",
      group: "C",
      points: "0",
      valueA: 3,
      valueB: 1,
    },
    {
      id: 7,
      type: 1,
      date: "22 nov",
      time: "12:00",
      match: "DK-SE",
      group: "D",
      points: "0",
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

  console.log(output);

  return (
    <div className={styles.home}>
      <Divider height={80} />
      <Cta {...ctaData} />
      <Divider height={80} />
      <Heading {...headingData} />
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
            <Button text={"Save"} link color={"balanced"} size={"m"} />
          </div>
        </div>
      </div>
    </div>
  );
}
