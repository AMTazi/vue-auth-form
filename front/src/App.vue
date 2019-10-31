<template>
  <v-app :dark="false">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
