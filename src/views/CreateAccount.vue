<template>
  <div class="flex justify-center mt-32">
    <div class="flex flex-col w-full sm:w-1/2 lg:w-1/3">
      <h1 class="text-xl mb-4 text-grey-dark font-hairline text-center tracking-wide">
        Create A New Account
      </h1>
      <form class="flex-colrounded bg-white shadow p-8 border-t border-t-12 border-teal-dark block" @submit.prevent="createAccount">
        <p class="text-sm text-grey-dark mb-5 text-center">
          Your email address should be part of one or more existing contact lists in order to login.
        </p>
        <div>
          Email Address
        </div>
        <input type="text" class="input w-full" v-model="user.email">
        <div class="mt-6">
          Password
        </div>
        <input type="password" class="input w-full" v-model="user.password">
        <div class="mt-6">
          Re-type Password
        </div>
        <input type="password" class="input w-full" v-model="user.password2">
        <div v-if="error" class="text-red py-4">
          {{error}}
        </div>
        <div v-if="showPasswordRecovery">
          Would you like to <router-link class="text-teal-dark self-center" to="/forgot-password">Reset Your Password</router-link>
          or type go back to the <router-link class="text-teal-dark self-center" to="/login">Login Page</router-link>
        </div>

        <div v-if="successful" class="text-green-dark">
          An account verification email has been sent to your email address. You will need to verify your account before you can login.
        </div>
        
        <div class="flex justify-end mt-8">
          <button class="btn-primary px-4 py-2 self-end">Create Account</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import datastore from '../services/datastore';
import helpers from '../utils/helpers';

export default {
  name: 'CreateAccount',
  data() {
    return {
      user: {},
      error: null,
      showPasswordRecovery: false,
      successful: null
    }
  },
  methods: {
    createAccount() {
      if (!this.user.email) {
        this.error = 'Email address is required';
        return
      }

      if (!helpers.validateEmail(this.user.email)) {
        this.error = 'Not a valid email address';
        return
      }

      if (!this.user.password || !this.user.password2) {
        this.error = 'Password is required';
        return;
      }

      if (this.user.password !== this.user.password2) {
        this.error = 'Password doesn\'t match';
        return;
      }
      
      datastore.signup(this.user)
        .then(isSuccess => {
          this.error = false;
          this.showPasswordRecovery = false;
          this.$router.push('/create-account?new=true');
        }).catch(error => {
          this.error = error.message;
          if (error.code === 'auth/email-already-in-use') {
            this.showPasswordRecovery = true
          }
        });
        
    }
  },
  watch: {
    '$route.query.new': function(val){
      if(val){
         this.successful = true;
         datastore.sendEmailVerification(this.user.email)
            .then(success => {
              setTimeout(() => this.$router.push('/login'), 1000 * 10)
            })
            .catch(error => console.log(error));
      }
    }
  },
  mounted() {
    if(this.$route.query.new) {
      this.successful = true;
      datastore.sendEmailVerification(this.user.email)
        .then(success => {
          setTimeout(() => this.$router.push('/login'), 1000 * 10)
        })
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
