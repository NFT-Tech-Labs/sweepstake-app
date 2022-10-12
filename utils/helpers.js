const getTeamPoints = (data, team) => {
  let total = 0;
  data?.map((item) => {
    const chosenTeamValue =
      (item.teamA === team && item.valueA) ||
      (item.teamB === team && item.valueB);

    const againstTeamValue =
      (item.teamA === team) === true ? item.valueB : item.valueA;

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
    return item.valueA > item.valueB ? item.teamA : item.teamB;
  });

  return winners;
};

const getLosers = (data) => {
  const losers = data?.map((item) => {
    return item.valueA < item.valueB ? item.teamA : item.teamB;
  });

  return losers;
};

export { getTeamPoints, groupWinners, getWinners, getLosers };
