import React from "react";
import styles from "./example.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Card, Title, Icon, Divider, Content } from "@components";

const cx = classNames.bind(styles);

const Example = ({ className, icon, title, content }) => {
  const classes = cx(
    {
      example: true,
    },
    className
  );

  return (
    <Card padding overflow className={classes}>
      {icon && (
        <div className={styles.iconWrapper}>
          <Icon size={"xs"} {...icon} />
        </div>
      )}
      {icon && title && <Divider height={10} />}
      {title && <Title tag={"h5"} {...title} />}
      {icon && content && <Divider height={10} />}
      {content && <Content {...content} />}
    </Card>
  );
};

Example.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  icon: PropTypes.shape(Icon.propTypes),
  content: PropTypes.shape(Content.propTypes),
};

Example.defaultProps = {
  className: "",
  title: null,
  icon: null,
  content: null,
};

export default Example;
