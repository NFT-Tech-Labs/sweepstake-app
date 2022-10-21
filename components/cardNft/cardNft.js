/* eslint-disable react/prop-types */
import React from "react";
import Image from "next/image";
import styles from "./cardNft.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Card, Title, Icon, Divider, Button, Content } from "@components";
import ReactCountryFlag from "react-country-flag";

const cx = classNames.bind(styles);

const CardNft = ({
  className,
  attributes,
  image,
  name,
  symbol,
  country,
  empty,
}) => {
  const classes = cx(
    {
      cardNft: true,
      empty,
    },
    className
  );

  const EmptyCard = () => (
    <Card overflow className={classes}>
      <Icon name={"logo"} color={"dark"} />
      <Divider height={20} />
      <Title tag={"h6"} text={"Don't have DaGoats NFTs?"} />
      <Divider height={5} />
      <Content
        text={
          "Make sure to get them, since they can increase your sweepstake points"
        }
        size={"xs"}
      />
      <Divider height={20} />
      <Button text={"Buy"} textColor={"light"} size={"xxs"} />
    </Card>
  );

  return empty ? (
    <EmptyCard />
  ) : (
    <Card className={classes}>
      {/* <div className={styles.heading}>
        {attributes?.map(
          (item) =>
            item.trait_type === "type" && (
              <Content
                className={styles.type}
                size={"s"}
                text={item.value}
                emphasize
              />
            )
        )}
      </div> */}
      {image && (
        <div className={styles.image}>
          <Image objectFit={"cover"} layout={"fill"} src={image} alt={name} />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.country}>
          <ReactCountryFlag
            countryCode={country}
            svg
            style={{
              width: "auto",
              height: "30px",
            }}
            title={"nl"}
          />
        </div>
        <div className={styles.details}>
          {name && (
            <Content
              className={styles.name}
              size={"xs"}
              text={name}
              emphasize
            />
          )}
          {symbol && (
            <Content className={styles.symbol} size={"xxs"} text={symbol} />
          )}
        </div>
      </div>
    </Card>
  );
};

CardNft.propTypes = {
  className: PropTypes.string,
};

CardNft.defaultProps = {
  className: "",
};

export default CardNft;
