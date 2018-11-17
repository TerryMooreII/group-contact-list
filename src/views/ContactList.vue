<template>
  <div class="flex flex-col w-full m-3 p-3 bg-white rounded shadow">
     <div class="flex flex-row py-4 px-4 text-sm font-medium sticky pin-nav bg-white z-10">
      <div class="w-1/3 md:w-2/5 mr-6">
        Name 
      </div>
      <div class="w-1/3 md:w-2/5 truncate mr-6">
        Phone Number
      </div>
      <div class="w-1/3 md:w-2/5 truncate mr-6">
        Email
      </div>
      <div class="hidden md:block w-full truncate mr-6">
        Address
      </div>
      <div class="hidden lg:block w-2/5 truncate mr-6">
        Birthday
      </div>
      <div class="w-1/5">
        &nbsp;
      </div>
      
    </div>
    <div class="flex flex-row h-12 content-center px-4 row text-sm" v-for="c in contacts" :key="c.id" @click="openViewModal(c)">
      <div class="w-1/3 sm:w-2/5  mr-6 self-center">
        {{c.first}} {{c.last}} {{c.suffix}}
      </div>
      <div class="w-1/3 md:w-2/5 truncate mr-6 self-center">
        <a :href="'tel:' +primary(c.phoneNumbers).number">{{primary(c.phoneNumbers).number}}</a>
      </div>
      <div class="w-1/3 md:w-2/5 truncate mr-6 self-center">
        <a :href="'mailto:' + primary(c.emailAddresses).address">{{primary(c.emailAddresses).address}}</a>
      </div>
      <div class="hidden md:block w-full truncate mr-6 self-center">
        <a :href="'https://www.google.com/maps/search/?api=1&query=' + primaryAddress(c.addresses)">{{primaryAddress(c.addresses)}}</a>
      </div>
      <div class="hidden lg:block w-2/5 mr-6  truncate self-center">
        {{birthday(c.birthDate)}}
      </div>
      
      <div class="w-1/5 flex justify-end">
       <button class="mt-1 p-3 edit" @click.stop="openEditModal(c)">
          <Icon name="pencil-alt" class="text-grey-dark"/>
        </button>
      </div>
       
    </div>
     <router-view/>
  </div>
</template>

<script>
import moment from 'moment';
import datastore from '../services/datastore';

import ContactViewModal from '../components/ContactViewModal';
import ContactEditModal from '../components/ContactEditModal';


export default {
  name: 'contact-list',
  components: {
    ContactViewModal,
    ContactEditModal
  },
  data() {
    return {
      contacts: null,
      results: null,
      contact: null,
      showEditModal: false,
      showViewModal: false
    }
  },
  methods: {
    sort(a, b){
      if (a.last < b.last)
        return -1;
      if (a.last > b.last)
        return 1;
      return 0;
    },
    primary(array){
      const primary = array.find(item => item.primary);
      return primary ? primary : {};
    },
    primaryAddress(addresses){
      const a = this.primary(addresses);
      if (!a || !a.state) return null;
      return `${a.address} ${a.city}, ${a.state} ${a.zipcode}`;
    },
    birthday(date) {
      if (!date){
        return;
      }
      return moment(date).format('MMMM Do')
    },
    openEditModal(contact){
      this.$router.push({ name: 'contactedit', query: {search: this.$route.query.search}, params: { group: this.$route.params.group, id: contact.id } } ); 
    },
    openViewModal(contact){
      this.$router.push({ name: 'contactview',  query: {search: this.$route.query.search}, params: { group: this.$route.params.group, id: contact.id } } ); 
    },
    query(search) {
      if (!search){
        this.contacts = this.results;
        return;
      }  
      this.contacts = this.results.filter(contact => contact.first.toLowerCase().includes(search) || contact.last.toLowerCase().includes(search));
    }
  },
  watch: {
    '$route.query.search': function (val) {
      const search = !val ? val : val.toLowerCase();
      this.query(search);
    }
  },
  mounted() {
    datastore.getContactList().then(contacts => { 
      this.results = contacts.sort(this.sort);
      this.query()
    });

  }
};
</script>

<style lang="less" scoped>

</style>


<style lang="postcss" scoped>
.row {
   @apply .border-t .border-b .border-grey-lighter
}
.row:hover {
  @apply .bg-grey-lighter .border-t .border-b .border-grey-light cursor-pointer;
}
.edit {
  display: none;
}
.row:hover .edit {
  display: block;
}

.pin-nav {
  top: 68px
}

</style>