import React from "react";
import classNames from "classnames/bind";
import styles from "./timeline.module.scss";
import PropTypes from "prop-types";
import Button from "../button/button";

const cx = classNames.bind(styles);

const Timeline = ({ className, rounds, count }) => {
  let classes = cx({ timeline: true }, className);

  return (
    <div className={classes}>
      <ul>
        {rounds?.map((item, index) => (
          <li key={index} className={styles.item}>
            <Button
              link
              size={"s"}
              textColor={
                count < 8
                  ? index === 0
                    ? "positive"
                    : "stable-500"
                  : count >= 8 && index === count - 7
                  ? "positive"
                  : "stable-500"
              }
              text={item}
              {...item}
            />
            {/* <Button
              link
              size={"s"}
              textColor={
                active >= 8 && index === active - 7 ? "positive" : "stable-500"
              }
              text={item}
              {...item}
            /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

Timeline.propTypes = {
  className: PropTypes.string,
  rounds: PropTypes.array,
  count: PropTypes.number,
};

Timeline.defaultProps = {
  className: "",
  rounds: null,
  count: 1,
};

export default Timeline;
