<template>
 <NavBar />
  <Toast></Toast>
  <router-view v-if="isLogin"></router-view>
</template>

<script>
import emitter from '@/libs/emitter';
import NavBar from '@/components/AdminComponents/AdminNavbarView.vue';
import Toast from '@/components/AdminComponents/ToastModalView.vue';

export default {
  name: 'DashboardView',
  data() {
    return {
      isLogin: false,
    };
  },
  components: { NavBar, Toast },
  provide() {
    return {
      emitter,
    };
  },
  methods: {
    check() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/,
        '$1',
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`).then(
          (res) => {
            if (res.data.success) {
              this.$httpMessageState(res, '登入');
              this.isLogin = true;
            } else {
              this.$router.push('/login');
            }
          },
        ).catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
          this.$router.push('/login');
        });
      } else {
        this.$httpMessageState('您尚未登入。', '錯誤訊息');
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    this.check();
  },
};
</script>
