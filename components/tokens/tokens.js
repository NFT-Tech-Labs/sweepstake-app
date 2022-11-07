import React from "react";
import classNames from "classnames/bind";
import styles from "./tokens.module.scss";
import PropTypes from "prop-types";
import { Token, Content } from "@components";

const cx = classNames.bind(styles);

const Tokens = ({ className, data, solanaData }) => {
  let classes = cx(
    {
      tokens: true,
    },
    className
  );

  const normalize = (val, max, min) => {
    return (val - min) / (max - min);
  };

  const solanaCustomData = {
    content: {
      text: "Token",
    },
    title: {
      text: "SOL",
    },
    required: 0.25,
    available: solanaData?.solana || 0,
    normalizeValue: normalize(solanaData?.solana, 0.25, 0) * 100 || 0,
  };

  return (
    <div className={classes}>
      {solanaData && <Token {...solanaCustomData} />}
      {data?.map((item, index) => {
        const normalizeValue =
          normalize(item?.available, item?.required, 0) * 100;

        console.log(normalizeValue);
        return (
          <>
            <Token normalizeValue={normalizeValue} {...item} />
            {data?.length - 1 === index && (
              <Content
                size={"s"}
                text={
                  normalizeValue === 100
                    ? "You are able to participate!"
                    : "You need to have enough tokens of atleast one shown above"
                }
                color={"stable-500"}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

Tokens.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  solanaData: PropTypes.object,
};

Tokens.defaultProps = {
  className: "",
  data: null,
  solanaData: null,
};

export default Tokens;
