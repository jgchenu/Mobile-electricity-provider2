<template>
    <div class="goods-info">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%">
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice|money}}</div>
    </div>
</template>

<script>
import { toMoney } from "../filter/moneyFilter.js";
export default {
  props: ["goodsImage", "goodsName", "goodsPrice"],
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style>
</style>
