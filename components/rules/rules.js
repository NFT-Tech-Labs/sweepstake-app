import React from "react";
import styles from "./rules.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Card, Title, Icon, Divider, Content } from "@components";

const cx = classNames.bind(styles);

const Rules = ({ className, icon, title, rules }) => {
  const classes = cx(
    {
      rules: true,
    },
    className
  );

  return (
    <Card padding className={classes}>
      {icon && (
        <div className={styles.iconWrapper}>
          <Icon name={"info"} size={"xs"} {...icon} />
        </div>
      )}
      {icon && title && <Divider height={10} />}
      {title && <Title tag={"h6"} {...title} />}
      {title && rules && <Divider height={20} />}
      {rules?.map((item, index) => (
        <div key={index} className={styles.rule}>
          {(item?.icon || item?.content) && (
            <div className={styles.info}>
              <Icon color={"dark"} size={"xs"} {...item.icon} />
              <Content color={"dark"} size={"xs"} {...item.content} />
            </div>
          )}
          {item?.subtext && (
            <Content
              className={styles.subtext}
              color={"balanced"}
              size={"xs"}
              {...item.subtext}
            />
          )}
        </div>
      ))}
    </Card>
  );
};

Rules.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  icon: PropTypes.shape(Icon.propTypes),
  rules: PropTypes.array,
};

Rules.defaultProps = {
  className: "",
  title: null,
  icon: null,
  rules: null,
};

export default Rules;
