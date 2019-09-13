const state = {
    categoryModal: false,
    productModal: false,
    productModelModal: false,
    blogModal: false,
    toastModal: false,
    toastMessage: ''
};

const mutations = {
    toggleModal(state, { name, bool }){
        state[name] = bool;
    },
    setToastMessage(state, data) {
        state.toastMessage = data;
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
