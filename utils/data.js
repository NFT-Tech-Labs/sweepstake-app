const teams = [
  {
    countryName: "Ecuador",
    countryShortCode: "EC",
  },
  {
    countryName: "Qatar",
    countryShortCode: "QA",
  },
  {
    countryName: "Senegal",
    countryShortCode: "SN",
  },
  {
    countryName: "United States",
    countryShortCode: "US",
  },
  {
    countryName: "Senegal",
    countryShortCode: "SN",
  },
  {
    countryName: "Wales",
    countryShortCode: "WL",
  },
  {
    countryName: "Iran",
    countryShortCode: "IR",
  },
  {
    countryName: "England",
    countryShortCode: "EN",
  },
  {
    countryName: "Argentina",
    countryShortCode: "AR",
  },
  {
    countryName: "Saudi Arabia",
    countryShortCode: "SA",
  },
  {
    countryName: "Mexico",
    countryShortCode: "MX",
  },
  {
    countryName: "Poland",
    countryShortCode: "PL",
  },
  {
    countryName: "France",
    countryShortCode: "FR",
  },
  {
    countryName: "Australia",
    countryShortCode: "AU",
  },
  {
    countryName: "Denmark",
    countryShortCode: "DK",
  },
  {
    countryName: "Tunesia",
    countryShortCode: "TN",
  },
  {
    countryName: "Costa Rica",
    countryShortCode: "CR",
  },
  {
    countryName: "Japan",
    countryShortCode: "JP",
  },
  {
    countryName: "Spain",
    countryShortCode: "ES",
  },
  {
    countryName: "Germany",
    countryShortCode: "DE",
  },
  {
    countryName: "Belgium",
    countryShortCode: "BE",
  },
  {
    countryName: "Morocco",
    countryShortCode: "MA",
  },
  {
    countryName: "Croatia",
    countryShortCode: "HR",
  },
  {
    countryName: "Canada",
    countryShortCode: "CA",
  },
  {
    countryName: "Serbia",
    countryShortCode: "RS",
  },
  {
    countryName: "Brazil",
    countryShortCode: "BR",
  },
  {
    countryName: "Cameroon",
    countryShortCode: "CM",
  },
  {
    countryName: "Switzerland",
    countryShortCode: "CH",
  },
  {
    countryName: "Ghana",
    countryShortCode: "GH",
  },
  {
    countryName: "Portugal",
    countryShortCode: "PT",
  },
  {
    countryName: "South Korea",
    countryShortCode: "KR",
  },
  {
    countryName: "Uruguay",
    countryShortCode: "UY",
  },
];

