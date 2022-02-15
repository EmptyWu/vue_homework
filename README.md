# Vue實戰班 第五次作業
## 進階語法介紹

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
* 取得產品資料串接 GET API      /v2/api/{api_path}/admin/products?page={頁數}
* 新增產品資料串接 POST API     /v2/api/{api_path}/admin/product
* 刪除產品資料串接 DELETE API   /v2/api/{api_path}/admin/product/{id}
* 編輯產品資料串接 PUT API      /v2/api/{api_path}/admin/product/{id}

* 上傳圖片(Upload) POST API    /v2/api/{api_path}/admin/upload
    * 成功會取得 imageURL路徑，再帶入產品物件中

### 購物車 https://emptywu.github.io/vue_homework/FrontEnd/cart.html

* 頁面模板
* 取得客戶購物-所有產品 GET API     /v2/api/{api_path}/products/all
* 取得客戶購物-單一產品 GET API     /v2/api/{api_path}/product/{id}
* 購物車
    * 客戶購物-加入購物車   POST AI     /v2/api/{api_path}/cart
    * 客戶購物-取得購物清單 GET AI      /v2/api/{api_path}/cart
    * 客戶購物-修改數量     PUT AI      /v2/api/{api_path}/cart/{id}
    * 客戶購物-刪除品項     DELETE AI      /v2/api/{api_path}/cart/{id}
    * 客戶購物-清空購物車   DELETE AI      /v2/api/{api_path}/carts

*結帳
    * 結帳-新增訂單   POST AI     /v2/api/{api_path}/order
    

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
        * 取得產品資料串接 GET API      /v2/api/{api_path}/admin/products?page={頁數}
* 刪除產品元件  https://emptywu.github.io/vue_homework/delproduct.js
    * 傳入產品資訊、API URL、API PATH
    * 呼叫外部 getData(回第一頁) 、 openTarget(進行頁面開關使用)