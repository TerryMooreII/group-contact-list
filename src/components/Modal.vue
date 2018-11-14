<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container mt-5 sm:mt-24 mx-auto">
      <div class="header flex justify-between">
        <slot name="header" />
        <button @click="$emit('close')" class="h-5 w-5">
          <Icon name="times" />
        </button>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    msg: String,
  },
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
  width: 600px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}


.body {
  margin: 20px 0;
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
</style>
