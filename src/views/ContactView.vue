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
  watch: {
    '$route.params.id': function (val) {
      this.getContact(); 
    }
  },
  methods:{
    close() {
      this.$router.push({ name: 'contactlist', query: {search: this.$route.query.search}, params: { group: this.$store.state.currentGroup.slug } } ); 
    },
    getContact() {
      datastore.getContact(this.$route.params.id).then(contact => this.contact = contact);
    }
  },
  mounted() {
    this.getContact();
  }
};
</script>

<style scoped lang="less">
</style>
