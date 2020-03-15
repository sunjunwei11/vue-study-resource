import Vue from 'vue';
import Vuex from '../../mvuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        doubleCount: state => {
            return state.count * 2;
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    },
    actions: {
        increment (context) {
            setTimeout(() => {
                context.commit('increment')
            }, 1000);
        }
    }
});

export default store;