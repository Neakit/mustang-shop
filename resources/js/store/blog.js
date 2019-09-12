import axios from 'axios';

const createEmptyPost = () => {
    return {
        id: 0,
        title: '',
        description: 'description',
        body: '',
        image: ''
    }
};

const state = {
    posts: {},
    post: createEmptyPost()
};

const mutations = {
    setPosts(state, payload) {
        state.posts = payload;
    },
    setPostProp(state, payload) {
        const { key, value } = payload;
        state.post[key] = value;
    },
    addNewPost(state, payload) {
        state.posts.data.unshift(payload);
    },
    clearPost(state) {
        state.post = createEmptyPost();
    },
    setPost(state, payload) {
        state.post = payload;
    }
};

const getters = {
    posts(state) {
        return state.posts;
    },
    post(state) {
        return state.post
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
    },
    async createPost({ commit }) {
        const { title, description, body, image } = state.post;
        const token = localStorage.getItem('bigStore.jwt');
        const { data } = await axios({
            url: `/api/posts/`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                title,
                description,
                body,
                image
            }
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
