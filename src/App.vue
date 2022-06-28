<template>
  <div><h1>Host app</h1></div>
  <div>
    <h1>Display Plugins below:</h1>
    <component :is="plugins[pluginToShow]" />
    <button @click="togglePlugin">Toggle Plugin</button>
  </div>
</template>

<script>
import { computed, defineAsyncComponent, ref } from 'vue';
import externalComponent from './utils/external-component';

export default {
  setup() {
    // Mock plugin list from server
    const pluginList = [
      {
        key: 'plugin1',
        name: 'Plugin 1',
        hash: '9a885c361fb6ff6f',
      },
      {
        key: 'plugin2',
        name: 'Plugin 2',
        hash: '9ed5fbd6c7e09a40',
      },
    ];
    // Fetch the plugin build file from server
    const plugins = computed(() =>
      pluginList.map((plugin) => {
        return defineAsyncComponent(() =>
          externalComponent(
            `http://localhost:8200/${plugin.key}.${plugin.hash}.umd.min.js`
          )
        );
      })
    );
    const pluginToShow = ref(0);
    const togglePlugin = () => {
      pluginToShow.value = pluginToShow.value == 1 ? 0 : 1;
    };

    return {
      pluginList,
      plugins,
      pluginToShow,
      togglePlugin,
    };
  },
};
</script>
