<template>
  <div>
    <transition :name="transitionName">
      <keep-alive :include="['UserSetting', 'ProductDetail']">
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>

    <!--  <keep-alive>
      <transition :name="transitionName" mode="out-in">
        <router-view v-if="$route.meta.isAlive" class="router-view"></router-view>
      </transition>
    </keep-alive>

    <transition :name="transitionName" mode="out-in">
      <router-view v-if="!$route.meta.isAlive" class="router-view"></router-view>
    </transition> -->
    <!-- <transition :name="transitionName">
      <router-view class="router-view"></router-view>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    $route(to, from) {
      const indexTo = to.meta.index
      const indexFrom = from.meta.index
      if (indexFrom < indexTo) {
        // 由主级到次级
        this.transitionName = 'slide-left'
      } else if (indexFrom > indexTo) {
        // 由次级到主级
        this.transitionName = 'slide-right'
      } else {
        // 平级之间
        this.transitionName = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.router-view {
  width: 100%;
  height: auto;
  /* position: absolute;
  top: 0;
  bottom: 0; */
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  height: 100%;
  will-change: transform;
  position: absolute;
  transition: all 500ms;
  backface-visibility: hidden;
}
.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-right-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
/* .slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
} */
</style>
