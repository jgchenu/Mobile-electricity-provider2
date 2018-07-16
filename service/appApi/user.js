const Router = require('koa-router')
const model = require('../model');
const {
  addSalt
} = require('../util.js');
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})
router.post('/register', async (ctx) => {
  console.log(ctx.request.body);
  const User = model.user;
  let saltPassword = await addSalt(ctx.request.body.password);
  await User.create({
    userName: ctx.request.body.userName,
    password: saltPassword,
    createAt: Date.now(),
    lastLoginAt: Date.now()
  }).then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      message: err
    }
  });

})
module.exports = router;
