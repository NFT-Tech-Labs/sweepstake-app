import React, { useState, useEffect, useCallback, memo } from "react";
import classNames from "classnames/bind";
import styles from "./row.module.scss";
import PropTypes from "prop-types";
import { Content } from "@components";
import ReactCountryFlag from "react-country-flag";

const cx = classNames.bind(styles);

const Row = ({
  className,
  date,
  time,
  group,
  match,
  points,
  valueA,
  valueB,
  onChangeA,
  onChangeB,
  id,
}) => {
  let classes = cx(
    {
      row: true,
    },
    className
  );

  const teams = match?.split("-");

  return (
    <tr className={classes}>
      {date && (
        <td className={styles.date}>
          <Content text={time} className={styles.time} emphasize />
          <Content text={date} color={"stable-500"} size={"xs"} />
        </td>
      )}
      {match && (
        <>
          <td className={styles.match}>
            <div className={styles.matchWrapper}>
              {/* team 1 */}
              <Content
                text={teams[0]}
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
                countryCode={teams[0]}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                title={teams[0]}
              />
              <input
                id={id}
                type={"text"}
                value={valueA}
                maxLength={"2"}
                onChange={onChangeA}
              />
              {/* team 2 */}
              <input
                id={id}
                type={"text"}
                value={valueB}
                maxLength={"2"}
                onChange={onChangeB}
              />
              <ReactCountryFlag
                countryCode={teams[1]}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                title={teams[1]}
              />
              <Content
                text={teams[1]}
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
        </>
      )}
      {group && (
        <td className={styles.group}>
          <div className={styles.groupWrapper}>
            <Content text={group} color={"positive"} size={"m"} />
          </div>
        </td>
      )}
      {points && (
        <td className={styles.points}>
          <div className={styles.pointsWrapper}>
            <Content text={points} color={"positive"} size={"m"} />
          </div>
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
  match: PropTypes.string,
  points: PropTypes.string,
  valueA: PropTypes.number,
  valueB: PropTypes.number,
  onChangeA: PropTypes.func,
  onChangeB: PropTypes.func,
  id: PropTypes.string,
};

Row.defaultProps = {
  className: "",
  date: "",
  time: "",
  group: "",
  points: "",
  valueA: null,
  valueB: null,
  onChangeA: () => null,
  onChangeB: () => null,
  id: "",
};

export default memo(Row);
