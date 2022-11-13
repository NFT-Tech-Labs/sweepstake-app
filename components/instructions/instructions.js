import React from "react";
import classNames from "classnames/bind";
import styles from "./instructions.module.scss";
import PropTypes from "prop-types";
import { Title, Content } from "@components";

const cx = classNames.bind(styles);

const Instructions = ({ className, items }) => {
  let classes = cx(
    {
      instructions: true,
    },
    className
  );

  return (
    <div className={classes}>
      <ul className={styles.items}>
        {items?.map((item, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.index}>
              <Title text={index + 1} tag={"h6"} />
            </div>
            <div>
              {item?.title && (
                <Title tag={"h6"} className={styles.title} {...item.title} />
              )}
              {item?.content && <Content size={"s "} {...item.content} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Instructions.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
};

Instructions.defaultProps = {
  className: "",
  items: null,
};

export default Instructions;
