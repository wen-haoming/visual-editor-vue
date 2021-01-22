<template>
    <div class="app">
        <visual-editor/>  
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import {VisualEditor} from '@/packages/visual-editor'
export default defineComponent({
  name:'App',
  components:{
    VisualEditor
  }
})
</script>

<style lang="scss">
html,body{
  margin:0;
  padding:0;
}
</style>