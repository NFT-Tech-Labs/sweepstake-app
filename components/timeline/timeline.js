import React from "react";
import classNames from "classnames/bind";
import styles from "./timeline.module.scss";
import PropTypes from "prop-types";
import Button from "../button/button";

const cx = classNames.bind(styles);

const Timeline = ({ className, rounds, active }) => {
  let classes = cx({ timeline: true }, className);

  return (
    <div className={classes}>
      <ul>
        {rounds?.map((item, index) => (
          <li key={index} className={styles.item}>
            <Button
              link
              size={"s"}
              color={active - 1 === index ? "positive" : "stable-500"}
              text={item}
              {...item}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

Timeline.propTypes = {
  className: PropTypes.string,
  rounds: PropTypes.array,
  active: PropTypes.number,
};

Timeline.defaultProps = {
  className: "",
  rounds: null,
  active: 1,
};

export default Timeline;
