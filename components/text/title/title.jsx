import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./title.module.scss";

const cx = classNames.bind(styles);

const Title = ({ tag, text, color, className }) => {
  const classes = cx(
    {
      title: true,
    },
    [`color-${color}`],
    className
  );

  const CustomComponent = tag;

  return <CustomComponent className={classes}>{text}</CustomComponent>;
};

Title.propTypes = {
  tag: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

Title.defaultProps = {
  tag: "h1",
  text: "",
  color: "dark",
  className: "",
};

export default Title;
