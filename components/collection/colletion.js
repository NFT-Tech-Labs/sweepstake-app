import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./collection.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Divider, Button, Icon, CardNft } from "@components";

const cx = classNames.bind(styles);

const Collection = ({ className, nfts }) => {
  let classes = cx({ collection: true }, className);

  return (
    <div className={classes}>
      <div className={styles.wrapper}>
        {/* <Title text={"Your collection"} tag={"h3"} color={"dark"} /> */}
        <div className={styles.cards}>
          {nfts?.slice(0, 4).map((item, index) => (
            <CardNft key={index} {...item} />
          ))}
          {(nfts === null || nfts?.length === 0) && <CardNft empty />}
        </div>
      </div>
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
