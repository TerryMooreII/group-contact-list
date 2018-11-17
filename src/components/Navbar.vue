<template>
  <nav class="flex items-center justify-between flex-wrap bg-teal p-4 px-24 fixed pin-t w-full">
    <div class="flex items-center flex-no-shrink text-white mr-6">
      <Icon name="users" scale="2" />
      <span class="font-semibold text-xl ml-2">Schmitz Contacts</span>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow px-10 relative">
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
      <div>
        <router-link :to="{ name: 'contactnew', query: { search: this.$route.query.search }, params: { group: this.$route.params.group } }"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:no-underline hover:bg-white mt-4 lg:mt-0">
          Add Contact   
        </router-link>
      </div>
    </div>
  </nav>


</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      search: null,
      timeout: null
    }
  },
  methods: {
    clear(){
      this.search = '';
      this.$router.push(`/${this.$route.params.group}`);
    },
    go () {
      this.$router.push(`/${this.$route.params.group}/?search=${this.search}`);
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
</style>
