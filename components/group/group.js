import React from "react";
import classNames from "classnames/bind";
import styles from "./group.module.scss";
import PropTypes from "prop-types";
import { Title } from "@components";
import ReactCountryFlag from "react-country-flag";

const cx = classNames.bind(styles);

const Group = ({ className, teams }) => {
  let classes = cx({ group: true }, className);

  return (
    <div className={classes}>
      {teams?.map((item, index) => (
        <div key={index} className={styles.team}>
          {item.name && (
            <div className={styles.name}>
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
              <Title tag={"h6"} text={item.name} />
            </div>
          )}
          {item.points !== null && (
            <Title tag={"h5"} color={"positive"} text={item.points} />
          )}
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
