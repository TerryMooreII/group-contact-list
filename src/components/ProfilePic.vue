<template>
  <div class="rounded-full h-8 w-8 pt-px uppercase inline-flex text-white text-lg justify-center items-center mr-3" :class="bg">
    {{firstInitial}}
  </div>
</template>

<script>
export default {
  name: 'ProfilePic',
  props: {
    contact: Object
  },
  computed:{
    firstInitial() {
      if (!this.contact) return;
      return this.contact.first[0];
    },
    bg() {
      const colors = ['red', 'green', 'blue-darkest', 'blue', 'orange', 'grey-darkest'];
      return `bg-${colors[Math.floor(Math.random() * colors.length)]}`;
    }
  }
};
</script>

<style scoped lang="less">
</style>
