<template>
  <ContactViewModal @close="close()" :contact="contact" v-if="contact"/>
</template>

<script>
import ContactViewModal from '../components/ContactViewModal'
import datastore from '../services/datastore';

export default {
  name: 'Template',
  components:{
    ContactViewModal
  },
  data() {
    return {
      contact: null
    }
  },
  methods:{
    close() {
      this.$router.push({ name: 'contactlist', query: {search: this.$route.query.search}, params: { group: this.$route.params.group } } ); 
    }
  },
  beforeCreate() {
    datastore.getContact(this.$route.params.id).then(contact => this.contact = contact);
  }
};
</script>

<style scoped lang="less">
</style>
