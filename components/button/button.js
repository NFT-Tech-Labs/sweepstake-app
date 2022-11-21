import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Content, Icon } from "@components";

const cx = classNames.bind(styles);

const Button = ({
  text,
  size,
  color,
  textColor,
  onClick,
  link,
  outline,
  active,
  disabled,
  filled,
  icon,
  className,
}) => {
  const classes = cx(
    {
      button: true,
      link,
      disabled,
      outline,
      active,
      filled,
      icon,
      [`background-${color}`]: color,
    },
    className
  );

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <Content text={text} size={size} color={textColor} />
      {icon && <Icon {...icon} />}
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
  outline: PropTypes.bool,
  active: PropTypes.bool,
  filled: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.shape(Icon.propTypes),
};

Button.defaultProps = {
  className: "",
  text: "",
  size: "s",
  textColor: "",
  color: "positive",
  onClick: () => null,
  link: false,
  outline: false,
  active: false,
  filled: false,
  disabled: false,
  icon: null,
};

export default Button;
