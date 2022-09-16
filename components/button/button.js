import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Content } from "@components";

const cx = classNames.bind(styles);

const Button = ({ text, size, color, onClick, link, className }) => {
  const classes = cx(
    {
      button: true,
      link,
    },
    className
  );

  return (
    <button className={classes} onClick={onClick}>
      <Content text={text} size={size} color={color} />
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.bool,
};

Button.defaultProps = {
  className: "",
  text: "",
  size: "m",
  color: "positive",
  onClick: () => null,
  link: false,
};

export default Button;