const tableData = [
  {
    matchId: 0,
    type: 0,
    playDate: "21 nov",
    playTime: "17:00",
    group: "A",
    points: "0",
    teamA: "SN",
    teamB: "NL",
    scoreA: null,
    scoreB: null,
  },
  {
    matchId: 1,
    type: 0,
    playDate: "20 nov",
    playTime: "17:00",
    group: "A",
    points: "0",
    teamA: "QA",
    teamB: "EC",
    scoreA: null,
    scoreB: null,
  },
  {
    matchId: 2,
    type: 0,
    playDate: "25 nov",
    playTime: "14:00",
    group: "A",
    points: "0",
    teamA: "QA",
    teamB: "SN",
    scoreA: "5",
    scoreB: "1",
  },
  {
    matchId: 3,
    type: 0,
    playDate: "25 nov",
    playTime: "17:00",
    group: "A",
    points: "0",
    teamA: "NL",
    teamB: "EC",
    scoreA: "5",
    scoreB: "3",
  },
  {
    matchId: 4,
    type: 0,
    playDate: "29 nov",
    playTime: "16:00",
    group: "A",
    points: "0",
    teamA: "NL",
    teamB: "QA",
    scoreA: "2",
    scoreB: "1",
  },
  {
    matchId: 5,
    type: 0,
    playDate: "29 nov",
    playTime: "16:00",
    group: "A",
    points: "0",
    teamA: "EC",
    teamB: "SN",
    scoreA: "3",
    scoreB: "1",
  },
  {
    matchId: 6,
    type: 1,
    playDate: "21 nov",
    playTime: "14:00",
    group: "B",
    points: "0",
    teamA: "EN",
    teamB: "IR",
    scoreA: "3",
    scoreB: "1",
  },
  {
    matchId: 7,
    type: 1,
    playDate: "21 nov",
    playTime: "20:00",
    group: "B",
    points: "0",
    teamA: "US",
    teamB: "WL",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 8,
    type: 1,
    playDate: "25 nov",
    playTime: "11:00",
    group: "B",
    points: "0",
    teamA: "WL",
    teamB: "IR",
    scoreA: "1",
    scoreB: "1",
  },
  {
    matchId: 9,
    type: 1,
    playDate: "25 nov",
    playTime: "20:00",
    group: "B",
    points: "0",
    teamA: "EN",
    teamB: "US",
    scoreA: "2",
    scoreB: "2",
  },
  {
    matchId: 10,
    type: 1,
    playDate: "29 nov",
    playTime: "20:00",
    group: "B",
    points: "0",
    teamA: "WL",
    teamB: "EN",
    scoreA: "2",
    scoreB: "1",
  },
  {
    matchId: 11,
    type: 1,
    playDate: "29 nov",
    playTime: "20:00",
    group: "B",
    points: "0",
    teamA: "IR",
    teamB: "US",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 12,
    type: 2,
    playDate: "22 nov",
    playTime: "11:00",
    group: "C",
    points: "0",
    teamA: "AR",
    teamB: "SA",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 13,
    type: 2,
    playDate: "22 nov",
    playTime: "17:00",
    group: "C",
    points: "0",
    teamA: "MX",
    teamB: "PL",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 14,
    type: 2,
    playDate: "26 nov",
    playTime: "14:00",
    group: "C",
    points: "0",
    teamA: "PL",
    teamB: "SA",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 15,
    type: 2,
    playDate: "26 nov",
    playTime: "20:00",
    group: "C",
    points: "0",
    teamA: "AR",
    teamB: "MX",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 16,
    type: 2,
    playDate: "30 nov",
    playTime: "20:00",
    group: "C",
    points: "0",
    teamA: "PL",
    teamB: "AR",
    scoreA: 1,
    scoreB: 0,
  },
  {
    matchId: 17,
    type: 2,
    playDate: "30 nov",
    playTime: "20:00",
    group: "C",
    points: "0",
    teamA: "SA",
    teamB: "MX",
    scoreA: "4",
    scoreB: "3",
  },
  {
    matchId: 18,
    type: 3,
    playDate: "22 nov",
    playTime: "14:00",
    group: "D",
    points: "0",
    teamA: "DK",
    teamB: "TN",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 19,
    type: 3,
    playDate: "22 nov",
    playTime: "20:00",
    group: "D",
    points: "0",
    teamA: "FR",
    teamB: "AU",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 20,
    type: 3,
    playDate: "26 nov",
    playTime: "11:00",
    group: "D",
    points: "0",
    teamA: "TN",
    teamB: "AU",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 21,
    type: 3,
    playDate: "26 nov",
    playTime: "17:00",
    group: "D",
    points: "0",
    teamA: "FR",
    teamB: "DK",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 22,
    type: 3,
    playDate: "30 nov",
    playTime: "16:00",
    group: "D",
    points: "0",
    teamA: "TN",
    teamB: "FR",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 23,
    type: 3,
    playDate: "30 nov",
    playTime: "16:00",
    group: "D",
    points: "0",
    teamA: "AU",
    teamB: "DK",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 24,
    type: 4,
    playDate: "23 nov",
    playTime: "14:00",
    group: "E",
    points: "0",
    teamA: "DE",
    teamB: "JP",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 25,
    type: 4,
    playDate: "23 nov",
    playTime: "17:00",
    group: "E",
    points: "0",
    teamA: "ES",
    teamB: "CR",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 26,
    type: 4,
    playDate: "27 nov",
    playTime: "11:00",
    group: "E",
    points: "0",
    teamA: "JP",
    teamB: "CR",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 27,
    type: 4,
    playDate: "27 nov",
    playTime: "20:00",
    group: "E",
    points: "0",
    teamA: "ES",
    teamB: "DE",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 28,
    type: 4,
    playDate: "1 dec",
    playTime: "20:00",
    group: "E",
    points: "0",
    teamA: "JP",
    teamB: "ES",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 29,
    type: 4,
    playDate: "1 dec",
    playTime: "20:00",
    group: "E",
    points: "0",
    teamA: "CR",
    teamB: "DE",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 30,
    type: 5,
    playDate: "23 nov",
    playTime: "11:00",
    group: "F",
    points: "0",
    teamA: "MA",
    teamB: "HR",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 31,
    type: 5,
    playDate: "23 nov",
    playTime: "20:00",
    group: "F",
    points: "0",
    teamA: "BE",
    teamB: "CA",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 32,
    type: 5,
    playDate: "27 nov",
    playTime: "14:00",
    group: "F",
    points: "0",
    teamA: "BE",
    teamB: "MA",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 33,
    type: 5,
    playDate: "27 nov",
    playTime: "17:00",
    group: "F",
    points: "0",
    teamA: "HR",
    teamB: "CA",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 34,
    type: 5,
    playDate: "1 dec",
    playTime: "16:00",
    group: "F",
    points: "0",
    teamA: "HR",
    teamB: "BE",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 35,
    type: 5,
    playDate: "1 dec",
    playTime: "16:00",
    group: "F",
    points: "0",
    teamA: "CA",
    teamB: "MA",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 36,
    type: 6,
    playDate: "24 nov",
    playTime: "11:00",
    group: "G",
    points: "0",
    teamA: "CH",
    teamB: "CM",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 37,
    type: 6,
    playDate: "24 nov",
    playTime: "20:00",
    group: "G",
    points: "0",
    teamA: "BR",
    teamB: "RS",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 38,
    type: 6,
    playDate: "28 nov",
    playTime: "11:00",
    group: "G",
    points: "0",
    teamA: "CM",
    teamB: "RS",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 39,
    type: 6,
    playDate: "28 nov",
    playTime: "17:00",
    group: "G",
    points: "0",
    teamA: "BR",
    teamB: "CH",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 40,
    type: 6,
    playDate: "2 dec",
    playTime: "20:00",
    group: "G",
    points: "0",
    teamA: "CM",
    teamB: "BR",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 41,
    type: 6,
    playDate: "2 dec",
    playTime: "20:00",
    group: "G",
    points: "0",
    teamA: "RS",
    teamB: "CH",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 42,
    type: 7,
    playDate: "24 nov",
    playTime: "14:00",
    group: "H",
    points: "0",
    teamA: "UY",
    teamB: "KR",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 43,
    type: 7,
    playDate: "24 nov",
    playTime: "17:00",
    group: "H",
    points: "0",
    teamA: "PT",
    teamB: "GH",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 44,
    type: 7,
    playDate: "28 nov",
    playTime: "14:00",
    group: "H",
    points: "0",
    teamA: "KR",
    teamB: "GH",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 45,
    type: 7,
    playDate: "28 nov",
    playTime: "20:00",
    group: "H",
    points: "0",
    teamA: "PT",
    teamB: "UY",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 46,
    type: 7,
    playDate: "2 dec",
    playTime: "16:00",
    group: "H",
    points: "0",
    teamA: "KR",
    teamB: "PT",
    scoreA: "3",
    scoreB: "4",
  },
  {
    matchId: 47,
    type: 7,
    playDate: "2 dec",
    playTime: "16:00",
    group: "H",
    points: "0",
    teamA: "GH",
    teamB: "UY",
    scoreA: "3",
    scoreB: "4",
  },
];

