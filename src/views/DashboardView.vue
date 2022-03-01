<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">邪惡寵物店 後台</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">回到前台</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"
              >後台產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders"
              >後台訂單</router-link
            >
          </li>
        </ul>
      </div>
      <button type="button" class="btn btn-primary" v-if="isLogin" @click.prevent="signout">
        登出
      </button>
    </div>
  </nav>
  <router-view v-if="isLogin"></router-view>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      isLogin: false,
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
              this.isLogin = true;
            }
          },
        ).catch((error) => {
          alert(error.data.message);
          this.$router.push('/login');
        });
      } else {
        alert('您尚未登入。');
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      alert('token 已清除');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.check();
  },
};
</script>
