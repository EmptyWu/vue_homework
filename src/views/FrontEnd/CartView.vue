<template>
  <div class="container">
    <h2>購物車</h2>
    <div class="mt-4 row">
      <!-- 購物車列表 -->
      <div class="col-sm-12 col-lg-6 pe-3">
        <div class="text-end">
          <button class="btn btn-outline-danger" type="button"
          :disabled="cartData.carts?.length===0" @click="cleanCart('')">
            清空購物車
          </button>
        </div>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量/單位</th>
              <th class="d-flex justify-content-end">單價</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cartData.carts">
              <tr v-for="cart in cartData.carts" :key="cart.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="cleanCart(cart.id)"
                  >
                    <font-awesome-icon
                      icon="spinner"
                      pulse
                      v-if="loadingFlag === cart.id"
                    />
                    x
                  </button>
                </td>
                <td>
                  {{ cart.product.title }}
                  <div class="text-success">已套用優惠券</div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <div class="input-group mb-3">
                      <!-- <input v-model.number='cart.qty'
                 min='1' type='number' class='form-control'> -->
                      <select v-model.number="cart.qty" class="form-select">
                        <option
                          v-for="num in 20"
                          :key="num + cart.id"
                          :value="num"
                          :selected="cart.qty === num"
                        >
                          {{ num }}
                        </option>
                      </select>
                      <span
                        class="input-group-text"
                        id="basic-addon2"
                        >{{
                      }}</span>
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <small class="text-success">折扣價：</small>
                  {{ cart.final_total }}
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ cartData.total }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ cartData.final_total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <!-- 購物車列表 -->
    </div>
  </div>
</template>

<script>
// import emitter from '@/libs/emitter';

export default {
  data() {
    return {
      cartData: { carts: [] },
      loadingFlag: '',
      isLoading: false,
    };
  },
  methods: {
    showCarts() {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    closeLoadingFlag(id) {
      this.loadingFlag = id;
      this.isLoading = id !== '';
    },
    cleanCart(id = '') {
      let delCartUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      if (id !== '') {
        this.closeLoadingFlag(id);
        delCartUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      }
      this.$http
        .delete(delCartUrl)
        .then((res) => {
          alert(res.data.message);
          this.showCarts();
          this.closeLoadingFlag('');
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
  },
  mounted() {
    this.load = this.$loading;
    this.showCarts();
  },
};
</script>
