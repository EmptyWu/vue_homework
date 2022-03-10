<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
      <div class="container-fluid">
        <h1>後臺產品列表</h1>
      <div class="text-end mt-4">
        <button class="btn btn-primary" @click="openTarget('new')">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{product.category}}</td>
            <td>{{product.title}}</td>
            <td>{{product.origin_price}}</td>
            <td>{{product.price}}</td>
            <td>
              <span class="text-success" v-if="product.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openTarget('edit',product)"
                >
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openTarget('del',product)"
               >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <PaginationModal :pages="pagination" @emitPages="getData"></PaginationModal>
    </div>
    <!--刪除-->
    <DelModal ref="delModal" :item="tmpProduct"
    @del-item="deleteItem"></DelModal>
    <!--刪除-->
    <!--新增 / 修改-->
    <ProductModalVue ref="productModal" :tmp-product="tmpProduct" :is-new="isNew"
        @get-data="getData">
    </ProductModalVue>
    <!--新增 / 修改-->
</template>

<script>
import DelModal from '@/components/AdminComponents/DelModal.vue';
import ProductModalVue from '@/components/AdminComponents/ProductModal.vue';
import PaginationModal from '@/components/AdminComponents/PaginationModal.vue';

export default {
  name: 'ProductsView',
  data() {
    return {
      isNew: true,
      isLoading: false,
      pagination: {}, // 分頁
      products: [],
      tmpProduct: { imagesUrl: [] },
    };
  },
  methods: {
    openTarget(type, item) {
      this.tmpProduct = {
        imagesUrl: [],
      };
      switch (type) {
        case 'new':
          this.$refs.productModal.openModal();
          // '新增';
          this.isNew = true;
          break;
        case 'edit':
          this.tmpProduct = { ...item };
          // this.tmpProduct=JSON.parse(JSON.stringify(item));
          this.$refs.productModal.openModal();
          // productModal.show();
          // '修改';
          this.isNew = false;
          break;
        case 'del':
          this.tmpProduct = { ...item };
          this.$refs.delModal.openModal();
          break;
        default:
          break;
      }
    },
    // 取得產品明細
    getData(page = 1) {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
    deleteItem() {
    // 刪除  /v2/api/${api_path}/admin/product/{id}
    // 成功回傳訊息 =>"message": "已刪除產品"
    // 失敗回傳訊息 =>"message": "無此權限"  "message": "找不到產品"
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tmpProduct.id}`)
        .then(() => {
          this.$refs.delModal.hideModal();
          this.getData();
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
  },
  components: {
    DelModal,
    ProductModalVue,
    PaginationModal,
  },
  mounted() {
    this.getData(1);
  },
};
</script>
