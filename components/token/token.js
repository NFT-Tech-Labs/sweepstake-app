import React from "react";
import classNames from "classnames/bind";
import styles from "./token.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Card } from "@components";

const cx = classNames.bind(styles);

const Token = ({
  className,
  title,
  content,
  available,
  required,
  normalizeValue,
}) => {
  let classes = cx(
    {
      token: true,
    },
    className
  );

  return (
    <Card boxShadow padding borderRadius className={classes}>
      <div className={styles.details}>
        {content && <Content size={"xs"} color={"stable-500"} {...content} />}
        {title && <Title tag={"h6"} {...title} />}
      </div>
      <div className={styles.amount}>
        <Content
          size={"xs"}
          color={"stable-500"}
          text={`${available}/${required}`}
        />
        <div className={styles.progress}>
          <div
            className={styles.bar}
            style={{
              width: `${normalizeValue}%`,
              backgroundColor:
                available === required
                  ? "rgba(var(--color-balanced), 1)"
                  : "rgba(var(--color-energized), 1)",
            }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

Token.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  content: PropTypes.shape(Content.propTypes),
  available: PropTypes.number,
  required: PropTypes.number,
  normalizeValue: PropTypes.number,
};

Token.defaultProps = {
  className: "",
  tokens: null,
  title: null,
  content: null,
  available: null,
  required: null,
  normalizeValue: null,
};

export default Token;
