const Router = require("koa-router");
const router = new Router();
const model = require('../model')
router.get("/insertAllGoodsInfo", async ctx => {
  fs.readFile("../data/dataJson/goods.json", "utf-8", function (err, data) {
    data = JSON.parse(data)
    let saveCount = 0;
    const Goods = model.goods;
    data.map((value, index) => {
      console.log(value)
      await Goods.create(value).then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch((err) => {
        console.log('失败：' + err)
      });
    })
  });
});
module.exports = router
