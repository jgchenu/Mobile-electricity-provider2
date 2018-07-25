const BASEURl = "https://easy-mock.com/mock/5b3f56f118892e144d79f944/SmileVue/";
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURl + 'index', //商城首页所有信息
  getGoodsInfo: BASEURl + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', //用户注册接口
  login: LOCALURL + 'user/login', //用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList', //得到大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', //得到小类信息
  getGoodsListByCategorySubId: LOCALURL + 'goods/getGoodsListByCategorySubId',//得到小类商品列表信息
}
module.exports = URL;
