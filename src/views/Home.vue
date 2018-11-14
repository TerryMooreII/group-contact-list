<template>
   <div>
    <!-- <Navbar class="block sm:hidden" @menu="() => this.show = !this.show"/> -->
    <div class="flex mx-1 sm:mx-20">
      <transition
        name="fade"
        mode="out-in">
        <router-view/>
      </transition>
    </div>
  <!-- <Footer /> -->
  </div>
</template>

<script>

export default {
  name: 'contact-list',
  components: {
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>

