import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./cta.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Divider, Card, Button } from "@components";

const cx = classNames.bind(styles);

const Cta = ({ className, title, content, button, image }) => {
  let classes = cx({ cta: true }, className);

  return (
    <Card boxShadow borderRadius overflow padding className={classes}>
      {(title || content || button) && (
        <div className={styles.content}>
          {title && <Title color={"light"} tag={"h4"} {...title} />}
          {title && content && <Divider height={10} />}
          {content && <Content color={"light"} size={"m"} {...content} />}
          {content && button && <Divider height={40} />}
          {button && <Button size={"xxs"} {...button} />}
        </div>
      )}
      {image && (
        <div className={styles.image}>
          <Image
            objectFit={"contain"}
            layout={"fill"}
            src={image}
            alt={"maradona"}
            priority
          />
        </div>
      )}
    </Card>
  );
};

Cta.propTypes = {
  className: PropTypes.string,
  title: PropTypes.shape(Title.propTypes),
  content: PropTypes.shape(Content.propTypes),
  // button: PropTypes.shape(Button.propTypes),
  image: PropTypes.string,
};

Cta.defaultProps = {
  className: "",
  title: null,
  content: null,
  // button: null,
  image: "",
};

export default Cta;
