import React from "react";
import classNames from "classnames/bind";
import styles from "./group.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Icon } from "@components";
import ReactCountryFlag from "react-country-flag";

const cx = classNames.bind(styles);

const Group = ({ className, teams }) => {
  let classes = cx(
    {
      group: true,
    },
    className
  );

  return (
    <div className={classes}>
      {teams?.map((item, index) => (
        <div
          key={index}
          className={
            index === 0 || index === 1
              ? [styles.team, styles.qualified].join(" ")
              : index === 3
              ? [styles.team, styles.teamLast].join(" ")
              : [styles.team]
          }
        >
          {item.name && (
            <div className={styles.name}>
              <Title
                tag={"h6"}
                color={index === 0 || index === 1 ? "balanced" : "dark"}
                text={index + 1}
              />
              {item.name === "EN" && item.name !== "WL" && (
                <Icon name={"EN"} className={styles.customIconEN} />
              )}
              {item.name === "WL" && item.name !== "EN" && (
                <Icon name={"WL"} className={styles.customIcon} />
              )}
              {item.name !== "EN" && item.name !== "WL" && (
                <ReactCountryFlag
                  countryCode={item.name}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  title={item.name}
                  className={styles.flag}
                />
              )}
              <Title tag={"h6"} text={item.name} />
            </div>
          )}
          <div className={styles.score}>
            {item.goals !== null && (
              <div className={styles.itemWrapper}>
                {index === teams.length - 1 && (
                  <Content
                    size={"xxs"}
                    color={"stable-500"}
                    text={"G"}
                    className={styles.goalsLabel}
                  />
                )}
                <Content
                  size={"xs"}
                  color={"dark"}
                  text={item.goals}
                  className={styles.goals}
                />
              </div>
            )}
            {item.goalsDifference !== null && (
              <div className={styles.itemWrapper}>
                {index === teams.length - 1 && (
                  <Content
                    size={"xxs"}
                    color={"stable-500"}
                    text={"GD"}
                    className={styles.goalsDifferenceLabel}
                  />
                )}
                <Content
                  size={"xs"}
                  color={"dark"}
                  text={item.goalsDifference}
                  className={styles.goalsDifference}
                />
              </div>
            )}
            {item.points !== null && (
              <div className={styles.itemWrapper}>
                {index === teams.length - 1 && (
                  <Content
                    size={"xxs"}
                    color={"positive"}
                    text={"PT"}
                    className={styles.pointsLabel}
                  />
                )}
                <Title
                  tag={"h6"}
                  color={"positive"}
                  text={item.points}
                  className={styles.points}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

Group.propTypes = {
  className: PropTypes.string,
  teams: PropTypes.array,
};

Group.defaultProps = {
  className: "",
  teams: null,
};

export default Group;
