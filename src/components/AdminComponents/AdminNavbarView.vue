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
            <router-link class="nav-link" to="/admin/products">後台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">後台訂單</router-link>
          </li>
           <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/article">貼文</router-link>
          </li>
        </ul>
      </div>
      <button type="button" class="btn btn-primary" @click.prevent="signout">
        登出
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signout() {
      this.$http.post(`${process.env.VUE_APP_API}/logout`)
        .then((response) => {
          this.$httpMessageState(response, '登出');
          if (response.data.success) {
            this.$router.push('/login');
          }
        }).catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
  },
};
</script>
