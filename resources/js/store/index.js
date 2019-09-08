import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
        state: {
            auth: false,
            user: [],
            products: [],
            categories: [],
            models: []
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
            }
        },
        mutations: {
            setAuth(state, payload) {
                state.auth = payload;
            }
        },
        actions: {
            // getModels()
            // this.$axios.get("api/categories/").then(response => {
            //     return this.categories = response.data
            // });
            // this.$axios.get("api/models/").then(response => {
            //     return this.models = response.data
            // });
            getProducts({ commit }, { params }) {
                // params: {
                //     value: 'MERSEDES4',
                //         product_model_id: 1,
                //         category_id: 4
                // }
                const data = axios({
                    url: 'api/products',
                    method: 'get',
                    params
                });
                console.log(data)
                debugger
            }
        }
    }
);
