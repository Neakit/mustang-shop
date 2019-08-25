import Vue from 'vue';

// import App from './pages/App'
import Layout from './layouts/Layout'


import router from './router';


const app = new Vue({
    el: '#app',
    components: { Layout },
    name: 'Layout',
    router,
});