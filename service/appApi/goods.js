const Router = require("koa-router");
const router = new Router();
router.get("/insertAllGoodsInfo", async ctx => {
  fs.readFile("../data/dataJson/goods.json", "utf-8", function(err, data) {
      data=JSON.parse(data)
  });
});
