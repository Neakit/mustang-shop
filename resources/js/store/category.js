import { privateHTTP, publicHTTP } from '../services';
import router from '../router';

const createEmptyCategory = () => {
    return {
        id: 0,
        title: '',
        description: ''
    }
};

const state = {
    categories: [],
    category: createEmptyCategory()
};

const mutations = {
    setCategories(state, payload) {
        state.categories = payload;
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
    },
    deleteCategory(state, id) {
        state.categories = state.categories.filter(p => p.id !== id);
    }
};

const getters = {
    categories(state) {
        return state.categories;
    },
    category(state) {
        return state.category;
    }
};

const actions = {
    createCategory({ commit }) {
        const { title, description } = state.category;
        privateHTTP({
            url: `/api/categories`,
            method: 'post',
            data: {
                title,
                description
            }
        }).then(res => {
            commit('modals/toggleModal', { name: 'categoryModal', bool: false }, { root: true });
            commit('addNewCategory', res.data.data);
            commit('modals/setToastMessage', 'Категория успешно создана', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        })
    },
    updateCategory({ commit }) {
        const { id, title, description } = state.category;

        privateHTTP({
            url: `/api/categories/${id}`,
            method: 'put',
            data: {
                id,
                title,
                description
            }
        }).then(res => {
            commit('updateCategory', res.data.data);
            commit('modals/setToastMessage', 'Категория успешно обновлена', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        })
    },
    deleteCategory({ commit }) {
        privateHTTP({
            url: `/api/categories/${state.category.id}`,
            method: 'delete',
            params: { id: state.category.id }
        }).then(res => {
            commit('deleteCategory', state.category.id);
            commit('modals/setToastMessage', 'Категория успешно удалена', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        })
    },
    async getCategories({ commit }, payload) {
        const params = payload && payload.params || {};
        const { data } = await publicHTTP({
            method: 'get',
            url: 'api/categories/',
            params
        });
        commit('setCategories', data);
    },
   
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
