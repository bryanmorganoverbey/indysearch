const sequelize = require("../sequelize");
const { pickRandom, randomDate } = require("./helpers/random");

async function reset() {
  console.log("Will rewrite the SQLite database.");

  await sequelize.sync({ force: true });

  console.log("Done!");
}

reset();
