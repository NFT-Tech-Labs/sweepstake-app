import React from "react";
import styles from "./cardRules.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Card, Title, Icon, Divider, Content } from "@components";

const cx = classNames.bind(styles);

const CardRules = ({ className, icon, title, rules }) => {
  const classes = cx(
    {
      cardRules: true,
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
      {title && <Title tag={"h5"} {...title} />}
      {title && rules && <Divider height={20} />}
      {rules?.map((item, index) => (
        <div key={index} className={styles.rule}>
          {(item?.icon || item?.content) && (
            <div className={styles.info}>
              <Icon color={"dark"} size={"xs"} {...item.icon} />
              <Content color={"dark"} {...item.content} />
            </div>
          )}
          {item?.subtext && (
            <Content
              className={styles.subtext}
              color={"balanced"}
              size={"s"}
              {...item.subtext}
            />
          )}
        </div>
      ))}
    </Card>
  );
};

CardRules.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  icon: PropTypes.shape(Icon.propTypes),
  rules: PropTypes.array,
};

CardRules.defaultProps = {
  className: "",
  title: null,
  icon: null,
  rules: null,
};

export default CardRules;
