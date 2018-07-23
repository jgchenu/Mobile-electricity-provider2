const Router = require('koa-router')
const model = require('../model');
const {
  addSalt,
  comparePassword
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
    password: saltPassword
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
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body;
  console.log(loginUser)
  let userName = loginUser.userName;
  let password = loginUser.password;
  //引入user的model
  const User = model.user;
  await User.findOne({
    where: {
      userName: userName
    }
  }).then(async (result) => {
    console.log(JSON.stringify(result))
    if (result) {
      await comparePassword(password, result.password).then(isMatch => {
        ctx.body = {
          code: 200,
          message: isMatch
        }
      }).catch(err => {
        console.log(err)
        ctx.body = {
          code: 500,
          message: err
        }
      })
    } else {
      ctx.body = {
        code: 200,
        message: '用户名不存在'
      }
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      code: 500,
      message: err
    }
  })

})
module.exports = router;
