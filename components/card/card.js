import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Title from "../text/title/title";
import Content from "../text/content/content";

const cx = classNames.bind(styles);

const Card = ({
  borderRadius,
  padding,
  boxShadow,
  overflow,
  children,
  color,
  className,
  href,
}) => {
  const classes = cx(
    {
      card: true,
      borderRadius,
      padding,
      boxShadow,
      overflow,
      [`background-${color}`]: color,
    },
    className
  );

  const CustomComponent = () => <div className={classes}>{children}</div>;

  return href ? (
    <Link href={href}>
      <a>
        <CustomComponent />
      </a>
    </Link>
  ) : (
    <CustomComponent />
  );
};

Card.propTypes = {
  borderRadius: PropTypes.bool,
  padding: PropTypes.bool,
  boxShadow: PropTypes.bool,
  overflow: PropTypes.bool,
  children: PropTypes.any,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
};

Card.defaultProps = {
  borderRadius: false,
  padding: false,
  boxShadow: false,
  overflow: false,
  children: null,
  color: "",
  className: "",
  onClick: null,
  href: "",
};

export default Card;
