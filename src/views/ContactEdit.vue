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
      contact: null
    }
  },
  methods:{
    close() {
      this.$router.push({ name: 'contactlist', query: {search: this.$route.query.search} } ); 
    }
  },
  beforeCreate() {
    datastore.getContact(this.$route.params.id).then(contact => this.contact = contact);
  }
};
</script>

<style scoped lang="less">
</style>
