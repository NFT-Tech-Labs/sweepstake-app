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
              : styles.team
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
          <div className={styles.points}>
            {item.goalsGreater !== null && (
              <Content
                size={"xs"}
                color={"positive"}
                text={item.goalsGreater ? item.goalsGreater : "/"}
              />
            )}
            {item.goalsDifferenceGreater !== null && (
              <Content
                size={"xs"}
                color={"positive"}
                text={
                  item.goalsDifferenceGreater
                    ? item.goalsDifferenceGreater
                    : "/"
                }
              />
            )}
            {item.pointsGreater !== null && (
              <Content
                size={"xs"}
                color={"positive"}
                text={item.pointsGreater ? item.pointsGreater : "/"}
              />
            )}

            {item.goals !== null && (
              <Content size={"xs"} color={"positive"} text={item.goals} />
            )}
            {item.goalsDifference !== null && (
              <Content
                size={"xs"}
                color={"positive"}
                text={item.goalsDifference}
              />
            )}
            {item.points !== null && (
              <Title tag={"h6"} color={"positive"} text={item.points} />
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
