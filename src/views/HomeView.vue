<template>
   <NavBar />
   <Toast></Toast>
  <router-view></router-view>
</template>

<script>
import emitter from '@/libs/emitter';
import NavBar from '@/components/NavbarView.vue';
import Toast from '@/components/AdminComponents/ToastModalView.vue';

export default {
  components: { NavBar, Toast },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
