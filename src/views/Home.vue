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
import datastore from '../services/datastore';
import Navbar from '../components/Navbar';

export default {
  name: 'contact-list',
  components: {
    Navbar
  },
  beforeRouteEnter(to, from, next) {
    const user = datastore.getCurrentUser();
    if (!user) {
      next('/login')
    }
    datastore.groupsEmailAccontIsBelongsTo('terry.moore.ii@gmail.com')
      .then(groups => {
        if (groups.length > 0) {
          next(vm => vm.$router.push('/schmitz'));
        }else {
          next('/login');
        }
      });
  }
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

