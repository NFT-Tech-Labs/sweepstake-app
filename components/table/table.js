/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./table.module.scss";
import PropTypes from "prop-types";
import { Content, Row, Snackbar } from "@components";
import { groupWinners, getWinners, getLosers } from "../../utils/helpers";
import {
  roundOf16Scheme,
  quarterScheme,
  semiScheme,
  thirdPlaceScheme,
  finalScheme,
} from "../../utils/data";
import { Vortex } from "react-loader-spinner";

const cx = classNames.bind(styles);

const Table = ({
  className,
  matches,
  count,
  groupStage,
  onChange,
  processing,
  confirmation,
  disabled,
  worldChampion,
  pointsVisible,
  result,
}) => {
  const [data, setData] = useState(matches);

  let classes = cx(
    {
      table: true,
      blur: processing || confirmation,
    },
    className
  );

  const roundOf16 = roundOf16Scheme?.map((item, index) => {
    const teamX = item.teamA.split("")[0];
    const placementX = item.teamA.split("")[1] - 1;
    const teamY = item.teamB.split("")[0];
    const placementY = item.teamB.split("")[1] - 1;

    return {
      rowId: 48 + index,
      matchId: 48 + index,
      type: 8,
      playDate: item?.playDate,
      playTime: item?.playTime,
      teamA: groupWinners(groupStage, teamX)[0]?.teams[placementX].name,
      teamB: groupWinners(groupStage, teamY)[0]?.teams[placementY].name,
      resultA: item.resultA,
      resultB: item.resultB,
      points: "0",
      timestamp: Date.now(),
    };
  });

  const quarter = quarterScheme.map((item, index) => {
    const teamX = item.teamA.split("WG")[1] - 1;
    const teamY = item.teamB.split("WG")[1] - 1;

    return {
      rowId: 56 + index,
      matchId: 56 + index,
      type: 9,
      playDate: item?.playDate,
      playTime: item?.playTime,
      teamA: getWinners(data.filter((item) => item.type === 8))[teamX],
      teamB: getWinners(data.filter((item) => item.type === 8))[teamY],
      resultA: item.resultA,
      resultB: item.resultB,
      points: "0",
      timestamp: Date.now(),
    };
  });

  const semi = semiScheme?.map((item, index) => {
    const teamX = item.teamA.split("WG")[1] - 1;
    const teamY = item.teamB.split("WG")[1] - 1;

    return {
      rowId: 60 + index,
      matchId: 60 + index,
      type: 10,
      playDate: item?.playDate,
      playTime: item?.playTime,
      teamA: getWinners(data.filter((item) => item.type === 9))[teamX],
      teamB: getWinners(data.filter((item) => item.type === 9))[teamY],
      resultA: item.resultA,
      resultB: item.resultB,
      points: "0",
      timestamp: Date.now(),
    };
  });

  const thirdPlace = thirdPlaceScheme?.map((item, index) => {
    const teamX = item.teamA.split("LG")[1] - 1;
    const teamY = item.teamB.split("LG")[1] - 1;

    return {
      rowId: 62 + index,
      matchId: 62 + index,
      type: 11,
      playDate: item?.playDate,
      playTime: item?.playTime,
      teamA: getLosers(data.filter((item) => item.type === 10))[teamX],
      teamB: getLosers(data.filter((item) => item.type === 10))[teamY],
      resultA: item.resultA,
      resultB: item.resultB,
      points: "0",
      timestamp: Date.now(),
    };
  });

  const final = finalScheme?.map((item, index) => {
    const teamX = item.teamA.split("WG")[1] - 1;
    const teamY = item.teamB.split("WG")[1] - 1;

    return {
      rowId: 63 + index,
      matchId: 63 + index,
      type: 12,
      playDate: item?.playDate,
      playTime: item?.playTime,
      teamA: getWinners(data.filter((item) => item.type === 10))[teamX],
      teamB: getWinners(data.filter((item) => item.type === 10))[teamY],
      resultA: item.resultA,
      resultB: item.resultB,
      points: "0",
      timestamp: Date.now(),
    };
  });

  const onInputChangeA = useCallback(
    (e) => {
      const newVal = e?.target?.value?.slice(0, 2);
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.rowId === Number(id)
            ? {
                ...item,
                scoreA: newVal || null,
              }
            : item
        )
      );
    },
    [setData]
  );

  const onInputChangeB = useCallback(
    (e) => {
      const newVal = e?.target?.value?.slice(0, 2);
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.rowId === Number(id)
            ? {
                ...item,
                scoreB: newVal || null,
              }
            : item
        )
      );
    },
    [setData]
  );

  const onInputChangeExtensionA = useCallback(
    (e) => {
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.rowId === Number(id)
            ? {
                ...item,
                extensionA: true,
                extensionB: false,
                extensionWinner: item.teamA,
              }
            : item
        )
      );
    },
    [setData]
  );

  const onInputChangeExtensionB = useCallback(
    (e) => {
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.rowId === Number(id)
            ? {
                ...item,
                extensionA: false,
                extensionB: true,
                extensionWinner: item.teamB,
              }
            : item
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
      let row = result.find((x) => x.rowId === obj.rowId);
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
  const Loader = () => {
    return (
      <Vortex
        visible={true}
        height="100"
        width="100"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["white", "black", "white", "black", "white", "black"]}
      />
    );
  };

  const drawCheck = data?.filter(
    (item) =>
      item.scoreA &&
      item.scoreB !== null &&
      item.scoreA === item.scoreB &&
      item.type > 7 &&
      item.type === count
  );

  return (
    <div className={styles.tableWrapper}>
      {processing && (
        <div className={styles.processing}>
          <Loader />
        </div>
      )}
      {drawCheck.length > 0 && (
        <Snackbar
          title={{
            text: "Draw",
          }}
          content={{
            text: "Make sure to select a winner",
          }}
          className={styles.snackbar}
        />
      )}
      <table className={classes}>
        <thead className={styles.head}>
          <tr>
            <th width={"15%"}>
              <Content text={"Date"} color={"stable-500"} size={"s"} />
            </th>
            <th>
              <Content text={"Match"} color={"stable-500"} size={"s"} />
            </th>
            {result && (
              <th>
                <Content text={"Result"} color={"stable-500"} size={"s"} />
              </th>
            )}
            {pointsVisible && (
              <th width={"10%"}>
                <Content text={"Points"} color={"stable-500"} size={"s"} />
              </th>
            )}
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
                    onChangeExtensionA={onInputChangeExtensionA}
                    onChangeExtensionB={onInputChangeExtensionB}
                    count={count}
                    disabled={disabled}
                    worldChampion={worldChampion}
                    index={index}
                    pointsVisible={pointsVisible}
                    {...item}
                    result={result}
                  />
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  matches: PropTypes.array,
  count: PropTypes.number,
  processing: PropTypes.bool,
  confirmation: PropTypes.bool,
  worldChampion: PropTypes.string,
  pointsVisible: PropTypes.bool,
  result: PropTypes.bool,
};

Table.defaultProps = {
  className: "",
  matches: null,
  count: 0,
  processing: false,
  confirmation: false,
  worldChampion: "",
  pointsVisible: true,
  result: true,
};

export default Table;
