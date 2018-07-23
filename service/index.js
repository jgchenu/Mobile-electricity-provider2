const Koa = require('koa');
const app = new Koa;
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
let user = require('./appApi/user')
let home = require('./appApi/home')
let goods = require('./appApi/goods')
app.use(bodyParser())
app.use(cors())
//装载所有子路由
let router = new Router;
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/goods', goods.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// (async () => {
//   const User = model.user;
//   let password = '123456'

//   let saltPassword = await addSalt(password)

//   let oneUser = await User.create({
//     userName: 'jgchen1',
//     password: saltPassword,
//     createAt: Date.now(),
//     lastLoginAt: Date.now()
//   }, () => {
//     console.log("插入成功了")
//   });
//   let user = await User.findAll({});
//   console.log('-------------------')
//   console.log(JSON.stringify(user))
//   console.log('---------------------------')
// })();
app.use(async (ctx) => {
  ctx.body = `<h1>Hello world</h1>`
})
app.listen(3000, () => {
  console.log('listen 3000')
})
