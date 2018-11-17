<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="less">
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body{
  background-color: #fafafa;
}

a {
  color: #2c3e50;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

</style>

<style lang="postcss">
.btn {
  @apply .px-5 .py-2 .bg-white
}

.btn-primary {
  @apply .text-teal-dark .border .border-teal-dark rounded .outline-none
}

.btn-primary:hover {
  @apply .bg-grey-lighter
}

.btn-primary[disabled] {
  @apply .bg-grey-light;
  cursor: not-allowed;
}

.btn-danger {
  @apply .text-red-dark .border .border-red-dark rounded .outline-none
}

.btn-danger:hover {
  @apply .bg-red-lighter 
}
</style>
