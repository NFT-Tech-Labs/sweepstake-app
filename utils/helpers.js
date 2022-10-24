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

const groupWinners = (data, group) => {
  return data?.filter((item) => item?.group === group);
};

const getWinners = (data) => {
  const winners = data?.map((item) => {
    return item.scoreA > item.scoreB ? item.teamA : item.teamB;
  });

  return winners;
};

const getLosers = (data) => {
  const losers = data?.map((item) => {
    return item.scoreA < item.scoreB ? item.teamA : item.teamB;
  });

  return losers;
};

export { getTeamPoints, groupWinners, getWinners, getLosers };
