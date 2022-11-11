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

const test = (data, names) => {
  let results = [];
  data.filter((item) => {
    if (names.includes(item.teamA) && names.includes(item.teamB)) {
      results.push(item);
    }
  });

  const x = names?.map((team) => {
    return {
      team: team,
      points: getTeamPoints(results, team),
      goalsDifference: getTeamGoalsDifference(results, team),
      goals: getTeamGoals(results, team),
    };
  });

  return x;
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

const getTeamPointsBetween = (data, teamA, teamB) => {
  let x = 0;
  data?.filter((item) => {
    if (
      (item.teamA === teamA || item.teamA === teamB) &&
      (item.teamB === teamA || item.teamB === teamB)
    ) {
      if (item.teamA === teamA) {
        x = Number(item.scoreA) - Number(item.scoreB);
      } else {
        x = Number(item.scoreB) - Number(item.scoreA);
      }
    }
  });
  return x;
};

const totalTiesForGroup = (data) => {
  // let totalTies = [];
  let total = 0;
  for (let i = 0; i < data?.teams?.length; i++) {
    for (let y = i + 1; y < data?.teams?.length; y++) {
      let teamA = data?.teams[i];
      let teamB = data?.teams[y];
      if (
        teamA.points === teamB.points &&
        teamA.goalsDifference === teamB.goalsDifference &&
        teamA.goals === teamB.goals
      ) {
        total++;
        // if (!totalTies.includes(teamA.name)) {
        //   totalTies.push(teamA.name);
        // }

        // if (!totalTies.includes(teamB.name)) {
        //   totalTies.push(teamB.name);
        // }
      }
    }
  }
  return total;
};

const getTiedGroupNames = (data) => {
  let totalTies = [];
  for (let i = 0; i < data?.teams?.length; i++) {
    for (let y = i + 1; y < data?.teams?.length; y++) {
      let teamA = data?.teams[i];
      let teamB = data?.teams[y];
      if (
        teamA.points === teamB.points &&
        teamA.goalsDifference === teamB.goalsDifference &&
        teamA.goals === teamB.goals
      ) {
        if (!totalTies.includes(teamA.name)) {
          totalTies.push(teamA.name);
        }

        if (!totalTies.includes(teamB.name)) {
          totalTies.push(teamB.name);
        }
      }
    }
  }
  return totalTies;
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
  getTeamPointsBetween,
  totalTiesForGroup,
  groupWinners,
  getWinners,
  getLosers,
  test,
  getTiedGroupNames,
};
