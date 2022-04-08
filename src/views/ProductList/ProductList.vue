<template>
  <div class="product-list-wrap">
    <van-nav-bar left-arrow fixed placeholder @click-left="goBack">
      <template #title>
        <van-search shape="round" v-model="keyword" ref="searchInput" />
      </template>
      <template #right>
        <span class="search-btn" @click="getSearch">搜索</span>
      </template>
    </van-nav-bar>
    <van-tabs type="card" @change="onChange">
      <van-tab title="推荐" name=""></van-tab>
      <van-tab title="新品" name="new"></van-tab>
      <van-tab title="价格" name="price"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="product-list" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="product-item" v-for="item in productList" :key="item.goodsId" @click="productDetail(item.goodsId)">
          <img :src="prefix(item.goodsCoverImg)" alt="" />
          <div class="product-info">
            <p class="product-title">{{ item.goodsName }}</p>
            <p class="product-subtitle">{{ item.goodsIntro }}</p>
            <span class="price">￥ {{ item.sellingPrice }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { search } from '@/api/goodAPI.js'

export default {
  name: 'ProductList',
  data() {
    return {
      activeName: '',
      loading: false,
      finished: false,
      isLoading: false,
      keyword: this.$route.query.keyword || '',
      page: 1,
      productList: [],
      orderBy: ''
    }
  },
  methods: {
    async initProList(isRefresh) {
      const { categoryId } = this.$route.query
      if (categoryId || this.keyword) {
        const params = {
          pageNumber: this.page,
          goodsCategoryId: categoryId,
          keyword: this.keyword,
          orderBy: this.orderBy
        }
        const { data: res } = await search(params)
        if (res.message === 'SUCCESS') {
          if (isRefresh) {
            this.productList = [...res.data.list, ...this.productList]
            this.isLoading = false
          } else {
            this.productList = [...this.productList, ...res.data.list]
          }
          this.loading = false
          if (this.page >= res.data.totalPage) this.finished = true
          !this.finished && this.page++
        }
      } else {
        this.productList = []
        this.finished = true
        this.loading = false
        this.isLoading = false
      }
    },
    goBack() {
      this.$router.push({ path: '/category' })
    },
    onLoad() {
      !this.isLoading && !this.finished && this.initProList()
    },
    onRefresh() {
      this.initProList(true)
    },
    onChange(name) {
      this.orderBy = name
      this.productList = []
      this.page = 1
      this.finished = false
      this.isLoading = true
      this.onRefresh()
    },
    getSearch() {
      this.productList = []
      this.page = 1
      this.finished = false
      this.isLoading = true
      this.onRefresh()
    },
    productDetail(id) {
      this.$router.push({ path: `/product/${id}?keyword=${this.keyword}` })
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 当通过点击搜索框跳转至商品列表页面时，搜索框自动对焦
      if (this.$route.query.from === 'category') {
        const input = document.querySelector('input.van-field__control')
        input.focus()
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.product-list-wrap {
  /deep/ .van-nav-bar__title {
    width: 75%;
    max-width: none;
    .van-search {
      width: 100%;
      padding: 0;
      padding-right: 20px;
      .van-search__content {
        background: #f7f7f7;
        height: 30px;
        .van-field__control {
          padding-right: 20px;
        }
      }
    }
  }
  .search-btn {
    height: 28px;
    line-height: 28px;
    padding: 0 5px;
    color: #fff;
    font-size: 15px;
    background: @primary;
    .borderRadius(5px);
  }
  .van-tabs {
    position: fixed;
    width: 100%;
    z-index: 999;
  }
  .product-list {
    margin-top: 30px;
    .product-item {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      height: 120px;
      width: 100%;
      border-bottom: 1px solid #dcdcdc;
      img {
        width: 140px;
        height: 120px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .product-info {
        width: 56%;
        font-size: 15px;
        padding: 5px;
        p {
          margin: 0;
        }
        .product-title {
          color: #333;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .product-subtitle {
          margin: 10px 0;
          font-size: 13px;
          color: #999;
          overflow: hidden;
        }
        .price {
          color: @primary;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
