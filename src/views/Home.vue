<template>
   <div>
    <Navbar />
    <div class="flex mx-1 sm:mx-20 pt-20">
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
import Navbar from '../components/Navbar';

export default {
  name: 'contact-list',
  components: {
    Navbar
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

