# Vue實戰班 第七次作業
## 網頁美感大揭密

### 登入頁面 https://emptywu.github.io/vue_homework/login.html
* 頁面模板
* 登入串接 POST API     /v2/admin/signin
* 驗證登入串接 POST API /v2/api/user/check
    * headers需要帶入 Authorization
    ```js
        //這邊會是全域的寫法
        axios.defaults.headers.common['Authorization'] = token;
    ```

### 產品頁面 https://emptywu.github.io/vue_homework/products.html

* 頁面模板                  
* 取得產品資料串接 GET API      /v2/api/${api_path}/admin/products?page={頁數}
* 新增產品資料串接 POST API     /v2/api/${api_path}/admin/product
* 刪除產品資料串接 DELETE API   /v2/api/${api_path}/admin/product/{id}
* 編輯產品資料串接 PUT API      /v2/api/${api_path}/admin/product/{id}

* 上傳圖片(Upload) POST API    /v2/api/{api_path}/admin/upload
    * 成功會取得 imageURL路徑，再帶入產品物件中

### 購物車 https://emptywu.github.io/vue_homework/FrontEnd/cart.html

* 頁面模板


### 元件化

* 分頁元件      https://emptywu.github.io/vue_homework/pagination.js   
    * 傳入分頁物件  
    ```js
        "pagination": {
            "total_pages": 1,   //總頁數
            "current_page": 1,  //目前頁碼
            "has_pre": false,   //是否有上一頁
            "has_next": false,  //是否有下一頁
            "category": ""
        }
    ```
    * 呼叫 getData 帶入頁碼至API
        * 取得產品資料串接 GET API      /v2/api/${api_path}/admin/products?page={頁數}
* 刪除產品元件  https://emptywu.github.io/vue_homework/delproduct.js
    * 傳入產品資訊、API URL、API PATH
    * 呼叫外部 getData(回第一頁) 、 openTarget(進行頁面開關使用)


### github 設定
* cd 到构建输出的目录下  
cd dist

* 部署到自定义域域名
* echo 'www.example.com' > CNAME

git init  
git add -A  
git commit -m 'deploy'  

* 部署到 https://github.com/EmptyWu/vue_homework.git  
git push -f https://github.com/EmptyWu/vue_homework.git master:gh-pages  