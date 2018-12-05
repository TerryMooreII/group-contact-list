<template>
    <div v-if="!sortBy || query.sortBy === sortBy" class="ml-1 inline-flex items-center">
      <Icon name="caret-down" v-if="query.dir === 'asc'" />
      <Icon name="caret-up" v-if="query.dir === 'desc'"/>
    </div>
</template>

<script>
export default {
  name: 'Template',
  props: {
    query: Object,
    sortBy: String,
  },
};
</script>
