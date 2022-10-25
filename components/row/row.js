import React, { useState, useEffect, useCallback, memo } from "react";
import classNames from "classnames/bind";
import styles from "./row.module.scss";
import PropTypes from "prop-types";
import { Content, Icon } from "@components";
import ReactCountryFlag from "react-country-flag";

const cx = classNames.bind(styles);

const Row = ({
  className,
  date,
  time,
  group,
  points,
  teamA,
  teamB,
  scoreA,
  scoreB,
  resultA,
  resultB,
  onChangeA,
  onChangeB,
  matchId,
}) => {
  const perfect =
    resultA || resultB ? scoreA === resultA && scoreB === resultB : false;
  const correct =
    resultA || resultB
      ? (scoreA > scoreB && resultA > resultB) ||
        (scoreA < scoreB && resultA < resultB)
      : false;
  const filledA = scoreA !== null;
  const filledB = scoreB !== null;
  const blank = resultA === null || resultB === null;

  let classes = cx(
    {
      row: true,
      results: resultA || resultB,
      perfect,
      correct,
      filledA,
      filledB,
      blank,
    },
    className
  );

  return (
    <tr className={classes}>
      {date && (
        <td className={styles.date}>
          <div className={styles.dateWrapper}>
            <div className={styles.groupWrapper}>
              <Content text={group} color={"dark"} size={"m"} />
            </div>

            <div>
              <Content text={time} className={styles.time} emphasize />
              <Content text={date} color={"stable-500"} size={"xs"} />
            </div>
          </div>
        </td>
      )}
      {teamA && teamB && (
        <td className={styles.match}>
          <div className={styles.matchWrapper}>
            {/* team 1 */}
            <Content
              text={teamA}
              size={"xs"}
              className={[
                styles.country,
                scoreA === scoreB || scoreA === "" || scoreB === ""
                  ? ""
                  : scoreA > scoreB
                  ? styles.win
                  : styles.lose,
              ].join(" ")}
              emphasize
            />
            {teamA === "EN" && teamA !== "WL" && (
              <Icon name={"EN"} className={styles.customIconEN} />
            )}
            {teamA === "WL" && teamA !== "EN" && (
              <Icon name={"WL"} className={styles.customIcon} />
            )}
            {teamA !== "EN" && teamA !== "WL" && (
              <ReactCountryFlag
                countryCode={teamA}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                title={teamA}
              />
            )}
            <Icon />
            <div className={styles.matchInput}>
              <div className={styles.matchPrediction}>
                <input
                  id={matchId}
                  type={"number"}
                  value={scoreA}
                  min={"0"}
                  onChange={onChangeA}
                  onWheel={(e) => e.target.blur()}
                  // disabled={resultA || resultB}
                />
                <input
                  id={matchId}
                  type={"number"}
                  value={scoreB}
                  min={"0"}
                  onChange={onChangeB}
                  onWheel={(e) => e.target.blur()}
                  // disabled={resultA || resultB}
                />
              </div>
            </div>
            {teamB === "EN" && teamB !== "WL" && (
              <Icon name={"EN"} className={styles.customIconEN} />
            )}
            {teamB === "WL" && teamB !== "EN" && (
              <Icon name={"WL"} className={styles.customIcon} />
            )}
            {teamB !== "EN" && teamB !== "WL" && (
              <ReactCountryFlag
                countryCode={teamB}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                title={teamB}
              />
            )}
            <Content
              text={teamB}
              size={"xs"}
              className={[
                styles.country,
                scoreA === scoreB || scoreA === "" || scoreB === ""
                  ? ""
                  : scoreA < scoreB
                  ? styles.win
                  : styles.lose,
              ].join(" ")}
              emphasize
            />
          </div>
        </td>
      )}
      <td className={styles.status}>
        <div className={styles.statusWrapper}>
          <div className={styles.matchResult}>
            <input
              id={matchId}
              type={"text"}
              value={resultA?.toString() || "-"}
              maxLength={"2"}
              disabled
              className={resultA > resultB ? styles.win : styles.lose}
            />
            <input
              id={matchId}
              type={"text"}
              value={resultB?.toString() || "-"}
              maxLength={"2"}
              disabled
              className={resultA < resultB ? styles.win : styles.lose}
            />
          </div>
          <div>
            <Icon
              name={
                perfect
                  ? "checkmark-double"
                  : correct
                  ? "checkmark"
                  : blank
                  ? "blank"
                  : "cross"
              }
              color={"dark"}
              size={"xxs"}
              className={styles.icon}
            />
          </div>
        </div>
      </td>

      {points && (
        <td className={styles.points}>
          <Content
            text={perfect ? 5 : correct ? 3 : 0}
            color={"positive"}
            size={"m"}
          />
        </td>
      )}
    </tr>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  group: PropTypes.string,
  points: PropTypes.string,
  teamA: PropTypes.string,
  teamB: PropTypes.string,
  scoreA: PropTypes.number,
  scoreB: PropTypes.number,
  resultA: PropTypes.number,
  resultB: PropTypes.number,
  onChangeA: PropTypes.func,
  onChangeB: PropTypes.func,
  matchId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Row.defaultProps = {
  className: "",
  date: "",
  time: "",
  group: "",
  points: "",
  teamA: "",
  teamB: "",
  scoreA: null,
  scoreB: null,
  resultA: null,
  resultB: null,
  onChangeA: () => null,
  onChangeB: () => null,
  matchId: "",
};

export default memo(Row);