const groupsScheme = [
  {
    group: "A",
    teams: ["NL", "EC", "QA", "SN"],
  },
  {
    group: "B",
    teams: ["US", "WL", "IR", "EN"],
  },
  {
    group: "C",
    teams: ["AR", "SA", "MX", "PL"],
  },
  {
    group: "D",
    teams: ["FR", "AU", "DK", "TN"],
  },
  {
    group: "E",
    teams: ["CR", "JP", "ES", "DE"],
  },
  {
    group: "F",
    teams: ["BE", "MA", "HR", "CA"],
  },
  {
    group: "G",
    teams: ["RS", "BR", "CM", "CH"],
  },
  {
    group: "H",
    teams: ["GH", "PT", "KR", "UY"],
  },
];

const roundOf16Scheme = [
  {
    match: 1,
    teamA: "A1",
    teamB: "B2",
    playDate: "2 dec",
    playTime: "16:00",
  },
  {
    match: 2,
    teamA: "C1",
    teamB: "D2",
    playDate: "2 dec",
    playTime: "20:00",
  },
  {
    match: 3,
    teamA: "D1",
    teamB: "C2",
    playDate: "3 dec",
    playTime: "16:00",
  },
  {
    match: 4,
    teamA: "B1",
    teamB: "A2",
    playDate: "3 dec",
    playTime: "20:00",
  },
  {
    match: 5,
    teamA: "E1",
    teamB: "F2",
    playDate: "4 dec",
    playTime: "16:00",
  },
  {
    match: 6,
    teamA: "G1",
    teamB: "H2",
    playDate: "4 dec",
    playTime: "20:00",
  },
  {
    match: 7,
    teamA: "F1",
    teamB: "E2",
    playDate: "5 dec",
    playTime: "16:00",
  },
  {
    match: 8,
    teamA: "H1",
    teamB: "G2",
    playDate: "5 dec",
    playTime: "20:00",
  },
];

