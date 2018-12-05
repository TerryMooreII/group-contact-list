<template>
  <div :class="$attrs.class">
    <input ref="Suggestions" type="text" class="input" :value="value" @input="$emit('input', $event.target.value)" :placeholder="$attrs.placeholder" @click.stop="open">
    <div class="w-full fixed suggestion-box shadow-md rounded bg-white border border-grey-lighter bg-white mt-2 ml-2" v-if="show" ref="list">
      <ul class="list-reset py-2">
        <li v-for="item in filter" :key="item" @click.stop="select(item)" class="px-2 py-2 hover:bg-grey-lighter cursor-pointer">{{item}}</li>
      </ul>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'SuggestionBox',
  props: {
    suggestions: Array,
    value: String
  },
  data() {
    return {
      show: false
    };
  },
  computed:{
    filter(){
      if (!this.value){
        return this.suggestions;
      }
      const filtered = this.suggestions.filter(item => item.toLowerCase().startsWith(this.value.toLowerCase()));
      if(filtered.length === 0 || this.value.length === 0){
        this.show = false;
      }
      return filtered;
    }
  },
  methods: {
    open() {
      this.top = this.$refs.Suggestions.getBoundingClientRect().top + 12;
      this.show = true;
      setTimeout(() => {
        this.$refs.list.style.top = this.top + 'px';
        this.$refs.list.style.visibility = 'visible';
      }, 0);

    },
    select(item){
      this.$emit('input', item)
      this.close();
    },
    close (){
      this.show = false;
    }
  },
  mounted() {
    window.addEventListener('click', this.close, false);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close, false);
  }
};
</script>

<style scoped lang="less">
  .suggestion-box {
    visibility: hidden;
    width:200px;
    z-index: 10000;
  }
  
</style>
