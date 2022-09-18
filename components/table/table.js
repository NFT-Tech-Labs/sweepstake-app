import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./table.module.scss";
import PropTypes from "prop-types";
import { Content, Row, Button } from "@components";

const cx = classNames.bind(styles);

const Table = ({ className, matches, count, onChange }) => {
  const [data, setData] = useState(matches);

  let classes = cx(
    {
      table: true,
    },
    className
  );

  const onInputChangeA = useCallback(
    (e) => {
      const newVal = e?.target?.value;
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.id === Number(id) ? { ...item, valueA: Number(newVal) } : item
        )
      );
    },
    [setData]
  );

  const onInputChangeB = useCallback(
    (e) => {
      const newVal = e?.target?.value;
      const id = e?.target?.id;
      setData((prev) =>
        prev?.map((item) =>
          item.id === Number(id) ? { ...item, valueB: Number(newVal) } : item
        )
      );
    },
    [setData]
  );

  if (onChange) {
    onChange(data);
  }

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
        {data?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item?.type === count && (
                <Row
                  onChangeA={onInputChangeA}
                  onChangeB={onInputChangeB}
                  {...item}
                />
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  matches: PropTypes.array,
  count: PropTypes.number,
};

Table.defaultProps = {
  className: "",
  matches: null,
  count: 0,
};

export default Table;
