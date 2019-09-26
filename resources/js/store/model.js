import { privateHTTP, publicHTTP } from '../services';
import router from '../router';

const createEmptyModel = () => {
    return {
        id: 0,
        title: '',
    }
};

const state = {
    models: [],
    model: createEmptyModel()
};

const mutations = {
    setModels(state, payload) {
        state.models = payload;
    },
    setModel(state, payload) {
        state.model = payload;
    },
    clearModel(state) {
        state.model = createEmptyModel();
    },
    setModelProp(state, { key, value }) {
        state.model[key] = value;
    },
    updateModel(state, model) {
        let updatedModel = state.models.find(m => m.id === model.id);
        Object.assign(updatedModel, model);
    },
    deleteModel(state, id) {
        state.models = state.models.filter(m => m.id !== id);
    },
    addNewModel(state, data) {
        state.models.unshift(data);
    }
};

const getters = {
    models(state) {
        return state.models;
    },
    model(state) {
        return state.model;
    }
};

const actions = {
    async createModel({ commit }) {
        const { title, description } = state.model;
        privateHTTP({
            url: `/api/models`,
            method: 'post',
            data: {
                title,
                description
            }
        }).then(res => {
            commit('modals/toggleModal', { name: 'productModelModal', bool: false }, { root: true });
            commit('addNewModel', res.data.data);
            commit('modals/setToastMessage', 'Модель успешно создана', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        });
    },
    updateModel({ commit, state }) {
        const { id, title, description } = state.model;

        privateHTTP({
            url: `/api/models/${id}`,
            method: 'put',
            data: {
                id,
                title,
                description
            }
        }).then(res => {
            commit('updateModel', res.data.data);
            commit('modals/setToastMessage', 'Модель успешно обновлена', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        })
    },
    deleteModel({ commit }) {
        privateHTTP({
            url: `/api/models/${state.model.id}`,
            method: 'delete',
            params: { id: state.model.id }
        }).then(res => {
            commit('deleteModel', state.model.id);
            commit('modals/setToastMessage', 'Модель успешно удалена', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        })
    },
    async getModels({ commit }, payload) {
        const params = payload && payload.params || {};
        publicHTTP({
            method: 'get',
            url: 'api/models/',
            params
        }).then(res => {
            commit('setModels', res.data);
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
