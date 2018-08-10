<template>
    <div>
        <div class="navBarDiv">
            <van-nav-bar   title="购物车"/>
        </div>
        <div class="cartTitle">
            <van-button size='small' type='danger' plain @click="clearCart">清空购物车</van-button>
        </div>
        <div class="cartList">
            <van-row v-for="(item,index) in cartInfo" :key="index" class="goodRow">
                <van-col span='6'>
                    <img :src="item.image" alt="image" width="100%">
                </van-col>
                <van-col span='14' class="goodText">
                    <div class="goodName">{{item.name}}</div>
                    <div class="control">
                        <van-stepper v-model="item.count" />
                    </div>
                </van-col>
                <van-col span='4' class="goodPrice">
                    <div class="price">￥{{item.price|moneyFilter}}</div>
                    <div class="count">
                      x{{item.count}}
                    </div>
                    <div class="allPrice">
                      ￥{{item.price*item.count|moneyFilter}}
                    </div>
                </van-col>
            </van-row>
        </div>
        <!-- 显示总金额 -->
        <div class="totalMoney">
          商品总价:￥{{totalMoney|moneyFilter}}
        </div>
    </div>
</template>

<script>
import { toMoney } from "../filter/moneyFilter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: false
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo=JSON.stringify(this.cartInfo);
      return allMoney;
    }
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("this.cartInfo", JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.cartTitle {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.goodRow {
  background-color: #fff;
  font-size: 0.65rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 0.5rem;
  .goodText {
    padding-left: 20px;
  }
  .control {
    margin-top: 20px;
  }
  .goodPrice {
    text-align: right;
    .allPrice {
      color: red;
    }
  }
}
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>
