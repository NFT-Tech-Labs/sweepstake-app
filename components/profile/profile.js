/* eslint-disable react/prop-types */
import React from "react";
import styles from "./profile.module.scss";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Card, Title, Icon, Divider, Content, Collection } from "@components";

const cx = classNames.bind(styles);

const Profile = ({ className, publicKey, tokens, nfts, disconnect }) => {
  const classes = cx(
    {
      profile: true,
      notConnected: !publicKey,
    },
    className
  );

  const NotConnected = () => (
    <Card overflow padding className={styles.notConnected}>
      <Icon name={"logo"} size={"m"} color={"dark"} />
      <Divider height={20} />
      <Title tag={"h6"} text={"Want to participate?"} />
      <Divider height={5} />
      <Content
        text={
          "Please connect and verify your wallet below in order to compete!"
        }
        size={"xs"}
      />
      <Divider height={20} />
      <WalletMultiButton />
      {/* <Button text={"Verify your wallet"} textColor={"light"} size={"xxs"} /> */}
    </Card>
  );

  const normalize = (val, max, min) => {
    return (val - min) / (max - min);
  };

  return publicKey ? (
    <div className={classes}>
      <WalletDisconnectButton onClick={disconnect} />
      <Divider height={20} />
      <div className={styles.intro}>
        <div className={styles.welcome}>
          <Title tag={"h3"} text={"Welcome  "} />
          <Title
            tag={"h3"}
            color={"energized"}
            text={publicKey}
            className={styles.publicKey}
          />
        </div>
        <Divider height={20} />
        <Content
          size={"s"}
          text={"Below you will find your available tokens and NFT collection"}
          color={"stable-500"}
        />
      </div>
      <Divider height={80} />
      <div className={styles.grid}>
        <div className={styles.tokens}>
          <Title tag={"h5"} text={"Tokens"} />
          <Divider height={30} />
          {tokens?.map((item, index) => {
            const normalizedPercentage =
              normalize(item?.available, item?.required, 0) * 100;
            return (
              <>
                <Card
                  key={index}
                  boxShadow
                  padding
                  borderRadius
                  className={styles.token}
                >
                  <div className={styles.details}>
                    {item?.content && (
                      <Content
                        size={"xs"}
                        color={"stable-500"}
                        {...item.content}
                      />
                    )}
                    {item?.title && <Title tag={"h6"} {...item.title} />}
                  </div>
                  <div className={styles.amount}>
                    <Content
                      size={"xs"}
                      color={"stable-500"}
                      text={`${item?.available}/${item?.required}`}
                    />
                    <div className={styles.progress}>
                      <div
                        className={styles.bar}
                        style={{
                          width: `${normalizedPercentage}%`,
                          backgroundColor:
                            item?.available === item?.required
                              ? "rgba(var(--color-balanced), 1)"
                              : "rgba(var(--color-energized), 1)",
                        }}
                      ></div>
                    </div>
                  </div>
                </Card>
                {tokens?.length - 1 === index && (
                  <Content
                    size={"s"}
                    text={
                      normalizedPercentage === 100
                        ? "You have enough tokens to participate!"
                        : "You need to have enough tokens of atleast one shown above"
                    }
                    color={"stable-500"}
                  />
                )}
              </>
            );
          })}
        </div>
        <div className={styles.collection}>
          <Title tag={"h5"} text={"Collection"} />
          <Divider height={30} />
          <Collection nfts={nfts} />
        </div>
      </div>
    </div>
  ) : (
    <NotConnected />
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  publicKey: PropTypes.string,
};

Profile.defaultProps = {
  className: "",
  publicKey: "",
};

export default Profile;
