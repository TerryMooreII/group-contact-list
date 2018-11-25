<template>
   <div class="w-12 flex justify-end items-end pb-4">
    <button type="button" class="btn-icon" @click="remove(array, index)">
      <Icon name="times" class="delete" />
    </button>
    <button type="button" @click="add(array)" :class="{invisible: !isLast(array, index), 'btn-icon': true}">
      <Icon name="plus" class="add icon" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Template',
  props: {
    array: Array,
    index: Number
  },
  methods:{
     add(array){
      array.push({ });
    },
    remove(array, index){
      array.splice(index, 1);
    },
    isLast(array, index){
      return index === array.length - 1;
    },
  }
};
</script>

<style lang="less">

</style>


<style lang="postcss" >
.btn-icon {
  @apply .outline-none .h-3 .w-3 px-4
}
.add {
  @apply .text-blue .h-3 .w-3
}
.delete {
  @apply .text-red-dark .h-3 .w-3 .invisible
}

.data-row:hover .delete  {
  @apply .visible
} 

.data-row:hover + div .delete  {
  @apply .visible
} 
</style>
