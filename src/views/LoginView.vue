<template>
  <div class="container mt-5">
    <Loading :active="isLoading"></Loading>
    <form id="form" class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="username" class="sr-only">Email address</label>
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="user.username"
              required
            />
        </div>
        <div class="mb-3" >
          <label for="password" class="sr-only">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
              required
          />
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
    <p class="row justify-content-center">&copy; 2022~∞ - 六角學院</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      this.isLoading = true;
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hextoken=${token}; expires=${new Date(expired)};`;
          this.$router.push('/admin/products');
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '登入');
        });
    },
  },
};
</script>
