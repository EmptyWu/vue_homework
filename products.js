import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import {url,path} from './config.js'; //參數

import pagination from './pagination.js'; //分頁
import delproduct from './delproduct.js'; //刪除
import productModalTemplate from './productModal.js';//產品新增與修改



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
          //window.location="login.html";
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
            this.$refs.productModal.openModal();
            this.isNew=true;//'新增';
          break;
          case 'edit':
            this.tmpProduct={...item};
            //this.tmpProduct=JSON.parse(JSON.stringify(item));            
            this.$refs.productModal.openModal();
            //productModal.show();
                   
            this.isNew=false;//'修改';
            break;
          case'del':
            this.tmpProduct={...item};            
            this.$refs.delProductModal.openModal();
            //console.log(this.delProductModal);
            //delProductModal.show();                        
            break;
          
        }
      },
  },
  components:{
    delproduct,
    'product-modal':productModalTemplate,
    pagination
  },
  mounted() {
    const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.check()
  },
});

app.mount('#app');