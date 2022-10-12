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
  valueA,
  valueB,
  resultA,
  resultB,
  onChangeA,
  onChangeB,
  id,
}) => {
  const perfect =
    resultA || resultB ? valueA === resultA && valueB === resultB : false;
  const correct =
    resultA || resultB
      ? (valueA > valueB && resultA > resultB) ||
        (valueA < valueB && resultA < resultB)
      : false;

  let classes = cx(
    {
      row: true,
      results: resultA || resultB,
      perfect,
      correct,
    },
    className
  );

  return (
    <tr className={classes}>
      {date && (
        <td className={styles.date}>
          <div className={styles.dateWrapper}>
            {group && (
              <div className={styles.groupWrapper}>
                <Content text={group} color={"dark"} size={"m"} />
              </div>
            )}
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
                valueA === valueB || valueA === "" || valueB === ""
                  ? ""
                  : valueA > valueB
                  ? styles.win
                  : styles.lose,
              ].join(" ")}
              emphasize
            />
            <ReactCountryFlag
              countryCode={teamA}
              svg
              style={{
                width: "1.5em",
                height: "1.5em",
              }}
              title={teamA}
            />
            <div className={styles.matchInput}>
              <div className={styles.matchPrediction}>
                <input
                  id={id}
                  type={"text"}
                  value={valueA}
                  maxLength={"2"}
                  onChange={onChangeA}
                  disabled={resultA || resultB}
                />
                <input
                  id={id}
                  type={"text"}
                  value={valueB}
                  maxLength={"2"}
                  onChange={onChangeB}
                  disabled={resultA || resultB}
                />
              </div>
            </div>
            <ReactCountryFlag
              countryCode={teamB}
              svg
              style={{
                width: "1.5em",
                height: "1.5em",
              }}
              title={teamB}
            />
            <Content
              text={teamB}
              size={"xs"}
              className={[
                styles.country,
                valueA === valueB || valueA === "" || valueB === ""
                  ? ""
                  : valueA < valueB
                  ? styles.win
                  : styles.lose,
              ].join(" ")}
              emphasize
            />
          </div>
        </td>
      )}
      {resultA !== null && resultB !== null && (
        <td className={styles.status}>
          <div className={styles.statusWrapper}>
            <div className={styles.matchResult}>
              <input
                id={id}
                type={"text"}
                value={resultA}
                maxLength={"2"}
                disabled
                className={resultA > resultB ? styles.win : styles.lose}
              />
              <input
                id={id}
                type={"text"}
                value={resultB}
                maxLength={"2"}
                disabled
                className={resultA < resultB ? styles.win : styles.lose}
              />
            </div>
            <div>
              <Icon
                name={
                  perfect ? "checkmark-double" : correct ? "checkmark" : "cross"
                }
                color={"dark"}
                size={"xxs"}
                className={styles.icon}
              />
            </div>
          </div>
        </td>
      )}
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
  valueA: PropTypes.number,
  valueB: PropTypes.number,
  resultA: PropTypes.number,
  resultB: PropTypes.number,
  onChangeA: PropTypes.func,
  onChangeB: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Row.defaultProps = {
  className: "",
  date: "",
  time: "",
  group: "",
  points: "",
  teamA: "",
  teamB: "",
  valueA: null,
  valueB: null,
  resultA: null,
  resultB: null,
  onChangeA: () => null,
  onChangeB: () => null,
  id: "",
};

export default memo(Row);
