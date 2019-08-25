import Vue from 'vue';
// importing layouts
import Default from './layouts/Default'
import Admin from './layouts/Admin'
// importing router and store
import router from './router';
import store from './store';

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
