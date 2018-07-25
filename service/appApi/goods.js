const Router = require("koa-router");
const router = new Router();
const model = require("../model");
const fs = require("fs");
router.get("/insertAllGoodsInfo", async ctx => {
  fs.readFile("./dataJson/goods.json", "utf-8", function (err, data) {
    data = JSON.parse(data);
    let saveCount = 0;
    const Goods = model.goods;
    data.map((value, index) => {
      // console.log(value);
      Goods.create(value)
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch(err => {
          console.log("失败：" + err);
        });
    });
  });
  ctx.body = "开始导入";
});
router.get("/insertAllcategory", async ctx => {
  fs.readFile("./dataJson/category.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = model.category;
    data.RECORDS.map((value, index) => {
      console.log(value);
      Category.create(value)
        .then(() => {
          saveCount++;
          console.log("成功插入" + saveCount);
        })
        .catch(err => {
          console.log("失败", err);
        });
    });
  });
  ctx.body = "开始导入";
});
router.get("/insertAllcategorySub", async ctx => {
  fs.readFile("./dataJson/category_sub.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = model.categorySub;
    data.RECORDS.map((value, index) => {
      console.log(value);
      CategorySub.create(value)
        .then(() => {
          saveCount++;
          console.log("成功插入" + saveCount);
        })
        .catch(err => {
          console.log("失败", err);
        });
    });
  });
  ctx.body = "开始导入";
});
router.post("/getDetailGoodsInfo", async ctx => {
  try {
    let goodId = ctx.request.body.goodId;
    const Goods = model.goods;
    let result = await Goods.findOne({
      where: {
        ID: goodId
      }
    });
    console.log(result)
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    console.log(error)

    ctx.body = {
      code: 500,
      message: error
    };
  }
});
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = model.category;
    let result = await Category.findAll();
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId;
    const CategorySub = model.categorySub;
    let result = await CategorySub.findAll({
      where: {
        MALL_CATEGORY_ID: categoryId
      }
    })
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
router.post('/getGoodsListByCategorySubId', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId;
    let page = ctx.request.body.page;
    let num = 10;
    let start = (page - 1) * num
    const Goods = model.goods;
    let result = await Goods.findAll({
      where: {
        SUB_ID: categorySubId
      },
      offset: start,
      limit: num
    })
    ctx.body = {
      code: 200,
      message: result
    }

  } catch (err) {
    ctx.body = {
      code: 500,
      message: err
    }
  }
})
module.exports = router;
