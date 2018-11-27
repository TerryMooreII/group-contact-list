<template>
  <div class="flex justify-center mt-32">
    <div class="flex flex-col w-full sm:w-1/2 lg:w-1/3 ">
      <h1 class="text-xl mb-4 text-grey-dark font-hairline text-center tracking-wide">
        Forgot Password
      </h1>
      <form class="flex-colrounded bg-white shadow p-8 border-t border-t-12 border-teal-dark block" @submit.prevent="reset">
        <div>
          Email Address
        </div>
        <input type="text" class="input w-full" v-model="user.email">
        
        <div class="flex justify-between mt-8">
          <button class="btn-primary px-4 py-2 self-end">Send Reset Email</button>
        </div>
      </form>
      <div class="flex justify-center mt-8 text-grey-darker">
        Don't have an account?&nbsp;<router-link class="text-teal-dark self-center" to="/create-account">Create Account</router-link>
      </div>
    </div>
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
    reset() {
      if (!this.user.email) {
        this.error = 'Email address is required';
        return
      }

      datastore.sendPasswordResetEmail(this.user.email)
        .then(success => console.log(success))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped lang="less">
input {
  margin-left: 0 !important;
}
</style>
