const sequelize = require("../db.js");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "user", {
    userId: {
      type: Sequelize.INTEGER(11),
      primaryKey: true
    },
    userName: Sequelize.STRING(255),
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    createAt: Sequelize.BIGINT(),
    lastLoginAt: Sequelize.BIGINT()
  }, {
    timestamps: false,
    freezeTableName: true
  }
);
