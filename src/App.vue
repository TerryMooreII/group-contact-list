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

.btn-link {
  color: #2c3e50;
  text-decoration: none;
  border: none;
}
.btn-link:hover {
  text-decoration: underline;
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

.input {
  @apply .border-b .border-grey-light .mt-2 .mx-3 .outline-none .mb-3
}

.checkbox {
  @apply .mr-2
}

input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  @apply .text-grey;
  opacity: 1; /* Firefox */
}
</style>
