const getTeamPoints = (data, team) => {
  let total = 0;
  data?.map((item) => {
    const chosenTeamValue =
      (item.teamA === team && item.scoreA) ||
      (item.teamB === team && item.scoreB);

    const againstTeamValue =
      (item.teamA === team) === true ? item.scoreB : item.scoreA;

    chosenTeamValue > againstTeamValue
      ? (total += 3)
      : chosenTeamValue === againstTeamValue
      ? (total += 1)
      : (total += 0);
  });

  return total;
};

const getTeamGoals = (data, team) => {
  let goals = 0;

  data?.map((item) => {
    if (item.teamA === team) {
      return (goals += Number(item.scoreA));
    }

    if (item.teamB === team) {
      return (goals += Number(item.scoreB));
    }
  });

  return goals;
};

const getTeamGoalsDifference = (data, team) => {
  let difference = 0;

  data?.map((item) => {
    if (item.teamA === team) {
      return (difference += Number(item.scoreA) - Number(item.scoreB));
    }

    if (item.teamB === team) {
      return (difference += Number(item.scoreB) - Number(item.scoreA));
    }
  });

  return difference;
};

const getGreaterTeamPoints = (teamA, teamB) => {
  if (getTeamGoals(teamA) > getTeamGoals(teamB)) {
    return teamA;
  } else {
    return teamB;
  }
};

const getGreaterTeamGoals = (teamA, teamB) => {
  if (getTeamGoalsDifference(teamA) > getTeamGoalsDifference(teamB)) {
    return teamA;
  } else {
    return teamB;
  }
};

const getGreaterTeamGoalsDifference = (teamA, teamB) => {
  if (getTeamGoalsDifference(teamA) > getTeamGoalsDifference(teamB)) {
    return teamA;
  } else {
    return teamB;
  }
};

const groupWinners = (data, group) => {
  return data?.filter((item) => item?.group === group);
};

const getWinners = (data) => {
  const winners = data?.map((item) => {
    if (item.extensionWinner && item.scoreA === item.scoreB) {
      return item?.extensionWinner;
    } else {
      return item.scoreA > item.scoreB ? item.teamA : item.teamB;
    }
  });

  return winners;
};

const getLosers = (data) => {
  const losers = data?.map((item) => {
    if (item.extensionWinner && item.scoreA === item.scoreB) {
      return item.extensionWinner === item.teamA ? item.teamB : item.teamA;
    } else {
      return item.scoreA < item.scoreB ? item.teamA : item.teamB;
    }
  });

  return losers;
};

export {
  getTeamPoints,
  getTeamGoals,
  getTeamGoalsDifference,
  groupWinners,
  getWinners,
  getLosers,
};
