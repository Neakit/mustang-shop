import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
        state: {
            layout: 'default'
        },
        getters: {
            layout(state) {
                return state.layout
            }
        },
        mutations: {
            setLayout(state, payload) {
                state.layout = payload || state.layout;
            }
        }
    }
);
