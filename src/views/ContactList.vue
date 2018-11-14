<template>
  <div class="flex flex-col w-full mx-3">
     <div class="flex flex-row py-3 px-3 text-sm font-medium">
      <div class="w-1/3 sm:w-1/5 md:w-2/5 mr-6">
        Name 
      </div>
      <div class="w-1/3 md:w-1/6 truncate mr-6">
        Phone Number
      </div>
      <div class="w-1/3 md:w-1/6 truncate mr-6">
        Email
      </div>
      <div class="hidden md:block w-1/3 truncate mr-6">
        Address
      </div>
      <div class="hidden lg:block w-1/6 truncate">
        Birthday
      </div>
      <!-- <div class="">
        {{}}
      </div>
       -->
    </div>
    <div class="flex flex-row py-3 px-3 row text-sm" v-for="c in contacts" :key="c.id" @click="openModal(c)">
      <div class="w-1/3 sm:w-1/5 md:w-2/5 mr-6">
        {{c.first}} {{c.last}}
      </div>
      <div class="w-1/3 md:w-1/6 truncate mr-6">
        <a :href="'tel:' +primary(c.phoneNumbers).number">{{primary(c.phoneNumbers).number}}</a>
      </div>
      <div class="w-1/3 md:w-1/6 truncate mr-6">
        <a :href="'mailto:' + primary(c.emailAddresses).address">{{primary(c.emailAddresses).address}}</a>
      </div>
      <div class="hidden md:block w-1/3 truncate mr-6">
        <a :href="'https://www.google.com/maps/search/?api=1&query=' + primaryAddress(c.addresses)">{{primaryAddress(c.addresses)}}</a>
      </div>
      <div class="hidden lg:block w-1/6 truncate">
        {{birthday(c.birthDate)}}
      </div>
      <!-- <div class="">
        {{}}
      </div>
       -->
    </div>
    <ContactViewModal v-if="showModal" @close="closeModal()" :contact="contact"/>
  </div>
</template>

<script>
import moment from 'moment';
import datastore from '../services/datastore';

import ContactViewModal from '../components/ContactViewModal';

export default {
  name: 'contact-list',
  components: {
    ContactViewModal
  },
  data() {
    return {
      contacts: null,
      contact: null,
      showModal: false
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
      const d = new Date(date.toDate());
      return moment(d).format('MMMM Do')
    },
    openModal(contact){
      this.contact = contact;
      this.showModal = true
    },
    closeModal(contact){
      this.contact = null;
      this.showModal = false;
    },
  },
  mounted() {
    datastore.getContactList().then(contacts => this.contacts = contacts.sort(this.sort));
  }
};
</script>

<style lang="postcss" scoped>
.row {
   @apply .border-t .border-b .border-grey-lighter
}
.row:hover {
  @apply .bg-grey-lighter .border-t .border-b .border-grey-light cursor-pointer;
}

</style>
