import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import {url,path} from './config.js';

const app=createApp({
  data(){
    return { 
        url:url,  // 請加入站點
        user:{            
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
      }
  }
});
app.mount('#app');