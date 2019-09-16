import axios from 'axios';

const createEmptyModel = () => {
    return {
        id: 0,
        title: '',
    }
};

const state = {
    models: [],
    productModel: createEmptyModel()
};

const mutations = {
    setModels(state, payload) {
        state.models = payload;
    },
    setCategory(state, payload) {
        state.category = payload;
    },
    setCategoryProp(state, { key, value }) {
        state.category[key] = value;
    },
    clearCategory(state) {
        state.category = createEmptyCategory();
    },
    updateCategory(state, category) {
        let updatedCategory = state.categories.find(c => c.id === category.id);
        Object.assign(updatedCategory, category);
    },
    addNewCategory(state, data) {
        state.categories.unshift(data);
    }
};

const getters = {
    models(state) {
        return state.models;
    },
    category(state) {
        return state.category;
    }
};

const actions = {
    async createCategory({ commit }) {
        const { title, description } = state.category;
        const token = localStorage.getItem('bigStore.jwt');
        const { data } = await axios({
            url: `/api/categories/`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                title,
                description
            }
        });
        if(data.status > 0) {
            commit('addNewCategory', data.data);
        } else {
            // TODO: вывести ошибку
        }
    },
    async updateCategory({ commit, state }) {
        const { id, title, description } = state.category;
        const token = localStorage.getItem('bigStore.jwt');
        const { data } = await axios({
            url: `/api/categories/${id}`,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                id,
                title,
                description
            }
        });
        if(data.status > 0) {
            commit('updateCategory', data.data);
        } else {
            // TODO: вывести ошибку
        }
    },
    async getModels({ commit }, payload) {
        const params = payload && payload.params || {};
        const { data } = await axios({
            baseURL: 'http://127.0.0.1:8000/',
            method: 'get',
            url: 'api/models/',
            params
        });
        commit('setModels', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