const quarterScheme = [
  {
    match: 1,
    teamA: "WG5",
    teamB: "WG6",
    playDate: "9 dec",
    playTime: "16:00",
  },
  {
    match: 2,
    teamA: "WG1",
    teamB: "WG2",
    playDate: "9 dec",
    playTime: "20:00",
  },
  {
    match: 3,
    teamA: "WG7",
    teamB: "WG8",
    playDate: "10 dec",
    playTime: "16:00",
  },
  {
    match: 4,
    teamA: "WG4",
    teamB: "WG3",
    playDate: "10 dec",
    playTime: "20:00",
  },
];

const semiScheme = [
  {
    match: 1,
    teamA: "WG2",
    teamB: "WG1",
    playDate: "13 dec",
    playTime: "20:00",
  },
  {
    match: 2,
    teamA: "WG4",
    teamB: "WG3",
    playDate: "14 dec",
    playTime: "20:00",
  },
];

const thirdPlaceScheme = [
  {
    match: 1,
    teamA: "LG1",
    teamB: "LG2",
    playDate: "17 dec",
    playTime: "20:00",
  },
];

const finalScheme = [
  {
    match: 1,
    teamA: "WG1",
    teamB: "WG2",
    playDate: "18 dec",
    playTime: "20:00",
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

const headingRulesData = {
  title: {
    text: "Rules",
  },
  content: {
    text: "The rules for the point system in each round",
    color: "stable-700",
  },
};

const rulesData = [
  {
    icon: {
      name: "info",
    },
    title: {
      text: "Overall Rules",
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
          text: "3 points: Predict match score and winner/draw",
        },
        subtext: {
          text: "5 points: If the match includes your seleceted team",
        },
      },
      {
        icon: {
          name: "checkmark",
        },
        content: {
          text: "1 points: Predict winner/draw",
        },
        subtext: {
          text: "3 points: if the match includes your selected team",
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
  },
  {
    icon: {
      name: "info",
    },
    title: {
      text: "Ro16, Quarters & Semi Rules",
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
          text: "1 points: Team predicted reaches the rounds in different positions",
        },
        subtext: {
          text: "3 points: If positions are exactly placed",
        },
      },
    ],
  },
  {
    icon: {
      name: "info",
    },
    title: {
      text: "Final & 3rd place Rules",
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
          text: "3 points: Team predicted reaches the Final or 3rd place",
        },
      },
    ],
  },
];

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

const profileData = {
  tokens: [
    {
      title: {
        text: "USDC",
      },
      content: {
        text: "token",
      },
      available: 0,
      required: 10,
      mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    },
    {
      title: {
        text: "DUST",
      },
      content: {
        text: "token",
      },
      available: 0,
      required: 10,
      mint: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
    },
    {
      title: {
        text: "DGOAT",
      },
      content: {
        text: "token",
      },
      available: 0,
      required: 500,
      mint: "ChhPHqxm9RLXybxFS8k1bCFb8FjziDGfQ9G2am1YKqeC",
    },
  ],
};

const paymentOptions = [
  {
    label: "0.02 SOL",
    value: "sol",
    amount: 0.02,
  },
  {
    label: "10 USDC",
    value: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    amount: 10,
    decimals: 1000000,
  },
  {
    label: "10 DUST",
    value: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
    amount: 10,
    decimals: 1000000000,
  },
  {
    label: "1 DGOAT",
    value: "ChhPHqxm9RLXybxFS8k1bCFb8FjziDGfQ9G2am1YKqeC",
    amount: 1,
    decimals: 1000000000,
  },
];

export {
  teams,
  tableData,
  groupsScheme,
  roundOf16Scheme,
  quarterScheme,
  semiScheme,
  thirdPlaceScheme,
  finalScheme,
  headingData,
  headingRulesData,
  rulesData,
  examplesData,
  ctaData,
  profileData,
  paymentOptions,
};
