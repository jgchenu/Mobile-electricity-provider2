<template>
    <div class="goods">
      <div class="navBar">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
      </div>
      <div class="topImage">
        <img :src="goodsInfo.IMAGE1" alt="" width="100%">
      </div>
      <div class="goodsName">
        {{goodsInfo.NAME}}
      </div>
      <div class="goodsPrice">
        价格:￥{{goodsInfo.PRESENT_PRICE|moneyFilter}}
      </div>
      <div>
        <van-tabs swipeable sticky>
          <van-tab title="商品详情" >
            <div class="detail" v-html="goodsInfo.DETAIL">  
            </div>
          </van-tab>
          <van-tab title="评论">
            评论制作中
          </van-tab>
        </van-tabs>
      </div>
      <div class="goodsBottom">
        <div>
          <van-button size="large" type="primary">加入购物车</van-button>
        </div>
        <div>
          <van-button size="large" type="danger">直接购买</van-button>
        </div>
      </div>
    </div>
</template>

<script>
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
import { toMoney } from "../filter/moneyFilter.js";
export default {
  created() {
    this.goodId = this.$route.query.goodId;
    console.log(this.goodId);
    this.getInfo();
  },
  data() {
    return {
      goodId: "",
      goodsInfo: {}
    };
  },
  methods: {
    getInfo() {
      this.$axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: { goodId: this.goodId }
      })
        .then(res => {
          console.log(res);
          if (res.data.code === 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  .goodsName,
  .goodsPrice {
    background: #ffffff;
  }
  .detail {
    font-size: 0;
  }
  .goodsBottom {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .goodsBottom > div {
    flex: 1;
    padding: 5px;
  }
}
</style>

