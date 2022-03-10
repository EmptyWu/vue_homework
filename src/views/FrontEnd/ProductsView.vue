<template>
  <div class="container">
    <h2>產品列表</h2>
    <!-- row 決定內層的數量 -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      <!-- 內層不定義寬度 -->
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
            <img :src="product.imageUrl" class="card-img-top obj-cover obj-position-bottom"
            style="height:200px"  alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">
              {{ product.description }}
            </p>
          </div>
          <div class="card-footer text-muted text-center">
            <button
                type="button"
                class="btn btn-primary"
                :disabled="loadingFlag===product.id"
                @click="showMore(product.id)"
              >
              <font-awesome-icon icon="spinner" pulse  v-if="loadingFlag===product.id"/>
                查看更多
              </button>
            <button class="btn btn-danger ms-3" @click="updateCart('add',product.id)">
              <font-awesome-icon icon="spinner" pulse  v-if="loadingFlag===product.id"/>
              加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <UserProductModal
     ref="userProductModal" :id="productId" @loading-flag="closeLoadingFlag"
     @add-cart="updateCart"></UserProductModal>
</template>

<script>
import UserProductModal from '@/components/ProductModel.vue'; // 產品明細

export default {
  data() {
    return {
      products: [],
      loadingFlag: '',
      productId: '',
    };
  },
  methods: {
    getProducts() {
      this.$http(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`).then(
        (res) => {
          this.products = res.data.products;
        },
      );
    },
    // 查看更多
    showMore(id) {
      this.closeLoadingFlag(id);
      this.productId = id;
      this.$refs.userProductModal.openModal();
    },
    closeLoadingFlag(id) {
      this.loadingFlag = id;
      // this.isLoading = (id !== '');
    },
    updateCart(type, id, num = 1) {
      let cartUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      let met = 'post';
      if (type === 'update') {
        cartUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
        met = 'put';
      }
      this.closeLoadingFlag(id);

      const data = {
        product_id: id,
        qty: num,
      };
      this.$http[met](cartUrl, { data })
        .then((res) => {
          if (res.data.success) {
            this.closeLoadingFlag('');
            this.$refs.userProductModal.closeModal();
            this.$httpMessageState(res, `${type === 'update' ? '更新' : '新增'}購物車`);
          }
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
  },
  components: {
    UserProductModal,
  },
  mounted() {
    this.getProducts();
  },
};
</script>
