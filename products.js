import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data(){
    return { 
        url:'https://vue3-course-api.hexschool.io/v2', // 請加入站點
        path : 'emptywu', // 請加入個人 API Path
        products :[],
        itembody:{}
    };
  },
  methods: {
    check(){
        const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${this.url}/api/user/check`)
        .then((res)=>{

          if(res.data.success){
            axios.get(`${this.url}/api/${this.path}/admin/products`)
            .then((res)=>{
                console.log(res.data.products);
                this.products=res.data.products;
            })
            
          }
        })        
        .catch((error)=>{
          console.log(error);
        })
      },
      detail(item){
        this.itembody=item;
      },
      addProduct(){
        const product = {
            data: {
              title: '[賣]動物園造型衣服3', 
              category: '衣服2',
              origin_price: 100,
              price: 300,
              unit: '個',
              description: 'Sit down please 名設計師設計',
              content: '這是內容',
              is_enabled: 1,
              imageUrl: 'https://images.unsplash.com/photo-1573662012516-5cb4399006e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
              imagesUrl:[
                  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=711&q=80',
                  'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
              ]
            }
          }
          
          // #6 新增一個產品
          axios.post(`${this.url}/api/${this.path}/admin/product`,product)
          .then((res)=>{
            console.log(res);
          })
          .catch((error)=>{
            console.log(error);
          })
      }
  },
  mounted() {
    this.check() 
  },
}).mount('#app');