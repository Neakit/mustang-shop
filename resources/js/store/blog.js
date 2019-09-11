import axios from 'axios';

const state = {
    posts: {},
};

const mutations = {
    setPosts(state, payload) {
        state.posts = payload;
    }
};

const getters = {
    posts(state) {
        return state.posts;
    }
};

const actions = {
    async getPosts({ commit }, payload) {
        const params = payload && payload.params || {};
        const { data } = await axios({
            baseURL: 'http://127.0.0.1:8001/',
            method: 'get',
            url: 'api/posts/',
            params
        });
        commit('setPosts', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
