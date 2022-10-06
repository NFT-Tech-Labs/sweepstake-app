import React from "react";
import classNames from "classnames/bind";
import styles from "./groups.module.scss";
import PropTypes from "prop-types";
import { Group } from "@components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const cx = classNames.bind(styles);

const Groups = ({ className, data }) => {
  let classes = cx({ groups: true }, className);

  return (
    <div className={classes}>
      <Tabs>
        <TabList>
          {data?.map(
            (item, index) => item?.group && <Tab key={index}>{item.group}</Tab>
          )}
        </TabList>

        {data?.map((item, index) => (
          <TabPanel key={index}>
            {item?.teams && <Group key={index} teams={item.teams} />}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

Groups.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
};

Groups.defaultProps = {
  className: "",
  data: null,
};

export default Groups;
