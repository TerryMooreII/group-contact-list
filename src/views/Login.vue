<template>
  <div class="flex justify-center mt-32">
    <div class="flex flex-col w-full sm:w-1/2 lg:w-1/3 ">
      <form class="flex-colrounded bg-white shadow p-8 border-t border-t-12 border-teal-dark block" @submit.prevent="login">
        <h1 class="text-lg mb-8">
          Group Contact List Login
        </h1>
        <div>
          Username
        </div>
        <input type="text" class="input w-full" v-model="user.email">
        <div class="mt-6">
          Password
        </div>
        <input type="password" class="input w-full" v-model="user.password">
        <div v-if="error" class="text-red py-4">
          {{error}}
        </div>
        <div class="flex justify-between mt-8">
          <router-link class="text-teal-dark self-center" to="/forgot_password">Forgot Password</router-link>
          <button class="btn-primary px-4 py-2 self-end">Login</button>
        </div>
      </form>
      <div class="flex justify-center mt-8 text-grey-darker">
        Don't have an account?&nbsp;<router-link class="text-teal-dark self-center" to="/create_account">Create Account</router-link>
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
    login() {
      if (!this.user.email) {
        this.error = 'Email address is required';
        return
      }

      if (!this.user.password) {
        this.error = 'Password is required';
        return;
      }


      datastore.login(this.user).then(isSuccess => {
        this.$router.push('/');
      }).catch(error => {
        console.log(error, ['auth/wrong-password', 'auth/user-not-found'].includes(error.code));
        if (['auth/wrong-password', 'auth/user-not-found'].includes(error.code)) {
          this.error = 'Invalid email address or password.';
       }
      });
    }
  }
};
</script>

<style scoped lang="less">
input {
  margin-left: 0 !important;
}
</style>
