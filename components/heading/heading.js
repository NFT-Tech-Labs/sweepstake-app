import React from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./heading.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Divider } from "@components";

const cx = classNames.bind(styles);

const Heading = ({ className, title, content, download }) => {
  let classes = cx({ heading: true }, className);

  return (
    <div className={classes}>
      <div className={styles.content}>
        {title && <Title tag={"h3"} {...title} />}
        {title && content && <Divider height={10} />}
        {content && <Content size={"m"} {...content} />}
        {download && (
          <Link
            className={styles.button}
            href={"https://pdfhost.io/v/LvsHp69FY_infografa_dagoats"}
          >
            <a className={styles.button} target={"_blank"}>
              Download PDF
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  content: PropTypes.shape(Content.propTypes),
  download: PropTypes.bool,
};

Heading.defaultProps = {
  className: "",
  title: null,
  content: null,
  download: false,
};

export default Heading;
