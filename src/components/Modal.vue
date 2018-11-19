<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container mt-5 sm:mt-24 mx-auto rounded">
      <div class="header flex justify-between border-b border-grey-light py-4 px-6 text-white bg-teal rounded">
        <slot name="header" />
      </div>
      <div class="body p-6 overflow-auto">
        <slot />
      </div>
      <div class="footer border-t border-grey-light">
        <slot name="footer" />
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  beforeCreate() {
    document.body.classList.add('overflow-hidden')
  },
  beforeDestroy() {
    document.body.classList.remove('overflow-hidden')
  }
};
</script>
<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}


.modal-container {
  width: calc(100vw / 2);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.body {
  padding: 20px 20px 20px 40px;
  max-height: calc(100vh / 2);
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 992px) { 
  .modal-container {
    margin: 0;
    height: 100vh;
    width: 100vw;
    border-radius: 0;
  }
  .body {
    padding: 5px 20px;
    max-height: 100%;
    padding-bottom: 140px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
  }
}


// screens: {
//   'sm': '576px',
//   // => 
//   'md': '768px',
//   // => @media (min-width: 768px) { ... }

</style>
