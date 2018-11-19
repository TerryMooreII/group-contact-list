<template>
  <Modal @close="$emit('close')">
    <template slot="header">
      <h2 class="self-center">Edit Contact</h2>
      <button @click="$emit('close')" class="p-1 pt-2">
        <Icon name="times" class="h-5 w-5 text-grey-lightest hover:text-grey-lighter"/>
      </button>
    </template>

    <ContactEditForm :contact="contact" />

    <template slot="footer">
      <div class="flex justify-between py-4 px-6">
        <div class="flex">
          <button type="button" class="btn btn-danger mr-4" @click="deleteContact()" >
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

import datastore from '../services/datastore';
import Modal from './Modal';
import ContactEditForm from './ContactEditForm';

export default {
  name: 'ContactEditModal',
  components: {
    Modal,
    ContactEditForm
  },
  props: {
    contact: Object,
  },
  methods: {
    deleteContact() {
      const name = `${this.contact.first ? this.contact.first : ''} ${this.contact.last ? this.contact.last : ''}`
      const response = confirm(`Are you sure you want to delete ${name}`);
      if (response) {
        datastore.deleteContact(this.contact);
        this.$emit('close');
      } else {
          return;
      }
      
    },
    save() {
      if (this.contact.id) {
        datastore.updateContact(this.contact);
        this.$emit('close');
      } else {
        datastore.addContact(this.contact);
        this.$emit('close');
      }
    }
  }
};
</script>

