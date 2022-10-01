import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Content } from "@components";

const cx = classNames.bind(styles);

const Button = ({
  text,
  size,
  color,
  textColor,
  onClick,
  link,
  disabled,
  className,
}) => {
  const classes = cx(
    {
      button: true,
      link,
      disabled,
      [`background-${color}`]: color,
    },
    className
  );

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <Content text={text} size={size} color={textColor} />
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: "",
  text: "",
  size: "s",
  textColor: "",
  color: "positive",
  onClick: () => null,
  link: false,
  disabled: false,
};

export default Button;
