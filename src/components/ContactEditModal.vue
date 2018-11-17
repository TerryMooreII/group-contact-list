<template>
  <Modal @close="$emit('close')">
    <template slot="header">
      <h2 class="self-center">Edit Contact</h2>
      <button @click="$emit('close')" class="p-1 pt-2">
        <Icon name="times" class="h-5 w-5 text-grey-lightest hover:text-grey-lighter"/>
      </button>
    </template>

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
            <input type="text" class="input w-auto" v-model="n.label" placeholder="Label" :click="() => show = true">
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

              <input type="text" class="input w-auto" v-model="n.label" placeholder="Label" :click="() => show = true">
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

      <div class="flex mb-8">
        <div class="w-10 flex justify-center pt-2">
          <Icon name="calendar-alt" class="text-grey-dark"/>
        </div>
        <ul class="list-reset w-full">
          <li  v-for="(n, index) in contact.events" :key="index" class="flex data-row">
              <vue-pikaday class="input w-full"
                v-model="n.date" 
                :options="pikadayOptions" 
                placeholder="Event"
              />
              <input type="text" class="input w-2/5" v-model="n.label" placeholder="Label" :click="() => show = true">        
              <AddRemove :array="contact.emailAddresses" :index="index" />
          </li>
        </ul>
      </div>
    </div>

    <template slot="footer">
      <div class="flex justify-between py-4 px-6">
        <div class="flex">
          <button type="button" class="btn btn-danger mr-4" @click="$emit('close')">
            Delete
          </button>
        </div>
        <div class="flex">
          <button type="button" class="btn btn-primary mr-4" @click="$emit('close')">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="save()" :disabled="!contact.first">
            Save
          </button>
        </div>
        </div>
      </template>
  </Modal>
</template>

<script>
import moment from 'moment';
import datastore from '../services/datastore';
import Modal from './Modal';
import SuggestionBox from './SuggestionBox';
import AddRemove from './AddRemove'

export default {
  name: 'ContactViewModal',
  components: {
    Modal,
    SuggestionBox,
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
    sanitize(){
      Object.keys(this.contact).forEach(value => {
        console.log(value)
        if (Array.isArray(this.contact[value])) {
          if (this.contact[value].length > 0 && Object.keys(this.contact[value][0]).length === 0) {
            this.contact[value] = [];
          }
        }
        if (this.contact[value] === null) {
          this.contact[value] = ''
        }
      })
    },
    save() {
      this.sanitize();
      console.log(this.contact);
      if (this.contact.id) {
        datastore.updateContact(this.contact);
        this.$emit('close');
      } else {
        datastore.addContact(this.contact);
        this.$emit('close');
      }
    }
  },
  mounted(){
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
    }
};
</script>

<style lang="postcss">
  .input {
    @apply .border-b .border-grey-light .mt-2 .mx-3 .outline-none .mb-3
  }
  
  .checkbox {
    @apply .mr-2
  }
  
  input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      @apply .text-grey;
      opacity: 1; /* Firefox */
  }

 

  
  
  /* .suggestion-box {
    display: none;
  }

  .input:focus + .suggestion-box {
    display: block
  }
  .suggestion-box {
    display: block !important
  } */
</style>

