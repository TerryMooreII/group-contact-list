<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal py-2 py-4 px-2 sm:px-24 fixed pin-t w-full">
    <div class="flex items-center flex-no-shrink text-white mr-6 ml-3 sm:ml-0">
      <Icon name="users" scale="2" />
      <span class="font-semibold text-xl ml-2 capitalize" v-if="$store.state.currentGroup">{{$store.state.currentGroup.displayName}} Contacts</span>
    </div>
    <div class="lg:flex-grow flex items-center lg:w-auto ">

      <div class="text-sm lg:flex-grow px-10 relative hidden lg:block">
        <Icon name="search" class="absolute mt-2 ml-2 text-teal-dark" />
        <form @submit.prevent="go()">
          <input type="text" 
               placeholder="Search Contacts"
               class="rounded text-lg w-full p-2 pl-8" v-model="search" />
        </form>
        <button class="absolute pin-r -mt-8 mr-12 p-2 outline-none" @click="clear()">
          <Icon name="times" class="text-grey-dark hover:text-grey-darker -mt-px" />
        </button>
      </div>
      <!-- <button class="hidden lg:hidden mr-2 text-white flex text-sm px-4 py-2 border rounded border-white"
              @click="toggleSearch()">
        <Icon name="search" />
      </button> -->

       

      <div>
        <router-link :to="{ name: 'contactnew', query: { search: this.$route.query.search }, params: { group: this.$store.state.currentGroup.slug }}"
          class="btn-nav">
          <Icon name="plus" class="self-center h-4 w-4"/>
          <span class="ml-2 self-center hidden sm:block"> Add Contact</span>
        </router-link>
      </div>

      <div>
        <router-link 
            v-if="$store.state.groups.length > 1" 
            :to="{ name: 'switch-account', query: { search: this.$route.query.search }, params: { group: this.$store.state.currentGroup.slug }}"
            class="btn-nav ml-2">
          <Icon name="redo" class="self-center h-4 w-4"/>
        </router-link>
      </div>

      <button class="ml-2 btn-nav"
              @click="logout()">
        <Icon name="sign-out-alt" />
      </button>
    </div>
  </nav>


</template>

<script>
import datastore from '../services/datastore';

export default {
  name: 'Navbar',
  data() {
    return {
      search: null,
      timeout: null,
      isSearchShowing: false
    }
  },
  methods: {
    clear(){
      this.search = '';
      this.$router.push(`/${this.$store.state.currentGroup.slug}`);
    },
    go () {
      this.$router.push(`/${this.$store.state.currentGroup.slug}?search=${this.search}`);
    },
    toggleSearch() {
      this.isSearchShowing = !this.isSearchShowing;
    },
    logout() {
      datastore.logout();
      this.$router.push('/login');
    }
  },
  watch: {
    search(val, old){
      if (old && !val){
        this.clear();
      }
    }
  }
};
</script>

<style scoped lang="postcss">
input::placeholder {
  @apply .text-grey-dark
}
input {
  @apply .outline-none
}
.btn-nav {
  @apply .flex .text-sm .px-4 .py-2 .leading-none .border .rounded .text-white .border-white 
}
.btn-nav:hover {
  @apply .border-transparent .text-teal .no-underline .bg-white 
}
</style>
