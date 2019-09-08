import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

axios.baseURL = '';

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
            auth: false,
            user: [],
            products: [],
            categories: [],
            models: [],
            productModal: false
        },
        getters: {
            products(state) {
                return state.products;
            },
            categories(state) {
                return state.categories;
            },
            models(state) {
                return state.models;
            },
            user(state) {
                return state.user;
            },
            productModal(state) {
                return state.productModal;
            }
        },
        mutations: {
            setAuth(state, payload) {
                state.auth = payload;
            },
            setProducts(state, payload) {
                state.products = payload;
            },
            setModels(state, payload) {
                state.models = payload;
            },
            setCategories(state, payload) {
                state.categories = payload;
            },
            setUser(state, payload) {
                state.user = payload;
            },
            toggleProductModal(state, bool) {
                state.productModal = bool;
            }
        },
        actions: {
            async getProducts({ commit }, payload) {
                const params = payload && payload.params || {};
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8000/',
                    method: 'get',
                    url: 'api/products/',
                    params
                }); 
                commit('setProducts', data.data);
            },
            async getModels({ commit }) {
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8000/',
                    method: 'get',
                    url: 'api/models/'
                }); 
                commit('setModels', data);
            },
            async getCategories({ commit }) {
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8000/',
                    method: 'get',
                    url: 'api/categories/'
                }); 
                commit('setCategories', data);
            }
        }
    }
);
