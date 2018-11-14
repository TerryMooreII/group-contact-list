<template>
  <Modal @close="$emit('close')">
    <template slot="header">
      <h1>{{contact.first}} {{contact.last}}</h1>
      
    </template>
    <div class="flex flex-col">

      <div class="flex mb-8" v-if="contact.phoneNumbers.length">
          <div class="w-10">
          <Icon name="phone" flip="horizontal" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li  v-for="(n, index) in contact.phoneNumbers" :key="index" class="pb-3">
            <div class="inline-block">{{n.number}}</div> 
            <div class="text-grey text-sm inline-block">
              <Icon name="circle" class="h-1 w-1 ml-3 mr-1  mb-px "/> 
              {{n.type}}
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.emailAddresses.length">
          <div class="w-10">
          <Icon name="envelope" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li  v-for="(n, index) in contact.emailAddresses" :key="index" class="pb-3">
            <div class="">
              <div class="inline-block">{{n.address}}</div> 
              <div class="text-grey text-sm inline-block">
                <Icon name="circle" class="h-1 w-1 ml-3 mr-1 mb-px"/> 
                {{n.type}}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.addresses.length">
          <div class="w-10">
          <Icon name="map-marker" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li  v-for="(n, index) in contact.addresses" :key="index" class="pb-3">
            <div class="">
              <div class="inline-block">{{n.address}} {{n.city}}, {{n.state}} {{n.zipcode}} </div> 
              <div class="text-grey text-sm inline-block">
                <Icon name="circle" class="h-1 w-1 ml-3 mr-1 mb-px"/> 
                {{n.type}}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.birthDate">
          <div class="w-10">
          <Icon name="birthday-cake" class="text-grey-dark"/>
        </div>
        <ul class="list-reset">
          <li class="pb-3">
            <div class="">
              <div class="inline-block">{{date(contact.birthDate)}}</div> 
            </div>
          </li>
        </ul>
      </div>

      <div class="flex mb-8" v-if="contact.marriages.length">
          <div class="w-10">
          <Icon name="calendar-alt" class="text-grey-dark"/>
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
    date(date) {
      const d = new Date(date.toDate());
      return moment(d).format('MMMM Do YYYY')
    }
  }
};
</script>

<style scoped lang="less">
</style>
