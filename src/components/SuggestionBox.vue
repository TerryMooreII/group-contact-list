<template>
  <div :class="$attrs.class" class="relative">
    <input type="text" class="input" :value="value" @input="$emit('input', $event.target.value)" :placeholder="$attrs.placeholder" @click.stop="() => show = true">
    <div class="w-full absolute suggestion-box shadow-md rounded bg-white border border-grey-lighter bg-white mt-2 ml-2" v-if="show">
      <ul class="list-reset py-2">
        <li v-for="item in filter" :key="item" @click.stop="select(item)" class="px-2 py-2 hover:bg-grey-lighter">{{item}}</li>
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
    select(item){
      this.$emit('input', item)
      this.close();
    },
    close(){
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
    top: 20px;
    z-index: 10000;
  }
  
</style>
