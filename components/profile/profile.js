import React from "react";
import styles from "./profile.module.scss";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Card, Title, Icon, Divider, Content, Collection } from "@components";

const cx = classNames.bind(styles);

const Profile = ({ className, publicKey, tokens, nfts }) => {
  const classes = cx(
    {
      profile: true,
      notConnected: !publicKey,
    },
    className
  );

  const NotConnected = () => (
    <Card padding className={styles.notConnected}>
      <Icon name={"ball"} color={"dark"} />
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

  return publicKey ? (
    <div className={classes}>
      {/* <WalletMultiButton /> */}
      <div className={styles.intro}>
        <div className={styles.welcome}>
          <Title tag={"h5"} text={"Welcome  "} />
          <Title
            tag={"h5"}
            color={"energized"}
            text={publicKey}
            className={styles.publicKey}
          />
        </div>
        <Divider height={20} />
        <Content
          size={"s"}
          text={"In order to participate you will need tokens"}
          color={"stable-500"}
        />
      </div>
      <Divider height={80} />
      <div className={styles.grid}>
        <div className={styles.tokens}>
          <Title tag={"h5"} text={"Tokens"} />
          <Divider height={30} />
          {tokens?.map((item, index) => (
            <Card
              key={index}
              boxShadow
              padding
              borderRadius
              className={styles.token}
            >
              <div className={styles.details}>
                {item?.content && (
                  <Content size={"xs"} color={"stable-500"} {...item.content} />
                )}
                {item?.title && <Title tag={"h6"} {...item.title} />}
              </div>
              <div className={styles.amount}>
                <Content size={"xs"} color={"stable-500"} text={"70/100"} />
                <div className={styles.progress}>
                  <div
                    className={styles.bar}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
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
