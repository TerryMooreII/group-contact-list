<template>
  <div class="flex flex-col text-sm">

      <div class="flex mb-8 ">
        <div class="w-10 flex justify-center pt-2">
          <Icon name="user" flip="horizontal" class="text-grey-dark"/>
        </div>
        <div class="flex flex-col flex-grow">
            <input type="text" class="input w-1/6" v-model="contact.prefix" placeholder="Prefix" />
            <input type="text" class="input flex-grow" v-model="contact.first" placeholder="First Name" />
            <input type="text" class="input flex-grow" v-model="contact.middle" placeholder="Middle Name" />
            <input type="text" class="input flex-grow" v-model="contact.last" placeholder="Last Name" />
            <input type="text" class="input w-1/6" v-model="contact.suffix" placeholder="Suffix" /> 
        </div>
        <div class="w-10 flex justify-center pt-2"></div>
      </div>

      <div v-for="(a, index) in contact.addresses" :key="index">
        <div class="flex mb-8">
          <div class="w-10 flex justify-center pt-2">
            <Icon name="map-marker" flip="horizontal" class="text-grey-dark"/>
          </div>
          <div class="flex flex-col flex-grow data-row">
              <input type="text" class="input" v-model="a.address" placeholder="Address" />
              <input type="text" class="input flex-grow" v-model="a.address2" placeholder="Address Line 2" />
              <input type="text" class="input flex-grow" v-model="a.city" placeholder="City" />
              <div class="flex flex-grow">
                <input type="text" class="input w-1/2" v-model="a.state" placeholder="State" />
                <input type="text" class="input w-1/2" v-model="a.zipcode" placeholder="Zipcode" />
              </div>
          </div>
          <AddRemove :array="contact.addresses" :index="index" />
        </div>
      </div>
      
      <div class="flex mb-8">
        <div class="w-10 flex justify-center pt-2">
          <Icon name="phone" flip="horizontal" class="text-grey-dark"/>
        </div>
        <ul class="list-reset w-full">
          <li  v-for="(n, index) in contact.phoneNumbers" :key="index" class="flex data-row">
            <input type="text" class="input w-3/5" v-model="n.number" placeholder="Phone Number" />
            <SuggestionBox class="w-auto" placeholder="Label" v-model="n.label" :suggestions="['Home','Cell', 'Work']" />
            <label class="flex w-1/5 self-center">
              <input type="checkbox" class="checkbox" v-model="n.primary" @click="makePrimary(contact.phoneNumbers, index)" />
              Primary
            </label>
            <AddRemove :array="contact.phoneNumbers" :index="index" />
          </li>
        </ul>
      </div>

      <div class="flex mb-8">
        <div class="w-10 flex justify-center pt-2">
          <Icon name="envelope" flip="horizontal" class="text-grey-dark"/>
        </div>
        <ul class="list-reset w-full">
          <li  v-for="(n, index) in contact.emailAddresses" :key="index" class="flex data-row">
              <input type="text" class="input w-3/5" v-model="n.address" placeholder="Email Address" />
              <SuggestionBox class="w-auto" placeholder="Label" v-model="n.label" :suggestions="['Personal','Work', 'Other']" />
              <label class="flex w-1/5 self-center">
                <input type="checkbox" class="checkbox" v-model="n.primary" @click="makePrimary(contact.emailAddresses, index)" />
                Primary
              </label>
              <AddRemove :array="contact.emailAddresses" :index="index" />
            
          </li>
        </ul>
      </div>

      <div class="flex mb-8">
        <div class="w-10 flex justify-center pt-2">
          <Icon name="birthday-cake" class="text-grey-dark"/>
        </div>
        <ul class="list-reset w-full">
          <li class="flex data-row">
               <vue-pikaday class="input w-full"
                v-model="contact.birthDate" 
                :options="pikadayOptions" 
                placeholder="Birthday"
              />
              <div class="w-10 flex justify-center pt-2"></div>      
          </li>
        </ul>
      </div>

      <div class="flex mb-8 relative">
        <div class="w-10 flex justify-center pt-2">
          <Icon name="users" class="text-grey-dark"/>
        </div>
        <ul class="list-reset w-full">
          <li  v-for="(n, index) in contact.relatives" :key="index" class="flex data-row">
              <ContactAutocomplete class="w-3/5 mr-8" v-model="n.relative" />
              <SuggestionBox class="w-full" placeholder="Label" v-model="n.label" :suggestions="['Husband', 'Wife', 'Child', 'Mother', 'Father', 'Grandchild']" />
              <AddRemove :array="contact.relatives" :index="index" />
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import moment from 'moment';
import SuggestionBox from './SuggestionBox';
import ContactAutocomplete from './ContactAutocomplete';
import AddRemove from './AddRemove'
import datastore from '../services/datastore';

export default {
  name: 'ContactEditForm',
   components: {
    SuggestionBox,
    ContactAutocomplete,
    AddRemove
  },
  props: {
    contact: Object,
  },
  data() {
    return {
      now: new Date(),
      show:false,
      pikadayOptions: {
        format: 'MMMM Do YYYY',
        yearRange: [1900, new Date().getFullYear()]
      }
    };
  },
  methods: {
    makePrimary(array, index) {
      array.forEach((item, i) => i=== index ? item.primary = true : item.primary = false);
    },
    add(array){
      array.push({});
    },
  },
  mounted() {
      if (this.contact.phoneNumbers.length === 0) {
        this.add(this.contact.phoneNumbers);
      }
      if (this.contact.emailAddresses.length === 0) {
        this.add(this.contact.emailAddresses);
      }
      if (this.contact.addresses.length === 0) {
        this.add(this.contact.addresses);
      }
      if (this.contact.events.length === 0) {
        this.add(this.contact.events);
      }
      if (this.contact.relatives.length === 0) {
        this.add(this.contact.relatives);
      }
    }
};
</script>

<style scoped lang="less">
</style>
