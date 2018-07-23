const BASEURl = "https://easy-mock.com/mock/5b3f56f118892e144d79f944/SmileVue/";
const LOCALURL='http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURl + 'index', //商城首页所有信息
  getGoodsInfo: BASEURl + 'getGoodsInfo',
  registerUser:LOCALURL+'user/register',
  login:LOCALURL+'user/login',
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo'
}
module.exports = URL;
