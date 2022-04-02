<template>
  <div>
    <header class="home-header wrap" :class="{ active: headerScroll }">
      <router-link tag="i" to="./category"><i class="iconfont icon-caidan"></i></router-link>
      <div class="header-search">
        <span class="app-name">新蜂商城</span>
        <i class="iconfont icon-search"></i>
        <router-link tag="span" class="search-title" to="./product-list?from=home">山河无恙，人间皆安</router-link>
      </div>
      <router-link class="login" tag="span" to="./login" v-if="!isLogin">登录</router-link>
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <Swiper :images="swipeList"></Swiper>
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId">
        <img :src="item.imgUrl" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">新品上线</header>
      <!-- GoodsItem 组件 -->
      <div class="good-box">
        <goods-item v-for="item in newGoodsInfo" :key="item.goodsId" :goodInfo="item"></goods-item>
      </div>
    </div>
    <div class="good">
      <header class="good-header">热门商品</header>
      <!-- GoodsItem 组件 -->
      <div class="good-box">
        <goods-item v-for="item in hotGoodsInfo" :key="item.goodsId" :goodInfo="item"></goods-item>
      </div>
    </div>
    <div class="good">
      <header class="good-header">最新推荐</header>
      <!-- GoodsItem 组件 -->
      <div class="good-box">
        <goods-item v-for="item in recommendGoodsInfo" :key="item.goodsId" :goodInfo="item"></goods-item>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper/Swiper.vue'
import GoodsItem from '@/components/GoodsItem/GoodsItem.vue'
import { getHome } from '@/api/homeAPI.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Swiper,
    GoodsItem
  },
  data() {
    return {
      headerScroll: false,
      isLogin: false,
      swipeList: [],
      categoryList: [
        {
          name: '新蜂超市',
          imgUrl: '//s.weituibao.com/1583585285461/cs.png',
          categoryId: 100001
        },
        {
          name: '新蜂服饰',
          imgUrl: '//s.weituibao.com/1583585285468/fs.png',
          categoryId: 100003
        },
        {
          name: '全球购',
          imgUrl: '//s.weituibao.com/1583585285470/qq.png',
          categoryId: 100002
        },
        {
          name: '新蜂生鲜',
          imgUrl: '//s.weituibao.com/1583585285472/sx.png',
          categoryId: 100004
        },
        {
          name: '新蜂到家',
          imgUrl: '//s.weituibao.com/1583585285467/dj.png',
          categoryId: 100005
        },
        {
          name: '充值缴费',
          imgUrl: '//s.weituibao.com/1583585285465/cz.png',
          categoryId: 100006
        },
        {
          name: '9.9元拼',
          imgUrl: '//s.weituibao.com/1583585285469/pt.png',
          categoryId: 100007
        },
        {
          name: '领劵',
          imgUrl: '//s.weituibao.com/1583585285468/juan.png',
          categoryId: 100008
        },
        {
          name: '省钱',
          imgUrl: '//s.weituibao.com/1583585285471/sq.png',
          categoryId: 100009
        },
        {
          name: '全部',
          imgUrl: '//s.weituibao.com/1583585285470/qb.png',
          categoryId: 100010
        }
      ],
      // 新品列表
      newGoodsInfo: [],
      // 热门商品列表
      hotGoodsInfo: [],
      // 最新推荐商品列表
      recommendGoodsInfo: []
    }
  },
  computed: {
    ...mapState('userAbout', ['token'])
  },
  methods: {
    ...mapActions('cartAbout', ['updateCart']),
    async initHome() {
      if (this.token) {
        this.isLogin = true
        try {
          this.updateCart()
        } catch (err) {}
      }

      const { data: res } = await getHome()
      if (res.resultCode === 200) {
        for (const item of res.data.carousels) {
          this.swipeList.push(item.carouselUrl)
        }
        this.newGoodsInfo = res.data.newGoodses
        this.hotGoodsInfo = res.data.hotGoodses
        this.recommendGoodsInfo = res.data.recommendGoodses
      }
    },
    pageScroll() {
      // const height = document.querySelector('.van-swipe').offsetHeight - document.querySelector('.home-header').offsetHeight
      const scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollHeight > 100 ? (this.headerScroll = true) : (this.headerScroll = false)
    }
  },
  created() {
    this.initHome()
  },
  mounted() {
    window.addEventListener('scroll', this.pageScroll)
  }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_3290889_ku2jlvqtkr9.css';
@import '@/common/style/mixin.less';
.home-header {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;
  .icon-caidan {
    color: @primary;
  }
  &.active {
    background: @primary;
    .icon-caidan {
      color: #fff;
    }
    .login {
      color: #fff;
    }
  }

  .header-search {
    display: flex;
    .wh(74%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    .app-name {
      padding: 0 10px;
      color: @primary;
      font-size: 20px;
      font-weight: bold;
      border-right: 1px solid #666;
    }
    .icon-search {
      padding: 0 10px;
      font-size: 17px;
    }
    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }
  .icon-iconyonghu {
    color: #fff;
    font-size: 22px;
  }
  .login {
    color: @primary;
    line-height: 52px;
    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;
  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    img {
      .wh(40px, 40px);
      margin: 13px auto 8px auto;
    }
    span {
      font-size: 12px;
    }
  }
}
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
