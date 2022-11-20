import React from "react";
import classNames from "classnames/bind";
import styles from "./rank.module.scss";
import PropTypes from "prop-types";
import { Title, Content, Card } from "@components";

const cx = classNames.bind(styles);

const Rank = ({ className, position, address, label, points, winner }) => {
  let classes = cx({ rank: true }, className);
  let classesWinner = cx(
    {
      winner: true,
      first: position === "1",
      second: position === "2",
      third: position === "3",
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
        <Title
          text={address}
          tag={"h5"}
          className={styles.addressWinner}
          emphasize
        />
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
          {label && (
            <Content text={label} size={"xxs"} color={"stable-500"} emphasize />
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
};

Rank.defaultProps = {
  className: "",
  position: "",
  address: "",
  label: "",
  points: "",
  winner: false,
};

export default Rank;
