import axios from 'axios';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded'

const createEmptyOrder = () => {
    return {
        id: '',
        phone: '',
        title: '',
        description: ''
    }
};

const state = {
    order: createEmptyOrder()
};

const mutations = {
    setOrder(state, { id, title, description }) {
        state.order = { 
            ...state.order, 
            id,
            title,
            description 
        };
    },
    setPhone(state, phone) {
        state.phone = phone;
    },
    clearOrder(state) {
        state.order = createEmptyOrder();
    }
};

const getters = {
    order(state) {
        return state.order;
    }
};

const actions = {

    async makeOrder({ state, commit }, phone) {
        const url = 'https://api.trello.com/1/cards';
        const orderMessage = 'id: ' + state.order.id + 'Наименование: ' + state.order.title + 'Описание: ' + state.order.description;

        const qs = {
            name: phone,
            desc: orderMessage,
            pos: 'bottom',
            idList: '5d063c6c414b4355e593aa79',
            idMembers: '5c1ecd3be3f04424b80bb26b',
            keepFromSource: 'all',
            key: '8f8bdc084c598239903b33ddf9a06bca',
            token: 'a59594d1e3fb7432f4d94d8bd1870535770fdd07c3490826b0359cbe09e4ac70'
        }
        try {
            const { status } = await axios.post(
                url, 
                qs, 
                { crossdomain: true }
            );
            if(status === 200) {
                commit('modals/toggleModal', { name: 'orderModal', bool: false }, { root: true });
                commit('modals/toggleModal', { name: 'orderSuccess', bool: true }, { root: true });
            }
        } catch (e) {
            console.log(e);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
