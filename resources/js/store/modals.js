const state = {
    categoryModal: false,
    productModal: false,
    productModelModal: false,
    blogModal: false
};

const mutations = {
    toggleModal(state, { name, bool }){
        state[name] = bool;
    }
};

const getters = {
    categoryModal(state) {
        return state.categoryModal;
    },
    productModal(state) {
        return state.productModal;
    },
    productModelModal(state) {
        return state.productModelModal;
    },
    blogModal(state) {
        return state.blogModal;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
};
