import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./groups.module.scss";
import PropTypes from "prop-types";
import { Group, Content, TeamSelect } from "@components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { groupsScheme } from "../../utils/data";
import { getTeamPoints } from "../../utils/helpers";
import "react-tabs/style/react-tabs.css";

const cx = classNames.bind(styles);

const Groups = ({ className, data, onSelect, onChange, count }) => {
  let classes = cx({ groups: true }, className);

  const groupStage = groupsScheme?.map((item) => {
    return {
      group: item.group,
      teams: item.teams.map((item) => ({
        name: item,
        points: getTeamPoints(data.slice(0, 48), item),
      })),
    };
  });

  // sort group by points
  groupStage?.map((item) => item.teams.sort((a, b) => b.points - a.points));

  useEffect(() => {
    if (onChange) {
      onChange(groupStage);
    }
  }, [data]);

  return (
    <div className={classes}>
      <Tabs className={styles.tabs} onSelect={onSelect} selectedIndex={count}>
        <TabList className={styles.tablist}>
          {groupStage?.slice(0, 48)?.map((item, index) => {
            return (
              item?.group && (
                <Tab key={index} tabIndex={"tabindex"}>
                  <Content text={item.group} size={"m"} />
                </Tab>
              )
            );
          })}
        </TabList>
        {groupStage?.slice(0, 48).map((item, index) => (
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
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  count: PropTypes.number,
};

Groups.defaultProps = {
  className: "",
  data: null,
  onSelect: null,
  onChange: null,
  count: null,
};

export default Groups;
