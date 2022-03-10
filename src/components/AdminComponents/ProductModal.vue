<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ isNew ? "新增" : "修改" }}產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="cancelProduct"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <h3>主要圖片</h3>
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址
                <input
                  type="file"
                  id="mainImage"
                  class="form-control"
                  @change="uploadImage('main')"
                  placeholder="請輸入圖片連結"
                /></label>
                <img class="img-fluid" :src="this.tmpProduct.imageUrl" alt="" />
              </div>
              <h3>其他圖片</h3>
              <template v-for="(item, key) in tmpProduct.imagesUrl" :key="key">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label"
                      >輸入圖片網址
                    <input
                      type="text"
                      class="form-control"
                      v-model="productData.imagesUrl[key]"
                      placeholder="請輸入圖片連結"
                    /></label>
                  </div>
                  <img class="img-fluid" :src="item" alt="" />
                </div>

                <div v-if="productData.imagesUrl[key] === ''">
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="productData.imagesUrl.splice(key, 1)"
                  >
                    取消圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="productData.imagesUrl.splice(key, 1)"
                  >
                    刪除圖片
                  </button>
                </div>
              </template>
              <!--新增圖片v-if="Array.isArray(product.imagesUrl)"-->
              <!--<template >-->
              <div class="mb-2">
                <div class="mb-3">
                  <!-- <label for="imageUrl" class="form-label">輸入圖片網址</label> -->
                  <input
                    type="file"
                    id="file"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <!-- <img class="img-fluid" :src="imgUrl"  alt=""> -->
              </div>
              <div>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  type="button"
                  @click="uploadImage('other')"
                >
                  新增圖片
                </button>
              </div>

              <!-- <input type="file" id="file" placeholder="請輸入圖片連結">
                  <button type="button" @click="UploadPic">新增圖片</button> -->
              <!--</template>-->
              <!--新增圖片-->
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  v-model="productData.title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    v-model="productData.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    v-model="productData.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    v-model.number="productData.origin_price"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    v-model.number="productData.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  v-model="productData.description"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  v-model="productData.content"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <label class="form-check-label" for="is_enabled">是否啟用</label
                  ><input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    v-model="productData.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="cancelProduct"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['tmpProduct', 'isNew'],
  data() {
    return {
      imgUrl: '',
      productModal: '',
      // products: { imagesUrl: [] },
    };
  },
  methods: {
    // addPic() {
    //   // 判斷是不是陣列
    //   if (Array.isArray(this.tmpProduct.imagesUrl)) {
    //     this.productData.imagesUrl.push(this.imgUrl);
    //   } else {
    //     this.productData.imagesUrl = [];
    //     this.productData.imagesUrl.push(this.imgUrl);
    //   }
    //   this.imgUrl = '';
    // },
    updateProduct() {
      // 新增
      let productUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let met = 'post';
      if (this.productData?.id) {
      // 修改  /v2/api/${api_path}/admin/product/{id}
        productUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tmpProduct.id}`;
        met = 'put';
      }

      this.$http[met](productUrl, { data: this.tmpProduct })
        .then((res) => {
          this.$httpMessageState(res, '更新產品');
          this.closeModal();
          this.$emit('get-data');
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
    cancelProduct() {
      this.closeModal();
      this.imgUrl = '';
    },
    uploadImage(type) {
      const id = type === 'main' ? 'mainImage' : 'file';
      // POST  v2/api/{api_path}/admin/upload
      const fileInput = document.querySelector(`#${id}`);
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // 模擬form表單
        const formData = new FormData();
        formData.append('file-to-upload', file);

        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
          .then((res) => {
            if (res.data.success) {
              if (type === 'main') {
                this.productData.imageUrl = res.data.imageUrl;
              } else {
                if (!Array.isArray(this.tmpProduct.imagesUrl)) {
                  this.productData.imagesUrl = [];
                }
                this.productData.imagesUrl.push(res.data.imageUrl);
              }
              fileInput.value = null;
            }
          });
      }
    },
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    },
  },
  computed: {
    productData: {
      get() {
        const productData = this.tmpProduct;
        return productData;
      },
      set(val) {
        console.log(val);
      },
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal, { keyboard: false });
  },
};
</script>
