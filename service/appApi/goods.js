const Router = require("koa-router");
const router = new Router();
const model = require('../model')
const fs=require('fs')
router.get("/insertAllGoodsInfo", async (ctx) => {
  fs.readFile("./dataJson/goods.json", "utf-8", function (err, data) {
    data = JSON.parse(data)
    let saveCount = 0;
    const Goods = model.goods;
    data.RECORDS.map((value, index) => {
      console.log(value)
       Goods.create(value).then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch((err) => {
        console.log('失败：' + err)
      });
    })
  });
  ctx.body = '开始导入'
});
module.exports = router