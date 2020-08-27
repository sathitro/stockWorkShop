const Sequelize = require("sequelize");
const dbInstant = require("../db_instance");

const user = dbInstant.define(
  //table "user"
  "user",
  {
    // attributes
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    level: {
      type: Sequelize.STRING,
      defaultValue: "normal"
    }
  },
  {
    //option
  }
);

(async () => {
  await user.sync({ force: false });
})();

module.exports = user;
