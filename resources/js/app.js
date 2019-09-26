import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
// importing layouts
import Default from './layouts/Default'
import Admin from './layouts/Admin'
// importing router and store
import router from './router';
import store from './store';

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded'

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

Vue.prototype.$axios = axios;
import 'quill/dist/quill.core.css'

Vue.use(VueQuillEditor);


const app = new Vue({
    el: '#app',
    components: {
        Default,
        Admin
    },
    router,
    store,
    template: '<router-view></router-view>'
});
