import React from "react";
import classNames from "classnames/bind";
import styles from "./rank.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Card, Button } from "@components";
import useClipboard from "react-use-clipboard";

const cx = classNames.bind(styles);

const Rank = ({
  className,
  position,
  address,
  label,
  points,
  winner,
  session,
}) => {
  const [copied, setCopied] = useClipboard(address, {
    successDuration: 1000,
  });
  let classes = cx(
    { rank: true, active: session?.user?.user?.address === address },
    className
  );
  let classesWinner = cx(
    {
      winner: true,
      first: position === "1",
      second: position === "2",
      third: position === "3",
      active: session?.user?.user?.address === address,
    },
    className
  );

  const Winner = () => (
    <div className={classesWinner}>
      <div className={styles.winnerPosition}>
        {position !== "1" && (
          <Title text={position} tag={"h2"} color={"light"} />
        )}
      </div>

      {points && (
        <Title
          tag={"h6"}
          text={points}
          color={"energized"}
          className={styles.winnerPoints}
        />
      )}
      {label && (
        <Content text={label} size={"xxs"} color={"stable-500"} emphasize />
      )}
      {address && (
        <div className={styles.winnerAddressWrapper}>
          <Title
            text={address}
            tag={"h5"}
            className={styles.winnerAddress}
            emphasize
          />
          <Button
            icon={{ name: "clipboard", color: "dark", size: "xxs" }}
            color={"transparent"}
            size={"xs"}
            onClick={() => setCopied(true)}
          />
          {copied && (
            <Content
              className={styles.clipboardWinner}
              text={"Copied!"}
              size={"xs"}
            />
          )}
        </div>
      )}
    </div>
  );

  if (winner) {
    return <Winner />;
  }

  return (
    <Card borderRadius className={classes}>
      <div className={styles.wrapper}>
        {position && <Title tag={"h5"} text={position} />}
        <div className={styles.addressWrapper}>
          <div>
            {label && (
              <Content
                text={label}
                size={"xxs"}
                color={"stable-500"}
                emphasize
              />
            )}
            {address && (
              <Content
                text={address}
                size={"xs"}
                className={styles.address}
                emphasize
              />
            )}
          </div>
          <Button
            className={styles.clipboard}
            icon={{ name: "clipboard", color: "dark", size: "xxxs" }}
            color={"transparent"}
            size={"xxs"}
            onClick={() => setCopied(true)}
          />
          {copied && (
            <Content
              className={styles.clipboard}
              text={"Copied!"}
              size={"xs"}
            />
          )}
        </div>
      </div>
      {points && <Title tag={"h5"} text={points} color={"energized"} />}
    </Card>
  );
};

Rank.propTypes = {
  className: PropTypes.string,
  position: PropTypes.string,
  address: PropTypes.string,
  label: PropTypes.string,
  points: PropTypes.string,
  winner: PropTypes.bool,
  session: PropTypes.bool,
};

Rank.defaultProps = {
  className: "",
  position: "",
  address: "",
  label: "",
  points: "",
  winner: false,
  session: false,
};

export default Rank;
