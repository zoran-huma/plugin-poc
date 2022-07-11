import { createApp } from 'vue';
import { createStore } from 'vuex';
import axios from 'axios';

import App from './App.vue';

import PocButton from 'poc-button';
import 'poc-button/dist/style.css';

const store = createStore({
  state() {
    return {
      plugins: [],
    };
  },
  mutations: {
    add_plugins(state, payload) {
      const s = state;

      s.plugins = payload;
    },
    update_plugin(state, payload) {
      const s = state;
      const updatedPlugin = payload;
      const pluginIndex = s.plugins.findIndex(
        (plugin) => plugin.id === updatedPlugin.id
      );
      s.plugins[pluginIndex] = updatedPlugin;
    },
  },
  actions: {
    getPlugins({ commit }) {
      axios
        .get(`http://localhost:8200/plugins`)
        .then((data) => {
          commit('add_plugins', data.data);
        })
        .catch((err) => console.log('err', err));
    },
    togglePlugin({ commit }, payload) {
      axios
        .put('http://localhost:8200/plugins', { id: payload })
        .then((data) => {
          commit('update_plugin', data.data);
        })
        .catch((err) => console.log('toggle plugin', err));
    },
  },
  getters: {
    pluginsGetter: (state) => state.plugins,
    enabledPluginsGetter: (state) =>
      state.plugins.filter((plugin) => plugin.enabled),
  },
});

createApp(App).use(store).use(PocButton).mount('#app');
