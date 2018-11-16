<template>
  <div id="app">
    <div id="nav m-32">
      <router-link to="/">Home</router-link> |
      <router-link to="/new">New</router-link>
    </div>
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
    @apply .text-blue-dark .border .border-blue-dark rounded .outline-none
  }
  .btn-primary:hover {
    @apply .bg-grey-lighter
  }
</style>
