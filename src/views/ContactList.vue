<template>
  <div class="flex flex-col w-full m-0 sm:m-3 p-3 bg-white rounded shadow">
     <div class="flex flex-row py-4 px-4 text-sm font-medium md:sticky pin-nav bg-white z-auto sm:z-10">
      <div class="w-full md:w-full mr-6 hover:underline cursor-pointer flex items-center">
        <div class="inline-flex items-center" @click="sort('name')">
          <span class="hover:underline cursor-pointer">Name</span> 
          <SortIcon :query="$route.query" sortBy="name" />
        </div> 
      </div>
      <div class="hidden md:block md:w-2/5 truncate mr-6">
        Phone Number
      </div>
      <div class="hidden md:block sm:w-3/5 truncate mr-6">
        Email
      </div>
      <div class="hidden lg:block w-full truncate mr-6">
        Address
      </div>
      <div class="hidden xl:block w-2/5 truncate mr-6 ">
        <div class="inline-flex items-center"  @click="sort('birthDate')">
          <span class="hover:underline cursor-pointer">Birthday</span>
          <SortIcon :query="$route.query" sortBy="birthDate" />
        </div> 
      </div>
      <div class="w-1/5">
        &nbsp;
      </div>
      
    </div>
    <div class="flex flex-row h-16 content-center px-4 row text-sm" v-for="c in contacts" :key="c.id" @click="openViewModal(c)">
      <div class="w-full sm:w-full mr-6 self-center">
       <ProfilePic :contact="c" /> {{c.first}} {{c.last}} {{c.suffix}}
      </div>
      <div class="hidden md:block md:w-2/5 truncate mr-6 self-center">
        <a :href="'tel:' +primary(c.phoneNumbers).number">{{primary(c.phoneNumbers).number}}</a>
      </div>
      <div class="hidden md:block md:w-3/5 truncate mr-6 self-center">
        <a :href="'mailto:' + primary(c.emailAddresses).address">{{primary(c.emailAddresses).address}}</a>
      </div>
      <div class="hidden lg:block w-full truncate mr-6 self-center">
        <a :href="'https://www.google.com/maps/search/?api=1&query=' + primaryAddress(c.addresses)">{{primaryAddress(c.addresses)}}</a>
      </div>
      <div class="hidden xl:block w-2/5 mr-6  truncate self-center">
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
import Eventbus from '../services/eventbus';
import ProfilePic from '../components/ProfilePic';
import ContactViewModal from '../components/ContactViewModal';
import ContactEditModal from '../components/ContactEditModal';
import SortIcon from '../components/SortIcon';


export default {
  name: 'contact-list',
  components: {
    ContactViewModal,
    ContactEditModal,
    SortIcon,
    ProfilePic
  },
  data() {
    return {
      contacts: null,
      results: null,
      contact: null
    }
  },
  methods: {
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
      if (!date) {
        return;
      }
      return moment(date).format('MMMM Do')
    },
    openEditModal(contact){
      this.$router.push({ name: 'contactedit', query: {search: this.$route.query.search}, params: { group: this.$store.state.currentGroup.slug, id: contact.id } } ); 
    },
    openViewModal(contact){
      this.$router.push({ name: 'contactview',  query: {search: this.$route.query.search}, params: { group: this.$store.state.currentGroup.slug, id: contact.id } } ); 
    },
    sort(sortBy) {
      const dir = this.$route.query.dir === 'asc' ? 'desc' : 'asc';
      const query = Object.assign({}, this.$route.query, { sortBy, dir });
      this.$router.push({ 
        name: 'contactlist', 
        query: { search: this.$route.query.search}, params: { group: this.$store.state.currentGroup.slug }, query } ); 
    },
    filter(search) {
      if (!search) {
        this.contacts = this.results;
        return;
      }  
      this.contacts = this.results.filter(contact => contact.first.toLowerCase().includes(search) || contact.last.toLowerCase().includes(search));
    },
    query({ search, sortBy, dir }) {
      datastore.getContactList(this.$store.state.currentGroup.slug, sortBy, dir)
        .then(contacts => { 
          Eventbus.$on('contacts', contacts => {
            this.results = contacts; 
            this.filter(search);
          });
          this.results = contacts;
          this.filter(search);
        });
    }
  },
  watch: {
    '$route.query': function ( query, oldQuery ) {
      const { sortBy, dir } = query;
      const search = !query.search ? query.search : query.search.toLowerCase();
      if (sortBy !== oldQuery.sortBy || dir !== oldQuery.dir || search !== oldQuery.search)
        this.query({ search, sortBy, dir });
    }
  },
  mounted() {
    this.query(this.$route.query);
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
