/* eslint-disable no-undef */
import { url, path } from '../config.js' // 參數
import userProductModal from './productModal.js' // 產品明細

VeeValidate.defineRule('email', VeeValidateRules.email)
VeeValidate.defineRule('required', VeeValidateRules.required)
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json')
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true // 調整為輸入字元立即進行驗證
});
const app = Vue.createApp({
  data () {
    return {
      url, // 請加入站點
      path, // 請加入個人 API Path
      products: [],
      loadingFlag: '',
      productId: '',
      cartData: { carts: [] },
      qty: 1,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      load: '',
      isLoading: false
    };
  },
  methods: {
    // 顯示產品
    showProduct () {
      axios.get(`${this.url}/api/${this.path}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((error) => {
          alert(error.data.message);
        })
    },
    // 查看更多
    showMore (id) {
      this.closeLoadingFlag(id);
      this.isLoading = true;
      this.productId = id;
      this.$refs.userProductModal.openModal();
    },
    closeLoadingFlag (id) {
      this.loadingFlag = id;
      this.isLoading = (id !== '');
    },
    updateCart (type, id, num = 1) {
      let cartUrl = `${this.url}/api/${this.path}/cart`;
      let met = 'post';
      if (type === 'update') {
        cartUrl = `${this.url}/api/${this.path}/cart/${id}`;
        met = 'put';
      }
      this.closeLoadingFlag(id);

      const data = {
        product_id: id,
        qty: num
      };
      axios[met](cartUrl, { data })
        .then((res) => {
          // alert(res.data.message);
          if (res.data.success) {
            this.closeLoadingFlag('');
            this.showCarts();
            this.$refs.userProductModal.closeModal();
          }
        })
        .catch((error) => {
          alert(error.data.message);
        })
    },
    showCarts () {
      axios.get(`${this.url}/api/${this.path}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
        })
        .catch((error) => {
          alert(error.data.message);
        })
    },
    cleanCart (id = '') {
      let delCartUrl = `${this.url}/api/${this.path}/carts`;
      if (id !== '') {
        this.closeLoadingFlag(id);
        delCartUrl = `${this.url}/api/${this.path}/cart/${id}`;
      }
      axios.delete(delCartUrl)
        .then((res) => {
          alert(res.data.message);
          this.showCarts();
          this.closeLoadingFlag('');
        })
        .catch((error) => {
          alert(error.data.message);
        })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    onSubmit () {
      const order = this.form;
      this.isLoading = true;

      axios.post(`${this.url}/api/${this.path}/order`, { data: order })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.isLoading = false;
            this.$refs.form.resetForm();
            this.form.message = '';
            this.showCarts();
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }

  },
  components: {
    userProductModal
  },
  mounted () {
    this.load = this.$loading;
    this.showProduct();
    this.showCarts();
  }
});
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.use(VueLoading.Plugin);
// eslint-disable-next-line vue/multi-word-component-names
app.component('loading', VueLoading.Component);
app.mount('#app');
