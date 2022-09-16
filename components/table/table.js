import React from "react";
import classNames from "classnames/bind";
import styles from "./table.module.scss";
import PropTypes from "prop-types";
import { Content, Row, Button } from "@components";

const cx = classNames.bind(styles);

const Table = ({ className, matches }) => {
  let classes = cx(
    {
      table: true,
    },
    className
  );

  return (
    <table className={classes}>
      <thead className={styles.head}>
        <tr>
          <th>
            <Content text={"Date"} color={"stable-500"} size={"s"} />
          </th>
          <th>
            <Content text={"Match"} color={"stable-500"} size={"s"} />
          </th>
          <th>
            <Content text={"Group"} color={"stable-500"} size={"s"} />
          </th>
          <th>
            <Content text={"Points"} color={"stable-500"} size={"s"} />
          </th>
        </tr>
      </thead>
      <tbody>
        {matches?.map((item, index) => {
          return (
            <Row
              key={index}
              date={"10 nov"}
              time={"10:00"}
              match={"NL-US"}
              group={"A"}
              points={"0"}
              {...item}
            />
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  matches: PropTypes.array,
};

Table.defaultProps = {
  className: "",
  matches: null,
};

export default Table;
