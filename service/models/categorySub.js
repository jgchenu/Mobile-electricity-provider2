const sequelize = require('../db')
const Sequelize = require('sequelize')
module.exports = sequelize.define('categorySub', {
  ID: {
    unique: true,
    primaryKey: true,
    type: Sequelize.STRING()
  },
  MALL_CATEGORY_ID: {
    type: Sequelize.STRING()

  },
  MALL_SUB_NAME: {
    type: Sequelize.STRING()
  },
  COMMENTS: {
    type: Sequelize.STRING()
  },
  SORT: {
    type: Sequelize.INTEGER()
  }

}, {
  timestamps: false,
  freezeTableName: true
})
