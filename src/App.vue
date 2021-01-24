<template>
  <div class="app">
    <visual-editor v-model="jsonData" :config="visualConfig" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { VisualEditor } from "@/packages/visual-editor";
import { visualConfig } from "@/visual.config";

export default defineComponent({
  name: "App",
  components: {
    VisualEditor,
  },
  data() {
    return {
      visualConfig,
      jsonData: {
        container: {
          height: 800,
          width: 500,
        },
        blocks: [
          {
            top: 100,
            left: 30,
          },
          {
            top: 150,
            left: 200,
          },
        ],
      },
    };
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
</style>