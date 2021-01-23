<template>
    <div class="app">
      <test-useModel v-model="val" />
      val:{{val}}
        <!-- <visual-editor/>   -->
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import {VisualEditor} from '@/packages/visual-editor'
import {TestUseModel} from '@/packages/utils/useModel'
export default defineComponent({
  name:'App',
  components:{
    // VisualEditor,
    TestUseModel
  },
  data(){
    return {
      val:''
    }
  }
})
</script>

<style lang="scss">
html,body{
  margin:0;
  padding:0;
}
</style>