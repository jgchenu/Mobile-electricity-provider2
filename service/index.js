const Koa = require('koa');
const app = new Koa;
const model = require('./model');
(async () => {
  const User = model.user;

  let oneUser = await User.create({
    userName: 'jgchen1',
    password: '123456',
    createAt: Date.now(),
    lastLoginAt: Date.now()
  }, () => {
    console.log("插入成功了")
  });

  let user = await User.findAll({});
  console.log('-------------------')
  console.log(JSON.stringify(user))
  console.log('---------------------------')
})()
app.use(async (ctx) => {
  ctx.body = `<h1>Hello world</h1>`
})
app.listen(3000, () => {
  console.log('listen 3000')
})
