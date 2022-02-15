export default {
    props: ['product','url','path'],
    data(){
        return { 
            delModal:'',
        };
      },
    template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content border-0">
                            <div class="modal-header bg-danger text-white">
                            <h5 id="delProductModalLabel" class="modal-title">
                                <span>刪除產品</span>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            是否刪除
                            <strong class="text-danger">{{product.title}}</strong> 商品(刪除後將無法恢復)。       
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                取消
                            </button>
                            <button type="button" class="btn btn-danger" @click="deleteItem" >
                                確認刪除
                            </button>
                            </div>
                        </div>
                    </div>
                </div>`,
    methods:{
        //刪除  /v2/api/${api_path}/admin/product/{id}
          //成功回傳訊息 =>"message": "已刪除產品"
          //失敗回傳訊息 =>"message": "無此權限"  "message": "找不到產品"
          deleteItem(){
            this.closeModal();
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.product.id}`)
              .then((res)=>{
                alert(res.data.message);                
                this.$emit('get-data');
                this.closeModal();
              })
              .catch((error)=>{
                alert(error.data.message);
              })
          },
          openModal(){
             this.delModal.show();
              
          },
          closeModal(){
              this.delModal.hide();
          }
      },
      mounted(){
        this.delModal=new bootstrap.Modal(this.$refs.delProductModal,{keyboard:false});
      }
};