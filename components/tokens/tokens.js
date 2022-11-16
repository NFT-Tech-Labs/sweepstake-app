/* eslint-disable no-undef */
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

  const solanaCustomData = {
    content: {
      text: "token",
    },
    title: {
      text: "SOL",
    },
    required: process.env.NEXT_PUBLIC_SOL_AMOUNT,
    available: solanaData?.solana || 0,
  };

  const enoughTokens =
    data?.some((item) => item.available >= item.required) ||
    solanaData?.solana >= 0.25;

  return (
    <div className={classes}>
      {solanaData && <Token {...solanaCustomData} />}
      {data?.map((item, index) => {
        return (
          <>
            <Token {...item} />
            {data?.length - 1 === index && (
              <Content
                size={"s"}
                text={
                  enoughTokens
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
