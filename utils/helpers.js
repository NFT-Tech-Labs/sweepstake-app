const getTeamPoints = (data, team) => {
  let total = 0;
  data?.map((item) => {
    const chosenTeamValue =
      (item.teamA === team && Number(item.scoreA)) ||
      (item.teamB === team && Number(item.scoreB));

    const againstTeamValue =
      (item.teamA === team) === true
        ? Number(item.scoreB)
        : Number(item.scoreA);

    chosenTeamValue > againstTeamValue
      ? (total += 3)
      : chosenTeamValue === againstTeamValue
      ? (total += 1)
      : (total += 0);
  });

  return total;
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

const getGreaterTeamPoints = (data, teamA, teamB) => {
  let tiedMatch;
  tiedMatch = data?.filter((item) => {
    if (
      (item.teamA === teamA && item.teamB === teamB) ||
      (item.teamA === teamB && item.teamB === teamA)
    ) {
      return item;
    }
  });

  const totalPointsA = getTeamPoints(data, tiedMatch[0]?.teamA);
  const totalPointsB = getTeamPoints(data, tiedMatch[0]?.teamB);

  const tiedMatchPointsA = getTeamPoints(tiedMatch, tiedMatch[0]?.teamA);
  const tiedMatchPointsB = getTeamPoints(tiedMatch, tiedMatch[0]?.teamB);

  return {
    [tiedMatch[0]?.teamA]: Number(totalPointsA) - Number(tiedMatchPointsA),
    [tiedMatch[0]?.teamB]: Number(totalPointsB) - Number(tiedMatchPointsB),
  };
};

const getGreaterTeamGoalsDifference = (data, teamA, teamB) => {
  let tiedMatch;
  tiedMatch = data?.filter((item) => {
    if (
      (item.teamA === teamA && item.teamB === teamB) ||
      (item.teamA === teamB && item.teamB === teamA)
    ) {
      return item;
    }
  });

  const totalPointsA = getTeamGoalsDifference(data, tiedMatch[0]?.teamA);
  const totalPointsB = getTeamGoalsDifference(data, tiedMatch[0]?.teamB);

  const tiedMatchPointsA = getTeamGoalsDifference(
    tiedMatch,
    tiedMatch[0]?.teamA
  );
  const tiedMatchPointsB = getTeamGoalsDifference(
    tiedMatch,
    tiedMatch[0]?.teamB
  );

  return {
    [tiedMatch[0]?.teamA]: Number(totalPointsA) - Number(tiedMatchPointsA),
    [tiedMatch[0]?.teamB]: Number(totalPointsB) - Number(tiedMatchPointsB),
  };
};

const getGreaterTeamGoals = (data, teamA, teamB) => {
  let tiedMatch;
  tiedMatch = data?.filter((item) => {
    if (
      (item.teamA === teamA && item.teamB === teamB) ||
      (item.teamA === teamB && item.teamB === teamA)
    ) {
      return item;
    }
  });

  const totalPointsA = getTeamGoals(data, tiedMatch[0]?.teamA);
  const totalPointsB = getTeamGoals(data, tiedMatch[0]?.teamB);

  const tiedMatchPointsA = getTeamGoals(tiedMatch, tiedMatch[0]?.teamA);
  const tiedMatchPointsB = getTeamGoals(tiedMatch, tiedMatch[0]?.teamB);

  return {
    [tiedMatch[0]?.teamA]: Number(totalPointsA) - Number(tiedMatchPointsA),
    [tiedMatch[0]?.teamB]: Number(totalPointsB) - Number(tiedMatchPointsB),
  };
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
  getTeamGoalsDifference,
  getTeamGoals,
  getGreaterTeamPoints,
  getGreaterTeamGoalsDifference,
  getGreaterTeamGoals,
  groupWinners,
  getWinners,
  getLosers,
};
