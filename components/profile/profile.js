/* eslint-disable react/prop-types */
import React from "react";
import styles from "./profile.module.scss";
import {
  WalletMultiButton,
  WalletDisconnectButton,
  WalletConnectButton,
} from "@solana/wallet-adapter-react-ui";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {
  Card,
  Title,
  Icon,
  Divider,
  Content,
  Collection,
  Tokens,
} from "@components";

const cx = classNames.bind(styles);

const Profile = ({
  className,
  publicKey,
  session,
  tokens,
  solana,
  nfts,
  disconnect,
}) => {
  const classes = cx(
    {
      profile: true,
      notConnected: !session,
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

  return session ? (
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
        <div className={styles.balance}>
          <Title tag={"h5"} text={"Tokens"} />
          <Divider height={30} />
          <Tokens data={tokens} solanaData={solana} />
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
