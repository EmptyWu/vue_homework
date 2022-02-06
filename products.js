import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import {url,path} from './config.js'; //參數

import pagination from './pagination.js'; //分頁
import delproduct from './delproduct.js'; //刪除

let productModal={};
let delProductModal={};

const productModalTemplate={
  data(){
    return {
      imgUrl:'',
      url:url, // 請加入站點
      path : path, // 請加入個人 API Path
    }
  },
  props: ["product","isNew"],
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
        productModal.hide();
        this.$emit('get-data');
        
      })
      .catch((error)=>{
        alert(error.data.message);
      })
    },
    cancelProduct(){
      productModal.hide();
      this.imgUrl='';
    }
  }
};

const app=createApp({
  data(){
    return { 
        url, // 請加入站點
        path , // 請加入個人 API Path
        products :[],
        tmpProduct:{ imagesUrl: [],},
        isNew:true,
        pagination:{} //分頁
    };
  },
  methods: {
      //確認驗證
      check(){
        axios.post(`${this.url}/api/user/check`)
        .then((res)=>{
          if(res.data.success){
           this.getData();
          }
        })        
        .catch((error)=>{
          alert(error.data.message);
          window.location="login.html";
        })
      },
      //取得產品明細
      getData(page=1){
        axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
        .then((res)=>{
            this.products=res.data.products;
            this.pagination=res.data.pagination;
        })
        .catch((error)=>{
          alert(error.data.message);        
        })
      },  
      openTarget(type,item){
        this.tmpProduct = {
          imagesUrl: [],
        };
        switch(type){
          case'new':
            productModal.show();
            this.isNew=true;//'新增';
          break;
          case 'edit':
            this.tmpProduct={...item};
            //this.tmpProduct=JSON.parse(JSON.stringify(item));            
            productModal.show();
                   
            this.isNew=false;//'修改';
            break;
          case'del':
            this.tmpProduct={...item};
            delProductModal.show();                        
            break;
          case 'del-hide':
            delProductModal.hide();
            break;
        }
      },
  },
  components:{
    //'del-product':delProductTemplate,
    delproduct,
    'product-modal':productModalTemplate,
    pagination
  },
  mounted() {
    
    const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    
    this.check() ,
    productModal=new bootstrap.Modal(document.querySelector('#productModal'),{keyboard:false});
    delProductModal=new bootstrap.Modal(document.querySelector('#delProductModal'),{keyboard:false});
    
  },
});

app.mount('#app');