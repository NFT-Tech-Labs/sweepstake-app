import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./row.module.scss";
import PropTypes from "prop-types";
import { Content } from "@components";
import ReactCountryFlag from "react-country-flag";

const cx = classNames.bind(styles);

const Row = ({ className, date, time, group, match, points }) => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  let classes = cx(
    {
      row: true,
    },
    className
  );

  const teams = match?.split("-");

  const handleTeam1 = (e) => {
    setTeam1(e?.target?.value);
  };

  const handleTeam2 = (e) => {
    setTeam2(e?.target?.value);
  };

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
                  team1 === team2 || team1 === "" || team2 === ""
                    ? ""
                    : team1 > team2
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
                onChange={(e) => handleTeam1(e)}
                type={"text"}
                value={team1}
                maxLength={"2"}
              />
              {/* team 2 */}
              <input
                onChange={(e) => handleTeam2(e)}
                type={"text"}
                value={team2}
                maxLength={"2"}
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
                  team1 === team2 || team1 === "" || team2 === ""
                    ? ""
                    : team1 < team2
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
};

Row.defaultProps = {
  className: "",
};

export default Row;
