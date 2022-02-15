export default {
    data(){
      return {
        imgUrl:'',       
        productModal:'',
      }
    },
    props: ["product","isNew",'url','path'],
    template:"#productModalTemplate",
    methods:{
      addPic(){
        
        //判斷是不是陣列
        if(Array.isArray(this.product.imagesUrl))
        {
          this.product.imagesUrl.push(this.imgUrl);
        }else {
          this.product.imagesUrl = [];
          this.product.imagesUrl.push(this.imgUrl);
        }
        this.imgUrl='';
      },
      updateProduct(){
        
        //新增
        let productUrl=`${this.url}/api/${this.path}/admin/product`;
        let met='post';
        if(this.product?.id){
          //修改  /v2/api/${api_path}/admin/product/{id}
          productUrl=`${this.url}/api/${this.path}/admin/product/${this.product.id}`;
          met='put';
        }
        
        axios[met](productUrl,{data:this.product})
        .then((res)=>{
          alert(res.data.message);
          this.closeModal();
          this.$emit('get-data');
          
        })
        .catch((error)=>{
          alert(error.data.message);
        })
      },
      cancelProduct(){
        this.closeModal();
        this.imgUrl='';
      },    
      uploadImage(type){
        let id=type==='main'?'mainImage':'file';
        //POST  v2/api/{api_path}/admin/upload
        const fileInput=document.querySelector(`#${id}`);
        const file=fileInput.files[0];
  
        //模擬form表單
        const formData=new FormData();
        formData.append('file-to-upload',file);
  
        axios.post(`${this.url}/api/${this.path}/admin/upload`,formData)
        .then((res)=>{
          if(res.data.success){
            if(type==='main'){
              this.product.imageUrl=res.data.imageUrl;
            }else {
              if(!Array.isArray(this.product.imagesUrl))
              {
                this.product.imagesUrl = [];
              }
              this.product.imagesUrl.push(res.data.imageUrl);
            }
            fileInput.value=null;          
          }
        });
      },
      openModal(){
        this.productModal.show();
      },
      closeModal(){
        this.productModal.hide();
      }
    },
    mounted(){
      this.productModal=new bootstrap.Modal(this.$refs.productModal,{keyboard:false});
    }
  };