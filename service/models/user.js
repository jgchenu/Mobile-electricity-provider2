const sequelize = require("../db.js");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "user", {
    userId: {
      type: Sequelize.INTEGER(11),
      primaryKey: true
    },
    userName: {
      type: Sequelize.STRING(255),
      unique: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    createAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    lastLoginAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  }, {
    timestamps: false,
    freezeTableName: true
  }
);
