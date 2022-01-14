import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';


createApp({
  data(){
    return { 
        user:{
            url:'https://vue3-course-api.hexschool.io/v2', // 請加入站點
            username:'',
            password:''
        }
       
    }
  },
  methods: {
      signIn(){
         
          axios.post(`${this.url}/admin/signin`,this.user)
            .then((res)=>{
            console.log(res);
            const{token,expired} =res.data;
            document.cookie = `hextoken=${token}; expires=${new Date(expired)};`;
            window.location = 'products.html';
            })
            .catch((error)=>{
            console.log(error);
            })
      },
      check(){
        const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        axios.defaults.headers.common['Authorization'] = token;
        axios.post(`${this.url}/api/user/check`)
        .then((res)=>{

          if(res.data.success){
            window.location = 'products.html';
          }
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