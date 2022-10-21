import React from "react";
import classNames from "classnames/bind";
import styles from "./timeline.module.scss";
import PropTypes from "prop-types";
import { Button } from "@components";

const cx = classNames.bind(styles);

const Timeline = ({
  className,
  rounds,
  count,
  groupsFilled,
  ro16Filled,
  quarterFilled,
  semiFilled,
  thirdFilled,
  finalFilled,
}) => {
  let classes = cx({ timeline: true }, className);
  return (
    <div className={classes}>
      <ul>
        {rounds?.map((item, index) => (
          <li key={index} className={styles.item}>
            <Button
              size={"xxs"}
              textColor={"light"}
              filled={
                (groupsFilled && index === 0) ||
                (ro16Filled && index === 1) ||
                (quarterFilled && index === 2) ||
                (semiFilled && index === 3) ||
                (thirdFilled && index === 4) ||
                (finalFilled && index === 5)
              }
              active={
                count < 8
                  ? index === 0
                    ? true
                    : false
                  : count >= 8 && index === count - 7
                  ? true
                  : false
              }
              outline
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
  count: PropTypes.number,
  groupsFilled: PropTypes.bool,
  ro16Filled: PropTypes.bool,
  quarterFilled: PropTypes.bool,
  semiFilled: PropTypes.bool,
  thirdFilled: PropTypes.bool,
  finalFilled: PropTypes.bool,
};

Timeline.defaultProps = {
  className: "",
  rounds: null,
  count: 1,
  groupsFilled: false,
  ro16Filled: false,
  quarterFilled: false,
  semiFilled: false,
  thirdFilled: false,
  finalFilled: false,
};

export default Timeline;
