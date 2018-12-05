<template>
  <div :class="$attrs.class">
    <input ref="ContactInput" type="text" class="input w-full" :value="displayName()" @input="$emit('input', $event.target.value)" :placeholder="$attrs.placeholder" @click.stop="open">
    <div class="w-full fixed shadow-md rounded bg-white border border-grey-lighter bg-white mt-2 ml-2 suggestion-box" v-if="show" ref="list">
      <ul class="list-reset py-2 list">
        <li v-for="item in filter" :key="item.id" @click.stop="select(item)" class="px-2 py-2 hover:bg-grey-lighter cursor-pointer">{{item.displayName}}</li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import datastore from '../services/datastore';

export default {
  name: 'ContactAutocomplete',
  props: {
    value: {
      type: [Object, String],
      default: ''
    }
  },
  data() {
    return {
      contacts: [],
      show: false,
      top: 0
    };
  },
  computed:{
    filter(){
      const filtered = this.contacts.filter(item => item.displayName.toLowerCase().includes(this.displayName().toLowerCase()));
      return filtered;
    }
  },
  methods: {
     displayName() {
      if (typeof this.value === 'object'){
        return this.value.displayName;
      }else{
        return this.value;
      }
    },
    select(item){
      this.$emit('input', item)
      this.close();
    },
    open() {
      this.top = this.$refs.ContactInput.getBoundingClientRect().top + 12;
      this.show = true;
      setTimeout(() => {this.$refs.list.style.top = this.top + 'px'}, 1);

    },
    close (){
      this.show = false;
    }
  },
  async mounted() {
    window.addEventListener('click', this.close, false);
    const response = await datastore.getContactList(this.$store.state.currentGroup.slug);
    this.contacts = response.map(c => ({
      displayName: `${c.first} ${c.last}${c.suffix ? ' ' + c.suffix : ''}`,
      id: c.id
    }));
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close, false);
  }
};
</script>

<style scoped lang="less">
  .suggestion-box {
    z-index: 10000;
    width: 250px;
  }
  .list {
    max-height: 150px;
    overflow: auto;
  }
  
</style>
