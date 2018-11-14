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

a {
  color: #2c3e50;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

</style>
