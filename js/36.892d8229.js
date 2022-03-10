"use strict";(self["webpackChunkhomework7"]=self["webpackChunkhomework7"]||[]).push([[36],{2464:function(t,e,l){l.d(e,{Z:function(){return M}});var a=l(3396),i=l(7139);const s={class:"modal fade",id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},o={class:"modal-dialog",role:"document"},c={class:"modal-content border-0"},n={class:"modal-header bg-danger text-white"},d={class:"modal-title"},r=(0,a._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),p={class:"modal-body"},m=(0,a.Uk)(" 是否刪除 "),h={class:"text-danger"},u=(0,a.Uk)(" (刪除後將無法恢復)。 "),b={class:"modal-footer"},_=(0,a._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消 ",-1);function g(t,e,l,g,w,f){return(0,a.wg)(),(0,a.iD)("div",s,[(0,a._)("div",o,[(0,a._)("div",c,[(0,a._)("div",n,[(0,a._)("h5",d,[(0,a._)("span",null,"刪除 "+(0,i.zw)(l.item.title??l.item.id),1)]),r]),(0,a._)("div",p,[m,(0,a._)("strong",h,(0,i.zw)(l.item.title??l.item.id),1),u]),(0,a._)("div",b,[_,(0,a._)("button",{type:"button",class:"btn btn-danger",onClick:e[0]||(e[0]=e=>t.$emit("del-item"))},"確認刪除 ")])])])],512)}var w=l(7972),f=l.n(w),y={props:{item:{}},data(){return{modal:""}},emits:["del-item"],methods:{openModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){this.modal=new(f())(this.$refs.modal)}},A=l(89);const v=(0,A.Z)(y,[["render",g]]);var M=v},4036:function(t,e,l){l.r(e),l.d(e,{default:function(){return it}});var a=l(3396),i=l(7139);const s={class:"container-fluid"},o=(0,a._)("h1",null,"公告欄",-1),c={class:"text-end mt-4"},n={class:"table mt-4"},d=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",{style:{width:"200px"}},"標題"),(0,a._)("th",{style:{width:"200px"}},"作者"),(0,a._)("th",null,"描述"),(0,a._)("th",{style:{width:"100px"}},"建立時間"),(0,a._)("th",{style:{width:"100px"}},"是否公開"),(0,a._)("th",{style:{width:"120px"}},"編輯")])],-1),r={class:"btn-group"},p=["onClick"],m=["onClick"];function h(t,e,l,h,u,b){const _=(0,a.up)("LoadingComponent"),g=(0,a.up)("ArticleModal"),w=(0,a.up)("DelModal");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(_,{active:u.isLoading},null,8,["active"]),(0,a._)("div",s,[o,(0,a._)("div",c,[(0,a._)("button",{class:"btn btn-primary",type:"button",onClick:e[0]||(e[0]=t=>b.openModal(!0))}," 建立新的頁面 ")]),(0,a._)("table",n,[d,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(u.articles,(e=>((0,a.wg)(),(0,a.iD)("tr",{key:e.id},[(0,a._)("td",null,(0,i.zw)(e.title),1),(0,a._)("td",null,(0,i.zw)(e.author),1),(0,a._)("td",null,(0,i.zw)(e.description),1),(0,a._)("td",null,(0,i.zw)(t.$filters.datefilter(e.create_at)),1),(0,a._)("td",null,[(0,a._)("span",{class:(0,i.C_)([e.isPublic?"text-success":"text-muted"])},(0,i.zw)(e.isPublic?"已上架":"未上架"),3)]),(0,a._)("td",null,[(0,a._)("div",r,[(0,a._)("button",{class:"btn btn-outline-primary btn-sm",type:"button",onClick:t=>b.getArticle(e.id)}," 編輯 ",8,p),(0,a._)("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:t=>b.openDelArticleModal(e)}," 刪除 ",8,m)])])])))),128))])]),(0,a.Wm)(g,{ref:"articleModal",article:u.tempArticle,"is-new":u.isNew,onUpdateArticle:b.updateArticle},null,8,["article","is-new","onUpdateArticle"]),(0,a.Wm)(w,{item:u.tempArticle,ref:"delModal",onDelItem:b.delArticle},null,8,["item","onDelItem"])])],64)}var u=l(9242);const b={class:"modal fade",id:"ArticleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},_={class:"modal-dialog modal-xl",role:"document"},g={class:"modal-content border-0"},w={class:"modal-header bg-dark text-white"},f={class:"modal-title",id:"exampleModalLabel"},y=(0,a._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),A={class:"modal-body"},v={class:"row"},M={class:"col-4"},x={class:"mb-3"},k=(0,a._)("label",{for:"title",class:"form-label"},"標題",-1),$={class:"mb-3"},D=(0,a._)("label",{for:"image",class:"form-label"},"輸入圖片網址",-1),C={class:"mb-3"},L=(0,a._)("label",{for:"author",class:"form-label"},"作者",-1),U={class:"mb-3"},N=(0,a._)("label",{for:"create_at"},"文章建立日期",-1),P={class:"col-sm-8"},V=(0,a._)("label",{for:"tag",class:"form-label"},"標籤",-1),z={class:"row gx-1 mb-3"},S={class:"input-group"},Z=["onUpdate:modelValue"],H=["onClick"],I={key:0,class:"col-md-2 mb-1"},W={class:"mb-3"},Y=(0,a._)("label",{for:"description",class:"form-label"},"文章描述",-1),K={class:"mb-3"},O=(0,a._)("label",{for:"content",class:"form-label"},"請輸入文章內容",-1),T={class:"mb-3"},j={class:"form-check"},q=(0,a._)("label",{class:"form-check-label",for:"isPublic"}," 是否公開 ",-1),B={class:"modal-footer"},X=(0,a._)("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function E(t,e,l,s,o,c){return(0,a.wg)(),(0,a.iD)("div",b,[(0,a._)("div",_,[(0,a._)("div",g,[(0,a._)("div",w,[(0,a._)("h5",f,[(0,a._)("span",null,(0,i.zw)(l.isNew?"新增":"編輯")+" 貼文",1)]),y]),(0,a._)("div",A,[(0,a._)("div",v,[(0,a._)("div",M,[(0,a._)("div",x,[k,(0,a.wy)((0,a._)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":e[0]||(e[0]=t=>o.tempArticle.title=t),placeholder:"請輸入標題"},null,512),[[u.nr,o.tempArticle.title]])]),(0,a._)("div",$,[D,(0,a.wy)((0,a._)("input",{type:"text",class:"form-control",id:"image","onUpdate:modelValue":e[1]||(e[1]=t=>o.tempArticle.imageUrl=t),placeholder:"請輸入圖片連結"},null,512),[[u.nr,o.tempArticle.imageUrl]])]),(0,a._)("div",C,[L,(0,a.wy)((0,a._)("input",{type:"text",class:"form-control",id:"author","onUpdate:modelValue":e[2]||(e[2]=t=>o.tempArticle.author=t),placeholder:"請輸入標題"},null,512),[[u.nr,o.tempArticle.author]])]),(0,a._)("div",U,[N,(0,a.wy)((0,a._)("input",{type:"date",class:"form-control",id:"create_at","onUpdate:modelValue":e[3]||(e[3]=t=>o.create_at=t)},null,512),[[u.nr,o.create_at]])])]),(0,a._)("div",P,[V,(0,a._)("div",z,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.tempArticle.tag,((t,e)=>((0,a.wg)(),(0,a.iD)("div",{class:"col-md-2 mb-1",key:e},[(0,a._)("div",S,[(0,a.wy)((0,a._)("input",{type:"text",class:"form-control form-control",id:"tag","onUpdate:modelValue":t=>o.tempArticle.tag[e]=t,placeholder:"請輸入標籤"},null,8,Z),[[u.nr,o.tempArticle.tag[e]]]),(0,a._)("button",{type:"button",class:"btn btn-outline-danger",onClick:t=>o.tempArticle.tag.splice(e,1)},"X ",8,H)])])))),128)),o.tempArticle.tag[o.tempArticle.tag.length-1]||!o.tempArticle.tag.length?((0,a.wg)(),(0,a.iD)("div",I,[(0,a._)("button",{class:"btn btn-outline-primary d-block w-100",onClick:e[4]||(e[4]=t=>o.tempArticle.tag.push(""))}," 新增標籤 ")])):(0,a.kq)("",!0)]),(0,a._)("div",W,[Y,(0,a.wy)((0,a._)("textarea",{type:"text",class:"form-control",id:"description","onUpdate:modelValue":e[5]||(e[5]=t=>o.tempArticle.description=t),placeholder:"請輸入文章描述"},null,512),[[u.nr,o.tempArticle.description]])]),(0,a._)("div",K,[O,(0,a.wy)((0,a._)("textarea",{type:"text",class:"form-control",id:"content","onUpdate:modelValue":e[6]||(e[6]=t=>o.tempArticle.content=t),placeholder:"請輸入文章內容"},null,512),[[u.nr,o.tempArticle.content]])]),(0,a._)("div",T,[(0,a._)("div",j,[(0,a.wy)((0,a._)("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[7]||(e[7]=t=>o.tempArticle.isPublic=t),id:"isPublic"},null,512),[[u.e8,o.tempArticle.isPublic]]),q])])])])]),(0,a._)("div",B,[X,(0,a._)("button",{type:"button",class:"btn btn-primary",onClick:e[8]||(e[8]=e=>t.$emit("update-article",o.tempArticle))}," 確認 ")])])])],512)}var F=l(7972),G=l.n(F),J={props:{article:{type:Object,default(){return{}}},isNew:{type:Boolean,default:!0}},data(){return{status:{},modal:"",tempArticle:{tag:[""]},create_at:0}},methods:{openModal(){this.modal.show()},hideModal(){this.modal.hide()}},mounted(){this.modal=new(G())(this.$refs.modal)},watch:{article(){this.tempArticle={...this.article,tag:this.article.tag||[],isPublic:this.article.isPublic||!1},[this.create_at]=new Date(1e3*this.tempArticle.create_at).toISOString().split("T")},create_at(){this.tempArticle.create_at=Math.floor(new Date(this.create_at)/1e3)}}},Q=l(89);const R=(0,Q.Z)(J,[["render",E]]);var tt=R,et=l(2464),lt={data(){return{articles:[],isLoading:!1,isNew:!1,tempArticle:{}}},components:{ArticleModal:tt,DelModal:et.Z},methods:{getArticles(t=1){this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/emptywu/admin/articles?page=${t}`).then((t=>{this.isLoading=!1,t.data.success&&(this.articles=t.data.articles,this.pagination=t.data.pagination)})).catch((t=>{this.$httpMessageState(t.response,"錯誤訊息")}))},getArticle(t){this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/emptywu/admin/article/${t}`).then((t=>{this.isLoading=!1,t.data.success&&(this.openModal(!1,t.data.article),this.isNew=!1)})).catch((t=>{this.$httpMessageState(t.response,"錯誤訊息")}))},openModal(t,e){t?(this.tempArticle={isPublic:!1,create_at:(new Date).getTime()/1e3,tag:[]},this.isNew=!0):(this.tempArticle={...e},this.isNew=!1),this.$refs.articleModal.openModal()},updateArticle(t){this.tempArticle=t;let e="https://vue3-course-api.hexschool.io/v2/api/emptywu/admin/article",l="post";this.isLoading=!0,this.isNew||(e=`https://vue3-course-api.hexschool.io/v2/api/emptywu/admin/article/${this.tempArticle.id}`,l="put");const a=this.$refs.articleModal;this.$http[l](e,{data:this.tempArticle}).then((t=>{this.isLoading=!1,this.$httpMessageState(t,(this.isNew?"新增":"更新")+"貼文"),a.hideModal(),this.getArticles()})).catch((t=>{this.isLoading=!1,this.$httpMessageState(t.response,"錯誤訊息")}))},openDelArticleModal(t){this.tempArticle={...t};const e=this.$refs.delModal;e.openModal()},delArticle(){this.isLoading=!0,this.$http.delete(`https://vue3-course-api.hexschool.io/v2/api/emptywu/admin/article/${this.tempArticle.id}`).then((t=>{this.isLoading=!1,this.$httpMessageState(t,"刪除貼文"),this.$refs.delModal.hideModal(),this.getArticles()})).catch((t=>{this.isLoading=!1,this.$httpMessageState(t.response,"刪除貼文")}))}},mounted(){this.getArticles()}};const at=(0,Q.Z)(lt,[["render",h]]);var it=at}}]);
//# sourceMappingURL=36.892d8229.js.map