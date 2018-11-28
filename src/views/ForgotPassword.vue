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
        <div v-if="error" class="text-red py-4">
          {{error}}
        </div>
        <div class="text-green-dark" v-if="success">
          A password reset link has been sent to {{email}}.
        </div>
        <div class="flex justify-end mt-8">
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
import helpers from '../utils/helpers';

export default {
  name: 'Login',
  data() {
    return {
      user: {},
      error: false,
      success: false,
      email: null
    }
  },
  methods: {
    reset() {
      if (!this.user.email) {
        this.error = 'Email address is required';
        return
      }

      if (!helpers.validateEmail(this.user.email)) {
        this.error = 'Not a valid email address';
        return
      }

      this.error = false;
      datastore.sendPasswordResetEmail(this.user.email)
        .then(success => {
          this.success = true;
          this.email = this.user.email;
          setTimeout(() => this.$router.push('/login'), 1000 * 30);
        })
        .catch(error => {
          this.email = this.user.email;
          this.success = true;
          setTimeout(() => this.$router.push('/login'), 1000 * 30);
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
