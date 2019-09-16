import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// modules
import modals from './modals';
import category from './category';
import model from './model';
import product from './product';
import blog from './blog';

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
            auth: false,
            user: [],
            categories: [],
            models: [],
            statuses: [],
            productModal: false
        },
        getters: {
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
            toggleProductModal(state, bool) {
                state.productModal = bool;
            }
        },
        actions: {
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
            },
            async getStatuses({ commit }) {
                const { data } = await axios({
                    baseURL: 'http://127.0.0.1:8000/',
                    method: 'get',
                    url: 'api/statuses/'
                });
                commit('setStatuses', data);
            }
        },
        modules: {
            modals,
            category,
            model,
            product,
            blog
        }
    }
);
