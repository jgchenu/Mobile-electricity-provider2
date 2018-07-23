const sequelize = require("../db");
const Sequelize = require("sequelize");
module.exports = sequelize.define(
  "category",
  {
    ID: {
      unique: true,
      primaryKey: true,
      type: Sequelize.STRING()
    },
    MALL_CATEGORY_NAME: Sequelize.STRING(),
    IMAGE: Sequelize.STRING(),
    TYPE: Sequelize.INTEGER(),
    SORT: Sequelize.INTERGER(),
    COMMENTS: Sequelize.STRING()
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);
