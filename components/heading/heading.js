import React from "react";
import classNames from "classnames/bind";
import styles from "./heading.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Divider } from "@components";

const cx = classNames.bind(styles);

const Heading = ({ className, title, content }) => {
  let classes = cx({ heading: true }, className);

  return (
    <div className={classes}>
      <div className={styles.content}>
        {title && <Title tag={"h3"} {...title} />}
        {title && content && <Divider height={10} />}
        {content && <Content size={"m"} {...content} />}
      </div>
    </div>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  content: PropTypes.shape(Content.propTypes),
};

Heading.defaultProps = {
  className: "",
  title: null,
  content: null,
};

export default Heading;
