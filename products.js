import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import {url,path} from './config.js';
let productModal=null;
let delProductModal=null;
const app=createApp({
  data(){
    return { 
        url:url, // 請加入站點
        path : path, // 請加入個人 API Path
        products :[],
        itembody:{},
        tmpProduct:{ imagesUrl: [],},
        isNew:true,
        imgUrl:''
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
      getData(){
        axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then((res)=>{
            this.products=res.data.products;
        })
        .catch((error)=>{
          alert(error.data.message);        
        })
      },
      //刪除  /v2/api/${api_path}/admin/product/{id}
      //成功回傳訊息 =>"message": "已刪除產品"
      //失敗回傳訊息 =>"message": "無此權限"  "message": "找不到產品"
      deleteItem(id){
        axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`)
          .then((res)=>{
            alert(res.data.message);
            delProductModal.hide();
            this.getData();
          })
          .catch((error)=>{
            alert(error.data.message);
          })
      },
      //新增
      addProduct(){
         
          // #6 新增一個產品
          axios.post(`${this.url}/api/${this.path}/admin/product`,{data:this.tmpProduct})
          .then((res)=>{
            alert(res.data.message);
            productModal.hide();
            this.getData();
          })
          .catch((error)=>{
            alert(error.data.message);
          })
          
      },
      //修改  /v2/api/${api_path}/admin/product/{id}
      EditProduct(id){
        axios.put(`${this.url}/api/${this.path}/admin/product/${id}`,{data:this.tmpProduct})
        .then((res)=>{
          alert(res.data.message);
          productModal.hide();
            this.getData();
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
            //this.tmpProduct={...item};
            this.tmpProduct=JSON.parse(JSON.stringify(item));            
            productModal.show();
                   
            this.isNew=false;//'修改';
            break;
          case'del':
            this.tmpProduct={...item};
            delProductModal.show();                        
            break;
        }
      },
      addPic(){
        if(this.tmpProduct.imagesUrl)
        {
          this.tmpProduct.imagesUrl.push(this.imgUrl);
        }else {
          this.tmpProduct.imagesUrl = [];
          this.tmpProduct.imagesUrl.push(this.imgUrl);
        }
        this.imgUrl='';
      }
  },
  mounted() {
    const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.check() ,
    productModal=new bootstrap.Modal(document.querySelector('#productModal'));
    delProductModal=new bootstrap.Modal(document.querySelector('#delProductModal'));
  },
});

app.mount('#app');