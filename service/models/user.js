const sequelize = require('../db.js');
const Sequelize = require('sequelize');
module.exports = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER(11),
    primaryKey: true
  },
  userName: Sequelize.STRING(255),
  password: Sequelize.STRING(255),
  createAt: Sequelize.DATE(),
  lastLoginAt: Sequelize.DATE()
}, {
  timestamps: false,
  freezeTableName: true
});