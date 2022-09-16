import React from "react";
import classNames from "classnames/bind";
import styles from "./container.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Container = ({ children, className }) => {
  let classes = cx({ container: true }, className);

  return <div className={classes}>{children}</div>;
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Container.defaultProps = {
  className: "",
  children: null,
};

export default Container;
