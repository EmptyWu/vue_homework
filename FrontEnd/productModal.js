/* global axios bootstrap */
export default {
  data () {
    return {
      product: {},
      qty: 1
    }
  },
  props: ['id', 'url', 'path'],
  template: '#userProductModal',
  watch: {
    id () {
      this.getProduct()
    }
  },
  methods: {
    getProduct () {
      axios.get(`${this.url}/api/${this.path}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product
          this.$emit('loadingFlag', '')
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    openModal () {
      this.productModal.show()
    },
    closeModal () {
      this.productModal.hide()
    }
  },
  mounted () {
    this.productModal = new bootstrap.Modal(this.$refs.modal, { keyboard: false })
  }
}
