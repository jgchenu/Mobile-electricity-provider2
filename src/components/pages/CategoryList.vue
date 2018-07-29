<template>
    <div class="categoryList">
        <div class="navBar">
            <van-nav-bar title="类别列表" left-arrow />
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}">{{item.MALL_CATEGORY_NAME}}</li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="categorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME" ></van-tab>
                        </van-tabs>
                    </div>
                    <div id="list">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" @load="loadMore">
                            <div class="listItem" v-for="(item,index) in goodList" :key="index">
                              <div class="listItemImage">
                                <img :src="item.IMAGE1" alt="商品图片" width="100%" :onerror="errorImg">
                              </div>
                              <div class="listItemText">
                                <div>{{item.NAME}}</div>
                                <div>￥{{item.ORI_PRICE}}</div>
                              </div>
                            </div>
                        </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>

            </van-row>
        </div>
    </div>
</template>

<script>
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";

export default {
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list").style.height = winHeight - 90 + "px";
  },
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0, //激活标签,
      loading: false,
      finished: false, //上拉加载是否有数据
      isRefresh: false, //下拉刷新
      page: 1, //商品列表的页数
      goodList: [], //商品信息
      categorySubId: "", //商品子分类ID
      errorImg: 'this.src="' + require("@/assets/images/errorImg.jpg") + '"'
    };
  },
  methods: {
    getCategory() {
      this.$axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(res => {
          console.log("category:", res);
          if (res.data.code === 200 && res.data.message) {
            this.category = res.data.message;
            this.getCategorySubList(this.category[0].ID);
          } else {
            Toast("服务器错误，数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubList(categoryId);
    },
    getCategorySubList(categoryId) {
      this.$axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(res => {
          if (res.data.code === 200 && res.data.message) {
            this.categorySub = res.data.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID;
            console.log("categorySub:", res);
            this.getGoodList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickCategorySub(index, title) {
      // console.log(index, this.categorySub);
      this.categorySubId = this.categorySub[index].ID;
      console.log(this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.loadMore();
    },
    getGoodList() {
      this.$axios({
        url: url.getGoodsListByCategorySubId,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(res => {
          // console.log('goodList:',res);
          if (res.data.code === 200 && res.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(res.data.message);
            console.log("goodList:", this.goodList);
          } else {
            this.finished = true;
          }
          this.loading = false;
          // console.log(this.finished);
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMore() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.loadMore();
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.categoryList {
  #leftNav {
    background-color: aliceblue;
    ul {
      li {
        line-height: 2rem;
        border-bottom: 1px solid #e4e7ed;
        font-size: 0.8rem;
        padding: 3px;
        text-align: center;
      }
      .categoryActive {
        background-color: #ffffff;
      }
    }
  }
  #list {
    overflow: scroll;
    .listItem {
      display: flex;
      flex-direction: row;
      font-size: 0.8rem;
      border-bottom: 1px solid #f0f0f0;
      background-color: #ffffff;
      padding: 5px;
      .listItemImage {
        flex: 8;
      }
      .listItemText {
        flex: 16;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>

