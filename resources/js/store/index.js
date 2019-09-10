import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//
// /**
//  * Next we will register the CSRF Token as a common header with Axios so that
//  * all outgoing HTTP requests automatically have it attached. This is just
//  * a simple convenience so we don't have to attach every token manually.
//  */
//
// let token = document.head.querySelector('meta[name="csrf-token"]');
//
// if (token) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }
//
// axios.baseURL = '';

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
            auth: false,
            user: [],
            products: {},
            categories: [],
            models: [],
            statuses: [],
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
            statuses(state) {
                return state.statuses;
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
            setProductsPagination(state, payload) {
                state.productsPagination = payload;
            },
            setModels(state, payload) {
                state.models = payload;
            },
            setCategories(state, payload) {
                state.categories = payload;
            },
            setStatuses(state, payload) {
                state.statuses = payload;
            },
            setUser(state, payload) {
                state.user = payload;
            },
            updateProduct(state, product) {
                let updatedPropduct = state.products.data.find(p => p.id === product.id);
                Object.assign(updatedPropduct, product);
            },
            addNewProduct(state, product) {
                state.products.data.push(product);
            },
            toggleProductModal(state, bool) {
                state.productModal = bool;
            }
        },
        actions: {
            async createProduct({ commit }, product) {
                const token = localStorage.getItem('bigStore.jwt');
                const { data } = await axios({
                    url: `/api/products/`,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    data: { ...product }
                });
                if(data.status > 0) {
                    commit('addNewProduct', data.data);
                } else {
                    // TODO: вывести ошибку
                }
            },
            async updateProduct({ commit }, product) {
                const token = localStorage.getItem('bigStore.jwt');
                const { data } = await axios({
                    url: `/api/products/${product.id}`,
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    data: { ...product }
                });
                if(data.status > 0) {
                    commit('updateProduct', data.data);
                } else {
                    // TODO: вывести ошибку
                }
            },
            async getProducts({ commit }, payload) {
                const params = payload && payload.params || {};
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8001/',
                    method: 'get',
                    url: 'api/products/',
                    params
                });
                commit('setProducts', data);
            },
            async getModels({ commit }) {
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8001/',
                    method: 'get',
                    url: 'api/models/'
                });
                commit('setModels', data);
            },
            async getCategories({ commit }) {
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8001/',
                    method: 'get',
                    url: 'api/categories/'
                });
                commit('setCategories', data);
            },
            async getStatuses({ commit }) {
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8001/',
                    method: 'get',
                    url: 'api/statuses/'
                });
                commit('setStatuses', data);
            }
        }
    }
);
