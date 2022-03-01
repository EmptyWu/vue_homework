<template>

  <div class="container mt-5">
    <form id="form" class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="username" class="sr-only">
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
        <div class="mb-3" >
          <label for="password" class="sr-only">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
              required
          /></label>
        </div>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
    <p class="row justify-content-center">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

 <style lang="scss">
// html,
// body {
//   height: 100%;
//   text-align: center;
// }

// body {
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .form-signin {
//   width: 100%;
//   max-width: 330px;
//   padding: 15px;
//   margin: auto;
// }
.sr-only{
  width: 100%;
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
