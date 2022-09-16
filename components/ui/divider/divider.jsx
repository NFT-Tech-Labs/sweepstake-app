import React from "react";
import classNames from "classnames/bind";
import styles from "./divider.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Divider = ({ className, width, height, color }) => {
  let classes = cx(
    {
      divider: true,
      [`background-${color}`]: color,
    },
    className
  );

  return (
    <div className={classes}>
      <span
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      ></span>
    </div>
  );
};

Divider.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

Divider.defaultProps = {
  width: null,
  height: null,
  color: "transparent",
  className: "",
};

export default Divider;
