<template>
  <Modal @close="$emit('close')">
    <template slot="header">
      <h2 class="self-center">{{contact.first}} {{contact.last}} {{contact.suffix}}</h2>
      <div flex justify-end>
        <button @click="$emit('close')" class="p-1 pt-2 mr-2">
        <Icon name="pencil-alt" class="h-5 w-5 text-grey-darker"/>
      </button>  
      <button @click="$emit('close')" class="p-1 pt-2">
          <Icon name="times" class="h-5 w-5 text-grey-darker"/>
        </button>
      </div>
      
    </template>
    <div class="flex flex-col ml-3">

      <div class="flex mb-8" v-if="contact.phoneNumbers.length">
          <div class="w-12">
          <Icon name="phone" flip="horizontal" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li  v-for="(n, index) in contact.phoneNumbers" :key="index" class="pb-3">
            <div class="inline-block"><a :href="'tel:' + n.number">{{n.number}}</a></div> 
            <div class="text-grey text-sm inline-block">
              <Icon name="circle" class="h-1 w-1 ml-3 mr-1  mb-px "/> 
              {{n.type}}
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.emailAddresses.length">
          <div class="w-12">
          <Icon name="envelope" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li  v-for="(n, index) in contact.emailAddresses" :key="index" class="pb-3">
            <div class="">
              <div class="inline-block"><a :href="'mailto:' + n.address">{{n.address}}</a></div> 
              <div class="text-grey text-sm inline-block">
                <Icon name="circle" class="h-1 w-1 ml-3 mr-1 mb-px"/> 
                {{n.type}}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.addresses.length">
          <div class="w-12">
          <Icon name="map-marker" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li  v-for="(n, index) in contact.addresses" :key="index" class="pb-3">
            <div class="">
              <div class="inline-block">
                 <a :href="`https://www.google.com/maps/search/?api=1&query=${n.address} ${n.city}, ${n.state} ${n.zipcode}`">{{n.address}} {{n.city}}, {{n.state}} {{n.zipcode}}</a>
                
                </div> 
              <div class="text-grey text-sm inline-block">
                <Icon name="circle" class="h-1 w-1 ml-3 mr-1 mb-px"/> 
                {{n.type}}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.birthDate">
          <div class="w-12">
          <Icon name="birthday-cake" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li class="pb-3">
            <div class="">
              <div class="inline-block">
                {{date(contact.birthDate)}} 
                <span class="text-grey text-sm"> <Icon name="circle" class="h-1 w-1 ml-3 mr-1 mb-px" />  {{ timeSince(contact.birthDate) }} y/o</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.marriages.length">
          <div class="w-12">
          <Icon name="heart" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li c v-for="(n, index) in contact.marriages" :key="index" class="pb-3">
            <div class="">
              <div class="inline-block">{{date(n.weddingDate)}}</div>  
              <div class="text-grey text-sm inline-block">
                <Icon name="circle" class="h-1 w-1 ml-3 mr-1 mb-px"/> 
                Anniversary
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script>
import moment from 'moment';
import Modal from './Modal';

export default {
  name: 'ContactViewModal',
  components: {
    Modal
  },
  props: {
    contact: Object,
  },
  methods: {
    date(d) {
      return moment(d).format('MMMM Do YYYY')
    },
    timeSince(date) {
      return moment().diff(date, 'years', false);
    }
  }
};
</script>

<style scoped lang="less">
</style>
