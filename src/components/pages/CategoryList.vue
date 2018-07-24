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
                        <van-tabs v-model="active">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                        </van-tabs>
                    </div>
                    <div id="list">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" @load="loadMore">
                            <div class="listItem" v-for="item in list" :key="item">{{item}}</div>
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
      list: [],
      isRefresh: false //下拉刷新
    };
  },
  methods: {
    getCategory() {
      this.$axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(res => {
          console.log(res);
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
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMore() {
      setTimeout(() => {
        for (let index = 0; index < 10; index++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.list = [];
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
      text-align: center;
      line-height: 80px;
      border-bottom: 1px solid #f0f0f0;
      background: #fff;
    }
  }
}
</style>

