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
    <SelectGroupModal v-if="showModal" />
    <footer>
      <div class=" text-center text-grey-darker text-xs my-4">
        <div>
          Please send any questions, comments, or bug reports the <a href="mailto:terry.moore.ii@gmail.com">Group Contact List Team</a>
        </div>
          <div>
          Made By <a href="mailto:terry.moore.ii@gmail.com">Terry Moore II</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import datastore from '../services/datastore';
import Navbar from '../components/Navbar';
import SelectGroupModal from '../components/SelectGroupModal';

export default {
  name: 'contact-list',
  components: {
    Navbar
  },
  data() {
    return {
      showModal: false
    }
  },
  beforeRouteEnter(to, from, next) {
    const user = datastore.getCurrentUser();
    if (!user || !user.emailVerified) {
      next('/login')
    }

    datastore.groupsEmailAccontIsBelongsTo(user.email)
      .then(groups => {

        if (groups.length === 1) {
           next(vm => {
            vm.$store.dispatch('setCurrentGroup', groups[0]);
            return vm.$router.push({ name: 'contactlist', query: vm.$route.query, params: { group: groups[0].slug } } );
           });
        } else if (groups.length > 1) {
          next(vm => {
            const { currentGroup } = vm.$store.state;
            vm.$store.dispatch('setAvailableGroups', groups);

            if (currentGroup && groups.some(group => group.slug === currentGroup.slug)) {
              return vm.$router.push({ name: 'contactlist', query: vm.$route.query, params: { group: currentGroup.slug } } );
            }else {
              return vm.$router.push(`/select-group`);
            }
          });
        } else {
          next('/login?ana=true');
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

