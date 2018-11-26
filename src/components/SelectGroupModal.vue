<template>
  <Modal @close="$emit('close')">
    <template slot="header">
      <h2 class="self-center">Select Group Contact List</h2>
    </template>

    <div>
      <h2 class="text-base text-grey-darkest mb-4">
        Your Email Address is associated with the following Contact Lists.
      </h2>
      <h3 class="text-xs text-grey-darkest my-2">
        Please select the Group Contact List to open:
      </h3>
      <ul class="list-reset text-lg">
        <li v-for="group of lists" :key="group" class="my-2">
          <button class="btn-link" @click="setGroup(group)">{{group}}</button>
        </li>
      </ul>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal';

export default {
  name: 'SelectGroupModal',
  components: {
    Modal
  },
  data() {
    return {
      lists: []
    };
  },
  methods: {
    setGroup(group) {
      this.$store.dispatch('setCurrentGroup', group);
      this.$router.push({name: 'contactlist', params:{group}})
    }
  },
  mounted() {
    this.lists = this.$store.state.groups;
  }
};
</script>

