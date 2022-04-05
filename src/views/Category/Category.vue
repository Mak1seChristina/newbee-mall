<template>
  <div class="category">
    <van-nav-bar left-arrow fixed placeholder @click-left="goHome">
      <template #title>
        <van-search placeholder="全场50元起步" shape="round" disabled @click="goSearch" />
      </template>
    </van-nav-bar>
    <div class="search-wrap" ref="searchWrap">
      <better-scroll class="nav-side-wrapper" :data="categoryData">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item v-for="item in categoryData" :key="item.categoryId" :title="item.categoryName" />
        </van-sidebar>
      </better-scroll>
      <div class="search-content">
        <better-scroll :data="categoryData[activeKey]">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="category-list" v-for="category in categoryData[activeKey].secondLevelCategoryVOS" :key="category.categoryId">
                  <p class="category-title">{{ category.categoryName }}</p>
                  <div class="product-item" v-for="item in category.thirdLevelCategoryVOS" :key="item.categoryId" @click="goProductList(item.categoryId)">
                    <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" alt="" />
                    <p class="product-title">{{ item.categoryName }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </better-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from '@/components/BetterScroll/BetterScroll.vue'
import { getCategory } from '@/api/categoryAPI.js'

export default {
  name: 'Category',
  components: {
    BetterScroll
  },
  data() {
    return {
      activeKey: 0,
      categoryData: [
        {
          secondLevelCategoryVOS: []
        }
      ]
    }
  },
  computed: {
    categoryDataItem() {
      return this.categoryData[this.activeKey]
    }
  },
  methods: {
    async initCategory() {
      const { data: res } = await getCategory()
      if (res.message === 'SUCCESS') {
        this.categoryData = res.data
      }
    },
    goHome() {
      this.$router.push({ path: '/home' })
    },
    goProductList(id) {
      this.$router.push({ path: `/product-list?categoryId=${id}` })
    },
    goSearch() {
      this.$router.push({ path: '/product-list?from=category' })
    }
  },
  created() {
    this.initCategory()
  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/mixin.less';

.category {
  /deep/ .van-nav-bar__title {
    width: 75%;
    max-width: none;
    .van-search {
      width: 100%;
      .van-search__content {
        background: #f7f7f7;
        height: 30px;
      }
    }
  }
  .search-wrap {
    display: flex;
    height: calc(100vh - 96px);
    .nav-side-wrapper {
      height: 100%;
      width: 31%;
      .van-sidebar {
        width: 100%;
        height: 100%;
        background: #f7f8fa;
      }
    }
    .van-sidebar-item--select {
      color: @primary;
    }
    .van-sidebar-item--select::before {
      background: @primary;
    }
    .search-content {
      width: 69%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      .swiper-container {
        width: 100%;
        .category-list {
          display: flex;
          flex-wrap: wrap;
          .category-title {
            width: 100%;
            font-size: 17px;
            font-weight: 500;
            padding: 20px 0;
          }
          .product-item {
            width: 33.333%;
            margin-bottom: 10px;
            text-align: center;
            img {
              width: 30px;
              height: 30px;
            }
            .product-title {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
