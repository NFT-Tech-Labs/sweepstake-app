import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./collection.module.scss";
import PropTypes from "prop-types";
import { Card, Title, Content } from "@components";

const cx = classNames.bind(styles);

const Collection = ({ className, nfts }) => {
  let classes = cx({ collection: true }, className);

  return (
    <div className={classes}>
      {nfts?.slice(0, 4).map((item, index) => (
        <Card key={index} boxShadow className={styles.card}>
          <div className={styles.content}>
            {item?.name && (
              <Title tag={"h6"} color={"light"} text={item.name} />
            )}
            {item?.symbol && (
              <Content size={"xs"} color={"light"} text={item.symbol} />
            )}
          </div>
          {item?.image && (
            <div className={styles.image}>
              <Image
                objectFit={"cover"}
                layout={"fill"}
                src={item.image}
                alt={item.name}
              />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

Collection.propTypes = {
  className: PropTypes.string,
  nfts: PropTypes.array,
};

Collection.defaultProps = {
  className: "",
  nfts: null,
};

export default Collection;
