<template>
  <ContactEditModal @close="close()" :contact="contact" v-if="contact"/>
</template>

<script>
import ContactEditModal from '../components/ContactEditModal'
import datastore from '../services/datastore';

export default {
  name: 'ContactEdit',
  components:{
    ContactEditModal
  },
  data() {
    return {
      contact: {
        group: this.$store.state.currentGroup,
        addresses: [],
        events:[],
        phoneNumbers:[],
        emailAddresses: []
      }
    }
  },
  methods:{
    close() {
      this.$router.push({ name: 'contactlist', query: {search: this.$route.query.search}, params: { group: this.$store.state.currentGroup.slug } } ); 
    }
  }
};
</script>

<style scoped lang="less">
</style>
