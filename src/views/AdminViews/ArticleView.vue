<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container-fluid">
    <h1>公告欄</h1>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th style="width: 200px">標題</th>
          <th style="width: 200px">作者</th>
          <th>描述</th>
          <th style="width: 100px">建立時間</th>
          <th style="width: 100px">是否公開</th>
          <th style="width: 120px">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ $filters.datefilter(article.create_at) }}</td>
          <td>
            <span :class="[article.isPublic?'text-success': 'text-muted']">
              {{article.isPublic?'已上架':'未上架'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="getArticle(article.id)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelArticleModal(article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    ></ArticleModal>
    <DelModal :item="tempArticle" ref="delModal" @del-item="delArticle" />
    </div>
</template>

<script>
import ArticleModal from '@/components/AdminComponents/ArticleModal.vue';
import DelModal from '@/components/AdminComponents/DelModal.vue';

export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
    };
  },
  // inject: ['emitter'],
  components: {
    ArticleModal,
    DelModal,
  },
  methods: {
    getArticles(page = 1) {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.articles = response.data.articles;
          this.pagination = response.data.pagination;
        }
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      });
    },
    getArticle(id) {
      this.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          this.openModal(false, response.data.article);
          this.isNew = false;
        }
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息');
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    updateArticle(item) {
      this.tempArticle = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`;
      let httpMethod = 'post';
      this.isLoading = true;
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
      }
      const articleComponent = this.$refs.articleModal;
      this.$http[httpMethod](api, { data: this.tempArticle }).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, `${this.isNew ? '新增' : '更新'}貼文`);
        articleComponent.hideModal();
        this.getArticles();
      }).catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    delArticle() {
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, '刪除貼文');
        this.$refs.delModal.hideModal();
        this.getArticles();
      }).catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '刪除貼文');
      });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
