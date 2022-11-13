import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./groups.module.scss";
import PropTypes from "prop-types";
import { Group, Content, TeamSelect } from "@components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { groupsScheme } from "../../utils/data";
import {
  getTeamPoints,
  getTeamGoals,
  getTeamGoalsDifference,
  getGreaterTeamPoints,
  getGreaterTeamGoalsDifference,
  getGreaterTeamGoals,
  totalTiesForGroup,
  getTeamPointsBetween,
  test,
  getTiedGroupNames,
} from "../../utils/helpers";
import "react-tabs/style/react-tabs.css";

const cx = classNames.bind(styles);

const Groups = ({ className, data, onSelect, onChange, count }) => {
  const [indicator, setIndicator] = useState(true);
  let classes = cx({ groups: true, indicator }, className);

  const groupStage = groupsScheme?.map((item) => {
    return {
      group: item.group,
      teams: item.teams.map((item) => ({
        name: item,
        points: getTeamPoints(data.slice(0, 48), item),
        goalsDifference: getTeamGoalsDifference(data.slice(0, 48), item),
        goals: getTeamGoals(data.slice(0, 48), item),
      })),
    };
  });

  // sort group by points
  groupStage?.map((item) => {
    let threeWayTieResult;
    let totalTies = totalTiesForGroup(item);
    if (totalTies > 2) {
      let names = getTiedGroupNames(item);
      threeWayTieResult = test(data?.slice(0, 48), names);

      item.teams.sort(
        (a, b) =>
          b.points - a.points ||
          b.goalsDifference - a.goalsDifference ||
          b.goals - a.goals ||
          threeWayTieResult?.find((team) => team.team === b.name).points -
            threeWayTieResult?.find((team) => team.team === a.name).points ||
          threeWayTieResult?.find((team) => team.team === b.name)
            .goalsDifference -
            threeWayTieResult?.find((team) => team.team === a.name)
              .goalsDifference ||
          threeWayTieResult?.find((team) => team.team === b.name).goals -
            threeWayTieResult?.find((team) => team.team === a.name).goals ||
          getTeamPointsBetween(data.slice(0, 48), b.name, a.name)
      );
    } else {
      item.teams.sort(
        (a, b) =>
          b.points - a.points ||
          b.goalsDifference - a.goalsDifference ||
          b.goals - a.goals ||
          getTeamPointsBetween(data.slice(0, 48), b.name, a.name)
      );
    }

    console.log(threeWayTieResult);
  });

  // const groupStageUpdated = groupStage?.map((item) => ({
  //   ...item,
  //   teams: item?.teams.map((team) => ({
  //     ...team,
  //     // pointsGreater: getGreaterTeamPoints(
  //     //   data.slice(0, 48),
  //     //   item.teams[0]?.name,
  //     //   item.teams[1]?.name
  //     // )[team.name],
  //     // goalsDifferenceGreater: getGreaterTeamGoalsDifference(
  //     //   data.slice(0, 48),
  //     //   item.teams[0]?.name,
  //     //   item.teams[1]?.name
  //     // )[team.name],
  //     // goalsGreater: getGreaterTeamGoals(
  //     //   data.slice(0, 48),
  //     //   item.teams[0]?.name,
  //     //   item.teams[1]?.name
  //     // )[team.name],
  //   })),
  // }));

  // groupStageUpdated?.map((item) =>
  //   item.teams.sort(
  //     (a, b) =>
  //       b.points - a.points ||
  //       b.goalsDifference - a.goalsDifference ||
  //       b.goals - a.goals
  //     // b.pointsGreater - a.pointsGreater ||
  //     // b.goalsDifferenceGreater - a.goalsDifferenceGreater ||
  //     // b.goalsGreater - a.goalsGreater
  //   )
  // );

  useEffect(() => {
    if (onChange) {
      onChange(groupStage);
    }
  }, [data]);

  return (
    <div className={classes} onMouseOver={() => setIndicator(false)}>
      <Tabs className={styles.tabs} onSelect={onSelect} selectedIndex={count}>
        <TabList className={styles.tablist}>
          {groupStage?.map((item, index) => {
            return (
              item?.group && (
                <Tab key={index} tabIndex={"tabindex"}>
                  <Content text={item.group} size={"m"} />
                </Tab>
              )
            );
          })}
        </TabList>
        {groupStage?.map((item, index) => (
          <TabPanel key={index}>
            <>{item?.teams && <Group key={index} teams={item.teams} />}</>
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
