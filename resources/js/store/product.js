import axios from 'axios';

const state = {
    products: {},
};

const mutations = {
    setProducts(state, payload) {
        state.products = payload;
    },
    setCategory(state, payload) {
        state.category = payload;
    }
};

const getters = {
    products(state) {
        return state.products;
    }
};

const actions = {
    async getProducts({ commit }, payload) {
        const params = payload && payload.params || {};
        const { data } = await axios({
            baseURL: 'http://127.0.0.1:8001/',
            method: 'get',
            url: 'api/products/',
            params
        });
        commit('setProducts', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
