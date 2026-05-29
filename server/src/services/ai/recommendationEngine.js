const recommendationDatabase = {
  Deadlock: {
    youtube:
      "https://www.youtube.com/watch?v=8LvkCBBaA8Y",

    notes:
      "https://www.geeksforgeeks.org/deadlock-in-operating-system/",

    pdf:
      "https://www.tutorialspoint.com/operating_system/os_deadlocks.htm",

    playlist:
      "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O"
  },

  DBMS: {
    youtube:
      "https://www.youtube.com/watch?v=kBdlM6hNDAE",

    notes:
      "https://www.javatpoint.com/dbms-tutorial",

    pdf:
      "https://www.tutorialspoint.com/dbms/dbms_tutorial.pdf",

    playlist:
      "https://www.youtube.com/playlist?list=PLWPirh4EWFpG2O3N3K2pDzq1Qx0nWC6xV"
  },

  CN: {
    youtube:
      "https://www.youtube.com/watch?v=IPvYjXCsTg8",

    notes:
      "https://www.geeksforgeeks.org/computer-network-tutorials/",

    pdf:
      "https://www.tutorialspoint.com/data_communication_computer_network/data_communication_computer_network_tutorial.pdf",

    playlist:
      "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgLLlzdgiTUKULKJPYc0A4q"
  }
};

/*
|--------------------------------------------------------------------------
| Recommendation Generator
|--------------------------------------------------------------------------
*/
const getRecommendations = (topic) => {

  const recommendation =
    recommendationDatabase[topic];

  if (!recommendation) {
    return {
      message:
        "No recommendations found for this topic yet"
    };
  }

  return {
    topic,
    resources: recommendation
  };
};

module.exports = {
  getRecommendations
};