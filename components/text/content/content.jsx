/* eslint-disable react/no-children-prop */
import React from "react";
import classNames from "classnames/bind";
import styles from "./content.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const Content = ({
  text,
  color,
  size,
  inline,
  italic,
  emphasize,
  className,
  children,
}) => {
  const classes = cx(
    {
      content: true,
      italic,
      emphasize,
    },
    className,
    [`color-${color}`],
    [`font-${size}`]
  );

  const CustomComponent = inline ? "span" : "p";

  return (
    <CustomComponent className={classes}>
      {text}
      {children}
    </CustomComponent>
  );
};

Content.propTypes = {
  text: PropTypes.any,
  color: PropTypes.string,
  size: PropTypes.string,
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  emphasize: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

Content.defaultProps = {
  text: "",
  color: "dark",
  size: "m",
  inline: false,
  italic: false,
  emphasize: false,
  className: "",
  children: null,
};

export default Content;
