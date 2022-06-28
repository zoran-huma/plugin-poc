<template>
  <h1>Plugin 2</h1>
  <div>{{ someVar }} {{ text }}</div>
  <input :value="text" @input="(event) => (text = event.target.value)" />
</template>

<script>
export default {
  name: 'PluginComponent',
  data() {
    return {
      someVar: 'Check if this is working',
      text: 'Some text',
    };
  },
};
</script>

<style lang="scss" scoped></style>
