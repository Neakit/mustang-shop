import { privateHTTP, publicHTTP } from '../services';
import router from '../router';

const createEmptyProduct = () => {
    return {
        id: '',
        image: '',
        title: '',
        category_id: '',
        product_model_id: '',
        status_id: '',
        description: '',
        price: ''
    }
};

const state = {
    products: {},
    product: createEmptyProduct()
};

const mutations = {
    setProducts(state, payload) {
        state.products = payload;
    },
    setProduct(state, payload) {
        state.product = payload;
    },
    clearProduct() {
        state.product = createEmptyProduct();
    },
    setProductProp(state, { key, value }) {
        state.product[key] = value;
    },
    deleteProduct(state, id) {
        state.products.data = state.products.data.filter(p => p.id !== id);
    },
    addNewProduct(state, product) {
        state.products.data.push(product);
    },
    updateProduct(state, product) {
        let updatedPropduct = state.products.data.find(p => p.id === product.id);
        Object.assign(updatedPropduct, product);
    },
};

const getters = {
    products(state) {
        return state.products;
    },
    product(state) {
        return state.product;
    }
};

const actions = {
    getProducts({ commit }, payload) {
        const params = payload && payload.params || {};

        publicHTTP({
            method: 'get',
            url: 'api/products/',
            params
        }).then(res => {
            commit('setProducts', res.data);
        })
    },
    async createProduct({ commit }) {
        const product = state.product;
        privateHTTP({
            url: `/api/products/`,
            method: 'post',
            data: { ...product }
        }).then(res => {
            commit('addNewProduct', res.data.data);
            commit('modals/setToastMessage', 'Продукт успешно создан', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        });
    },
    updateProduct({ commit }) {
        const product = state.product;
        privateHTTP({
            url: `/api/products/${product.id}`,
            method: 'put',
            data: { ...product }
        }).then(res => {
            commit('updateProduct', res.data.data);
            commit('modals/setToastMessage', 'Продукт успешно обновлен', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
        }).catch(e => {
            if(e.response.status === 401) {
                router.push('/admin/login');
            }
        })
    },
    deleteProduct({ commit }) {
        privateHTTP({
            url: `/api/products/${state.product.id}`,
            method: 'delete',
            params: { id: state.product.id }
        }).then(res => {
            commit('deleteProduct', state.product.id);
            commit('modals/setToastMessage', 'Продукт успешно удален', { root: true });
            commit('modals/toggleModal', { name: 'toastModal', bool: true }, { root: true });
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
