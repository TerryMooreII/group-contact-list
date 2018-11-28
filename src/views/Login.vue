<template>
  <div class="flex justify-center mt-32">
    <div class="flex flex-col w-full sm:w-1/2 lg:w-1/3 ">
      <h1 class="text-xl mb-4 text-grey-dark font-hairline text-center tracking-wide">
        Group Contact List Login
      </h1>
      <form class="flex-colrounded bg-white shadow p-8 border-t border-t-12 border-teal-dark block" @submit.prevent="login">
        <div>
          Email Address
        </div>
        <input type="text" class="input w-full" v-model="user.email">
        <div class="mt-6">
          Password
        </div>
        <input type="password" class="input w-full" v-model="user.password">
        <div v-if="error" class="text-red py-4">
          {{error}}
        </div>
        <div v-if="notVerified" class="text-red py-4">
          You have a valid account but your email address has not been verified.  Please check your email and click the verification link. 
          <div class="inline-block btn-link" @click="resendVerification">Resend verification email</div>
        </div>
        <div class="flex justify-between mt-8">
          <router-link class="text-teal-dark self-center" to="/forgot-password">Forgot Password</router-link>
          <button class="btn-primary px-4 py-2 self-end">Login</button>
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
import helpers from '../utils/helpers';

export default {
  name: 'Login',
  data() {
    return {
      user: {},
      error: null,
      notVerified: false
    }
  },
  methods: {
    resendVerification() {
      if (this.user.email) {
        datastore.sendEmailVerification(this.user.email)
        .then(() => this.$router.push('/login'));
      }
    },
    login() {
      if (!this.user.email) {
        this.error = 'Email address is required';
        return
      }

      if (!helpers.validateEmail(this.user.email)) {
        this.error = 'Not a valid email address';
        return
      }

      if (!this.user.password) {
        this.error = 'Password is required';
        return;
      }

      datastore.login(this.user).then(response => {
        if (response.user.emailVerified) {
          this.$router.push('/');
        } else {
          this.notVerified;
        }
      }).catch(error => {
        if (['auth/wrong-password', 'auth/user-not-found'].includes(error.code)) {
          this.error = 'Invalid email address or password.';
       }
      });
    }
  },
  watch: {
    '$route.query.ana': function(val){
      if (val) {
         this.error = 'This email address is not associated with any contact lists.  Ask your list administrator to add this email address to your contact in thier contact list.'
      }
    }
  }
};
</script>

<style scoped lang="less">
input {
  margin-left: 0 !important;
}
</style>
