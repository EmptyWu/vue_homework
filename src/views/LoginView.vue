<template>
chunhsing0921@gmail.com / zuz*XHJ*zbr0uqw@dbn
  <div class="container mt-5">
    <form id="form" class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-3">
          <label for="username">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="user.username"
              required
            />
          </label>
        </div>
        <div class="mb-3">
          <label for="password">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
              required
          /></label>
        </div>
        <div class="form-floating mt-3">
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hextoken=${token}; expires=${new Date(expired)};`;
          this.$router.push('/admin/products');
        })
        .catch((error) => {
          // alert(error.data.message);
          console.log(error);
        });
    },
  },
};
</script>
