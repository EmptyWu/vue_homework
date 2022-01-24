# Vue實戰班 第三次作業
## 熟練 Vue.js

### 登入頁面
* 頁面模板
* 登入串接 POST API     /v2/admin/signin
* 驗證登入串接 POST API /v2/api/user/check
    * headers需要帶入 Authorization
    ``` javascript
        axios.defaults.headers.common['Authorization'] = token;
    ```

### 產品頁面

* 頁面模板                  
* 取得產品資料串接 GET API      /v2/api/${api_path}/admin/products
* 新增產品資料串接 POST API     /v2/api/${api_path}/admin/product
* 刪除產品資料串接 DELETE API   /v2/api/${api_path}/admin/product/{id}
* 編輯產品資料串接 PUT API      /v2/api/${api_path}/admin/product/{id}