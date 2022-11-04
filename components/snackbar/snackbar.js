import React from "react";
import classNames from "classnames/bind";
import styles from "./snackbar.module.scss";
import PropTypes from "prop-types";
import { Card, Title, Content, Icon } from "@components";

const cx = classNames.bind(styles);

const Snackbar = ({ className, title, content, icon }) => {
  let classes = cx(
    {
      snackbar: true,
    },
    className
  );

  return (
    <Card padding borderRadius box className={classes}>
      <div className={styles.icon}>
        <Icon name={"info"} size={"xxs"} color={"energized"} {...icon} />
      </div>
      {title && (
        <Title
          tag={"h6"}
          color={"energized"}
          className={styles.title}
          {...title}
        />
      )}
      {content && <Content color={"dark"} size={"s"} {...content} />}
    </Card>
  );
};

Snackbar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  content: PropTypes.shape(Content.propTypes),
  icon: PropTypes.shape(Icon.propTypes),
};

Snackbar.defaultProps = {
  className: "",
  title: null,
  content: null,
  icon: null,
};

export default Snackbar;
