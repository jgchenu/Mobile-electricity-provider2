const sequelize = require("../db.js");
const Sequelize = require("sequelize");
module.exports = sequelize.define(
  'goods', {
    ID: {
      type: Sequelize.STRING(),
      unique: true,
      primaryKey: true,
    },
    GOODS_SERIAL_NUMBER: Sequelize.STRING(),
    SHOP_ID: Sequelize.STRING(),
    SUB_ID: Sequelize.STRING(),
    GOOD_TYPE: Sequelize.INTEGER(),
    STATE: Sequelize.INTEGER(),
    NAME: Sequelize.STRING(),
    ORI_PRICE: Sequelize.FLOAT(),
    PRESENT_PRICE: Sequelize.FLOAT(),
    AMOUNT: Sequelize.INTEGER(),
    DETAIL: Sequelize.STRING(),
    BRIEF: Sequelize.STRING(),
    SALES_COUNT: Sequelize.INTEGER(),
    IMAGE1: Sequelize.STRING(),
    IMAGE2: Sequelize.STRING(),
    IMAGE3: Sequelize.STRING(),
    IMAGE4: Sequelize.STRING(),
    IMAGE5: Sequelize.STRING(),
    ORIGIN_PLACE: Sequelize.STRING(),
    GOOD_SCENT: Sequelize.STRING(),
    CREATE_TIME: Sequelize.STRING(),
    UPDATE_TIME: Sequelize.STRING(),
    IS_RECOMMEND: Sequelize.INTEGER(),
    PICTURE_COMPERSS_PATH: Sequelize.STRING()
  }, {
    timestamps: false,
    freezeTableName: true
  }
)
