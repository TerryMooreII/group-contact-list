<template>
  <div class="w-full absolute suggestion-box shadow-md rounded bg-white z-100 border border-grey-lighter">
    <ul class="list-reset py-2">
      <li v-for="item in filter" :key="item" @click="$emit('set', item)" class="px-2 py-2 hover:bg-grey-lighter">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SuggestionBox',
  props: {
    suggestions: Array,
    search: String
  },
  computed:{
    filter(){
      if (!this.search){
        return this.suggestions;
      }
      return this.suggestions.filter(item => item.toLowerCase().startsWith(this.search.toLowerCase()));
    }
  }
};
</script>

<style scoped lang="less">
  .suggestion-box {
    top: 20px;
  }
</style>
