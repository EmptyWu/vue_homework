import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import $httpMessageState from '@/libs/MessageState';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import { datefilter, currency } from './libs/filters';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale('zh_TW');

library.add(faSpinner);

const app = createApp(App);
app.config.globalProperties.$filters = {
  datefilter,
  currency,
};
// 訊息處裡的方式
app.config.globalProperties.$httpMessageState = $httpMessageState;

app.use(VueAxios, axios);
app.use(router);
app.component('LoadingComponent', Loading);
app.component('FormComponent', Form);
app.component('FieldComponent', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
