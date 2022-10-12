/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./table.module.scss";
import PropTypes from "prop-types";
import { Content, Row, Button } from "@components";
import { groupWinners, getWinners, getLosers } from "../../utils/helpers";
import {
  roundOf16Scheme,
  quarterScheme,
  semiScheme,
  thirdPlaceScheme,
  finalScheme,
} from "../../utils/data";
const cx = classNames.bind(styles);

const Table = ({ className, matches, count, groupStage, onChange }) => {
  const [data, setData] = useState(matches);

  let classes = cx(
    {
      table: true,
    },
    className
  );

  const roundOf16 = roundOf16Scheme?.map((item, index) => {
    const teamX = item.teamA.split("")[0];
    const placementX = item.teamA.split("")[1] - 1;
    const teamY = item.teamB.split("")[0];
    const placementY = item.teamB.split("")[1] - 1;

    return {
      id: 48 + index,
      type: 8,
      date: "10 nov",
      time: "10:00",
      teamA: groupWinners(groupStage, teamX)[0]?.teams[placementX].name,
      teamB: groupWinners(groupStage, teamY)[0]?.teams[placementY].name,
      points: "0",
      timestamp: Date.now(),
    };
  });

  const quarter = quarterScheme.map((item, index) => {
    const teamX = item.teamA.split("WG")[1] - 1;
    const teamY = item.teamB.split("WG")[1] - 1;

    return {
      id: 56 + index,
      type: 9,
      date: "10 nov",
      time: "10:00",
      teamA: getWinners(data.filter((item) => item.type === 8))[teamX],
      teamB: getWinners(data.filter((item) => item.type === 8))[teamY],
      points: "0",
      timestamp: Date.now(),
    };
  });

  const semi = semiScheme?.map((item, index) => {
    const teamX = item.teamA.split("WG")[1] - 1;
    const teamY = item.teamB.split("WG")[1] - 1;

    return {
      id: 60 + index,
      type: 10,
      date: "10 nov",
      time: "10:00",
      teamA: getWinners(data.filter((item) => item.type === 9))[teamX],
      teamB: getWinners(data.filter((item) => item.type === 9))[teamY],
      points: "0",
      timestamp: Date.now(),
    };
  });

  const thirdPlace = thirdPlaceScheme?.map((item, index) => {
    const teamX = item.teamA.split("LG")[1] - 1;
    const teamY = item.teamB.split("LG")[1] - 1;

    return {
      id: 62 + index,
      type: 11,
      date: "10 nov",
      time: "10:00",
      teamA: getLosers(data.filter((item) => item.type === 10))[teamX],
      teamB: getLosers(data.filter((item) => item.type === 10))[teamY],
      points: "0",
      timestamp: Date.now(),
    };
  });

  const final = finalScheme?.map((item, index) => {
    const teamX = item.teamA.split("WG")[1] - 1;
    const teamY = item.teamB.split("WG")[1] - 1;

    return {
      id: 63 + index,
      type: 12,
      date: "10 nov",
      time: "10:00",
      teamA: getWinners(data.filter((item) => item.type === 10))[teamX],
      teamB: getWinners(data.filter((item) => item.type === 10))[teamY],
      points: "0",
      timestamp: Date.now(),
    };
  });

  const onInputChangeA = useCallback(
    (e) => {
      const newVal = e?.target?.value;
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.id === Number(id) ? { ...item, valueA: Number(newVal) } : item
        )
      );
    },
    [setData]
  );

  const onInputChangeB = useCallback(
    (e) => {
      const newVal = e?.target?.value;
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.id === Number(id) ? { ...item, valueB: Number(newVal) } : item
        )
      );
    },
    [setData]
  );

  useEffect(() => {
    if (onChange) {
      onChange(data);
    }
  }, [data]);

  useEffect(() => {
    let arrType = [];

    if (count === 8) {
      arrType = [...data, ...roundOf16];
    }

    if (count === 9) {
      arrType = [...data, ...roundOf16, ...quarter];
    }

    if (count === 10) {
      arrType = [...data, ...roundOf16, ...quarter, ...semi];
    }

    if (count === 11) {
      arrType = [...data, ...roundOf16, ...quarter, ...semi, ...thirdPlace];
    }

    if (count === 12) {
      arrType = [
        ...data,
        ...roundOf16,
        ...quarter,
        ...semi,
        ...thirdPlace,
        ...final,
      ];
    }

    const filteredData = arrType.reduce((result, obj) => {
      let row = result.find((x) => x.id === obj.id);
      if (!row) result.push({ ...obj });
      else if (row.timestamp < obj.timestamp) Object.assign(row, obj);
      return result;
    }, []);

    if (
      count === 8 ||
      count === 9 ||
      count === 10 ||
      count === 11 ||
      count === 12
    ) {
      setData(filteredData);
    }
  }, [count]);

  const resultsCheck = data?.filter(
    (item) => item.resultA && item?.type === count
  );

  return (
    <table className={classes}>
      <thead className={styles.head}>
        <tr>
          <th width={"10%"}>
            <Content text={"Date"} color={"stable-500"} size={"s"} />
          </th>
          <th>
            <Content text={"Match"} color={"stable-500"} size={"s"} />
          </th>
          {resultsCheck.length > 0 && (
            <th>
              <Content text={"Result"} color={"stable-500"} size={"s"} />
            </th>
          )}
          <th width={"10%"}>
            <Content text={"Points"} color={"stable-500"} size={"s"} />
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item?.type === count && (
                <Row
                  onChangeA={onInputChangeA}
                  onChangeB={onInputChangeB}
                  {...item}
                />
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  matches: PropTypes.array,
  count: PropTypes.number,
};

Table.defaultProps = {
  className: "",
  matches: null,
  count: 0,
};

export default Table;
