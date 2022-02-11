const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

module.exports = {
  getMembership: async id => {
    console.info(">>> start get membership...", id);
    await sleep(5000);
    return Promise.resolve({
      id,
      firstName: "Leon",
      lastName: "Correa",
      state: new Date()
    });
  },

  getMembers: async membershipId => {
    console.info(">>> start get member list...", membershipId);
    await sleep(4000);
    return Promise.resolve([
      {
        memberId: "11111111",
        firstName: "Leon",
        lastName: "Correa",
        dateOfBirth: "1950-11-01"
      },
      {
        memberId: "22222222",
        firstName: "Tyson",
        lastName: "Correa",
        dateOfBirth: "1955-02-20"
      }
    ]);
  }
};
