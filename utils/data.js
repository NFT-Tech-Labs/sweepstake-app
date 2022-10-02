const tableData = [
  {
    id: 0,
    type: 0,
    date: "10 nov",
    time: "10:00",
    group: "A",
    points: "0",
    teamA: "NL",
    teamB: "US",
    valueA: 0,
    valueB: 1,
    resultA: 0,
    resultB: 1,
  },
  {
    id: 1,
    type: 0,
    date: "12 nov",
    time: "12:00",
    group: "B",
    points: "0",
    teamA: "HR",
    teamB: "CA",
    valueA: 0,
    valueB: 3,
    resultA: 0,
    resultB: 1,
  },
  {
    id: 2,
    type: 0,
    date: "10 nov",
    time: "10:00",
    group: "C",
    points: "0",
    teamA: "GB",
    teamB: "AR",
    valueA: 5,
    valueB: 1,
    resultA: 0,
    resultB: 1,
  },
  {
    id: 3,
    type: 0,
    date: "12 nov",
    time: "12:00",
    group: "D",
    points: "0",
    teamA: "ES",
    teamB: "BE",
    valueA: 5,
    valueB: 3,
    resultA: 5,
    resultB: 3,
  },
  {
    id: 4,
    type: 1,
    date: "20 nov",
    time: "10:00",
    group: "A",
    points: "0",
    teamA: "BE",
    teamB: "FR",
    valueA: 2,
    valueB: 1,
  },
  {
    id: 5,
    type: 1,
    date: "22 nov",
    time: "12:00",
    group: "B",
    points: "0",
    teamA: "MX",
    teamB: "AU",
    valueA: 3,
    valueB: 1,
  },
  {
    id: 6,
    type: 1,
    date: "22 nov",
    time: "12:00",
    group: "C",
    points: "0",
    teamA: "FI",
    teamB: "SN",
    valueA: 3,
    valueB: 1,
  },
  {
    id: 7,
    type: 1,
    date: "22 nov",
    time: "12:00",
    group: "D",
    points: "0",
    teamA: "DK",
    teamB: "SE",
    valueA: 3,
    valueB: 1,
  },
];

const headingData = {
  title: {
    text: "Sweepstakes",
  },
  content: {
    text: "Try to predict the world cup matches and win grand prizes!",
    color: "stable-700",
  },
};

const cardRulesData = {
  icon: {
    name: "info",
  },
  title: {
    text: "Rules",
  },
  content: {
    text: "Make sure to fill in all rounds before submitting",
    color: "stable-700",
  },
  rules: [
    {
      icon: {
        name: "checkmark-double",
      },
      content: {
        text: "3 points: Predict the match score perfectly!",
      },
      subtext: {
        text: "5 points: If the match contains your world cup winner",
      },
    },
    {
      icon: {
        name: "checkmark",
      },
      content: {
        text: "1 points: Predict the winning team",
      },
      subtext: {
        text: "3 points: If the match contains your world cup winner",
      },
    },
    {
      icon: {
        name: "cross",
      },
      content: {
        text: "0 points: Predict wrong",
        color: "assertive",
      },
    },
  ],
};

const examplesData = [
  {
    icon: {
      name: "create",
      color: "energized",
    },
    title: {
      text: "Form",
    },
    content: {
      text: "Fill in your predictions for all rounds",
      color: "stable-700",
    },
  },
  {
    icon: {
      name: "shirt",
      color: "positive",
    },
    title: {
      text: "Confirm",
    },
    content: {
      text: "Make sure to double check your predictions",
      color: "stable-700",
    },
  },
  {
    icon: {
      name: "document-locked",
      color: "balanced",
    },
    title: {
      text: "Submit",
    },
    content: {
      text: "Submit your predictions as a transaction",
      color: "stable-700",
    },
  },
];

const ctaData = {
  title: {
    text: "Be the next DaGoats champion",
  },
  content: {
    text: "Predict all matches and win $GOAT tokens!",
  },
  button: {
    text: "Read more",
    textColor: "light",
  },
  image: "https://dagoats.io/wp-content/uploads/2022/06/maradona.png",
};

const timelineData = {
  rounds: [
    {
      text: "Matchday 1",
    },
    {
      text: "Matchday 2",
    },
    {
      text: "Matchday 3",
    },
    {
      text: "Round of 16",
    },
    {
      text: "Quarter finals",
    },
    {
      text: "Semi finals",
    },
    {
      text: "Third place",
    },
    {
      text: "Final",
    },
  ],
};

const profileData = {
  tokens: [
    {
      title: {
        text: "GOAT",
      },
      content: {
        text: "token",
      },
      percentage: 75,
    },
    {
      title: {
        text: "DUST",
      },
      content: {
        text: "token",
      },
      percentage: 100,
    },
  ],
};

export {
  tableData,
  headingData,
  cardRulesData,
  examplesData,
  ctaData,
  timelineData,
  profileData,
};
