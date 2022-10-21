import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./collection.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Divider, Button, Icon, CardNft } from "@components";

const cx = classNames.bind(styles);

const Collection = ({ className, nfts }) => {
  let classes = cx({ collection: true }, className);

  const mockData = [
    {
      name: "DaGoats",
      symbol: "DGOAT",
      image: "/traitsdagoats2.jpg",
      country: "NL",
      attributes: [
        {
          trait_type: "lol",
          value: "lol",
        },
      ],
    },
    {
      name: "DaGoats",
      symbol: "DGOAT",
      image: "/traitsdagoats7.jpg",
      country: "ES",
      attributes: [
        {
          trait_type: "lol",
          value: "lol",
        },
      ],
    },
  ];

  return (
    <div className={classes}>
      <div className={styles.wrapper}>
        {/* {nfts?.slice(0, 4).map((item, index) => (
            <CardNft key={index} {...item} />
          ))} */}
        {mockData?.slice(0, 4).map((item, index) => (
          <CardNft className={styles.card} key={index} {...item} />
        ))}
        {/* {(nfts === null || nfts?.length === 0) && <CardNft empty />} */}
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
