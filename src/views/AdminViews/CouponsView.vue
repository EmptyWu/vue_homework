<template>
  <LoadingComponent :active="isLoading"></LoadingComponent>
  <div class="container-fluid">
    <h1>後臺優惠碼列表</h1>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal(true)"
      >
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.datefilter(item.due_date) }}</td>
          <td>
            <span
            :class="[item.is_enabled === 1?'text-success': 'text-muted']">
              {{item.is_enabled === 1? '啟用':'未啟用'}}</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CouponModal
    :coupon="tempCoupon"
    :is-new="isNew"
    ref="couponModal"
    @update-coupon="updateCoupon"
  />
   <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"/>
</template>

<script>
import CouponModal from '@/components/AdminComponents/CouponModal.vue';
import DelModal from '@/components/AdminComponents/DelModal.vue';

export default {
  components: { CouponModal, DelModal },
  data() {
    return {
      coupons: {},
      isLoading: false,
      isNew: false,
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
    };
  },
  methods: {
    getCoupons() {
      this.isLoading = true;
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`, this.tempProduct)
        .then((response) => {
          this.coupons = response.data.coupons;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 0,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let methods = 'post';
      let data = tempCoupon;
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        methods = 'put';
        data = this.tempCoupon;
      }
      this.$http[methods](url, { data }).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, `${this.isNew ? '新增' : '更新'}優惠券`);
        this.getCoupons();
        this.$refs.couponModal.hideModal();
      }).catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      });
    },
    delCoupon() {
      this.isLoading = true;
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`).then((response) => {
        this.isLoading = false;
        this.$httpMessageState(response, '刪除優惠券');
        this.$refs.delModal.hideModal();
        this.getCoupons();
      }).catch((error) => {
        this.isLoading = false;
        this.$httpMessageState(error.response, '錯誤訊息');
      });
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
