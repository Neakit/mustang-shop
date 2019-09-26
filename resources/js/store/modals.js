const state = {
    categoryModal: false,
    productModal: false,
    productModelModal: false,
    blogModal: false,
    orderModal: false,
    orderSuccess: false,
    productImageModal: false,

    destroyConfirmModal: false,
    destroyData: {},

    toastModal: false,
    toastMessage: ''
};

const mutations = {
    toggleModal(state, { name, bool }){
        state[name] = bool;
    },
    setToastMessage(state, data) {
        state.toastMessage = data;
    },
    setDestroyData(state, data) {
        state.destroyData = data;
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
    },
    orderModal(state) {
        return state.orderModal;
    },
    orderSuccess(state) {
        return state.orderSuccess;
    },
    destroyConfirmModal(state) {
        return state.destroyConfirmModal;
    },
    productImageModal(state) {
        return state.productImageModal;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
};
