<template>
  <div>
    <h1>Host app</h1>
  </div>
  <div>
    <div>
      <h1>List of all plugins</h1>
      <div v-for="plugin in pluginListFromServer" :key="plugin.key">
        {{ plugin.name }}
        <input
          type="checkbox"
          :checked="plugin.enabled"
          :id="plugin.id"
          class="mr-2 hidden"
          @input="(event) => setChecked(event)"
        />
      </div>
    </div>

    <div>
      <h1>List of all ENABLED plugins</h1>
      <div v-for="plugin in pluginListFromServer" :key="plugin.key">
        {{ plugin.name }} {{ isEnabled(plugin) }}
      </div>
    </div>

    <h1>Display Plugins below:</h1>

    <div
      class="plugin-wrapper"
      v-for="plugin in enabledPluginListFromServer"
      :key="plugin.id"
    >
      <component :is="plugins[pluginToShow(plugin.id)]" />
    </div>
  </div>
</template>

<script>
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import externalComponent from './utils/external-component';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const pluginListFromServer = computed(() => {
      return store.getters.pluginsGetter;
    });
    const enabledPluginListFromServer = computed(() => {
      return store.getters.enabledPluginsGetter;
    });
    const plugins = computed(() =>
      pluginListFromServer.value.map((plugin) => {
        return defineAsyncComponent(() =>
          externalComponent(
            `http://localhost:8200/${plugin.key}.${plugin.hash}.umd.min.js`,
            `http://localhost:8200/${plugin.key}.${plugin.hash}.css`
          )
        );
      })
    );
    const pluginToShow = (id) => {
      const pluginIndex = pluginListFromServer.value.findIndex(
        (plugin) => plugin.id === id
      );

      return pluginIndex;
    };
    const setChecked = (event) => {
      store.dispatch('togglePlugin', event.target.id);
    };
    const isEnabled = (plugin) => {
      return plugin.enabled ? 'ENABLED' : 'DISABLED';
    };

    // Lifecycle
    onMounted(() => {
      store.dispatch('getPlugins');
    });

    return {
      enabledPluginListFromServer,
      pluginListFromServer,
      plugins,
      pluginToShow,
      // Methods
      setChecked,
      isEnabled,
      // Store actions
      togglePlugin: (id) => store.dispatch('togglePlugin', id),
    };
  },
};
</script>
<style scoped>
.plugin-wrapper {
  margin: 2rem;
}
</style>
