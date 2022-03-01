import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';

library.add(faSpinner);

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
