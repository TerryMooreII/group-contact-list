<template>
  <div class="flex justify-center mt-32">

    <form class="flex-col w-full sm:w-1/2 lg:w-1/3 rounded border border-grey-light bg-white shadow p-8" @submit.prevent="login">
      <h1 class="text-lg mb-8">
        Contact List Login
      </h1>
      <div>
        Username
      </div>
      <input type="password" class="input w-full" v-model="user.username">
      <div class="mt-6">
        Password
      </div>
      <input type="password" class="input w-full" v-model="user.password">
      <div v-if="error" class="text-red py-4">
        {{error}}
      </div>
      <div class="flex justify-end mt-8">
        <button class="btn-primary px-4 py-2 self-end">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import datastore from '../services/datastore';

export default {
  name: 'Login',
  data() {
    return {
      user: {},
      error: null
    }
  },
  methods: {
    login() {
      // datastore.login(this.user).then(isSuccess => {
      //   this.$router.push(`/${this.$route.params.group}`);
      // })
      sessionStorage.setItem('group', this.$route.params.group);
      this.$router.push(`/${this.$route.params.group}`);
    }
  }
};
</script>

<style scoped lang="less">
input {
  margin-left: 0 !important;
}
</style>
