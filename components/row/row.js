import React, { useState, useEffect, useCallback, memo } from "react";
import classNames from "classnames/bind";
import styles from "./row.module.scss";
import PropTypes from "prop-types";
import { Content, Icon } from "@components";
import ReactCountryFlag from "react-country-flag";

const cx = classNames.bind(styles);

const Row = ({
  className,
  playDate,
  playTime,
  group,
  result,
  pointsVisible,
  points,
  teamA,
  teamB,
  scoreA,
  scoreB,
  resultA,
  resultB,
  extensionA,
  extensionB,
  onChangeA,
  onChangeB,
  onChangeExtensionA,
  onChangeExtensionB,
  rowId,
  disabled,
  index,
  count,
  worldChampion,
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
  const draw = scoreA === scoreB && scoreA !== null && scoreB !== null;

  let classes = cx(
    {
      row: true,
      results: resultA || resultB,
      perfect,
      correct,
      filledA,
      filledB,
      blank,
      disabled,
      worldChampionA: teamA === worldChampion,
      worldChampionB: teamB === worldChampion,
    },
    className
  );

  return (
    <tr className={classes}>
      {playDate && (
        <td className={styles.playDate}>
          <div className={styles.dateWrapper}>
            <div className={styles.groupWrapper}>
              <Content text={group} color={"dark"} size={"m"} />
            </div>
            <div>
              <Content text={playTime} className={styles.playTime} emphasize />
              <Content text={playDate} color={"stable-500"} size={"xs"} />
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
            <div className={styles.flagWrapper}>
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
              {draw && count > 7 && (
                <input
                  id={rowId}
                  name={`extensionWinner_${index}`}
                  type={"radio"}
                  value={teamA}
                  checked={extensionA}
                  onChange={onChangeExtensionA}
                  disabled={disabled || resultA || resultB}
                  className={styles.extensionWinner}
                />
              )}
            </div>
            <div className={styles.matchInput}>
              <div className={styles.matchPrediction}>
                <input
                  id={rowId}
                  type={"number"}
                  value={scoreA}
                  min={"0"}
                  onChange={onChangeA}
                  onWheel={(e) => e.target.blur()}
                  disabled={disabled || resultA || resultB}
                  className={styles.inputMatch}
                />
                <input
                  id={rowId}
                  type={"number"}
                  value={scoreB === 0 ? 0 : scoreB}
                  min={"0"}
                  onChange={onChangeB}
                  onWheel={(e) => e.target.blur()}
                  disabled={disabled || resultA || resultB}
                  className={styles.inputMatch}
                />
              </div>
            </div>
            <div className={styles.flagWrapper}>
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
              {draw && count > 7 && (
                <input
                  id={rowId}
                  name={`extensionWinner_${index}`}
                  type={"radio"}
                  value={teamB}
                  checked={extensionB}
                  onChange={onChangeExtensionB}
                  disabled={disabled || resultA || resultB}
                  className={styles.extensionWinner}
                />
              )}
            </div>
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
      {result && (
        <td className={styles.status}>
          <div className={styles.statusWrapper}>
            <div className={styles.matchResult}>
              <input
                id={rowId}
                type={"text"}
                value={resultA?.toString() || "-"}
                maxLength={"2"}
                disabled
                className={resultA > resultB ? styles.win : styles.lose}
              />
              <input
                id={rowId}
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
      )}
      {points && pointsVisible && (
        <td className={styles.points}>
          <Content text={points} color={"positive"} size={"m"} />
        </td>
      )}
    </tr>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  playDate: PropTypes.string,
  playTime: PropTypes.string,
  group: PropTypes.string,
  result: PropTypes.bool,
  points: PropTypes.string,
  pointsVisible: PropTypes.bool,
  teamA: PropTypes.string,
  teamB: PropTypes.string,
  scoreA: PropTypes.number,
  scoreB: PropTypes.number,
  resultA: PropTypes.number,
  resultB: PropTypes.number,
  extensionA: PropTypes.bool,
  extensionB: PropTypes.bool,
  onChangeA: PropTypes.func,
  onChangeB: PropTypes.func,
  onChangeExtensionA: PropTypes.func,
  onChangeExtensionB: PropTypes.func,
  rowId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  index: PropTypes.number,
  count: PropTypes.number,
  worldChampion: PropTypes.string,
};

Row.defaultProps = {
  className: "",
  playDate: "",
  playTime: "",
  group: "",
  result: true,
  pointsVisible: true,
  points: "",
  teamA: "",
  teamB: "",
  scoreA: null,
  scoreB: null,
  resultA: null,
  resultB: null,
  extensionA: false,
  extensionB: false,
  onChangeA: () => null,
  onChangeB: () => null,
  onChangeC: () => null,
  onChangeD: () => null,
  rowId: "",
  disabled: false,
  index: 0,
  count: 0,
  worldChampion: "",
};

export default memo(Row);
