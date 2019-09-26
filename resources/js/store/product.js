import { privateHTTP, publicHTTP } from '../services';
import router from '../router';

const createEmptyProduct = () => {
    return {
        id: '',
        image: '',
        images: [],
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
    setProducts(state, products) {
        products.data = products.data.map(i => {
            if(i.images !== null) {
                i.images = JSON.parse(i.images);
            }
            return i
        });
        state.products = products;
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
        product.images = JSON.parse(product.images);
        state.products.data.push(product);
    },
    updateProduct(state, product) {
        let updatedPropduct = state.products.data.find(p => p.id === product.id);
        Object.assign(updatedPropduct, product);
    },
    addImages(state, payload) {
        if(state.product.images === null) {
            state.product.images = [];
        }
        state.product.images.push(payload);
    },
    removeImage(state, index) {
        const newImages = state.product.images.filter((image, i) => {
            return i !== index;
        });
        state.product.images = newImages;
    }
};

const getters = {
    products(state) {
        return state.products;
    },
    product(state) {
        if(state.product.images !== null && typeof(state.product.images) === 'string') {
            state.product.images = JSON.parse(state.product.images);
            return state.product;
        }
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
        product.images = JSON.stringify(product.images);
        privateHTTP({
            url: 'api/products',
            method: 'post',
            data: { ...product }
        }).then(res => {
            commit('modals/toggleModal', { name: 'productModal', bool: false }, { root: true });
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
        product.images = JSON.stringify(product.images);
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
