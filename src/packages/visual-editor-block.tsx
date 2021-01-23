import { computed, defineComponent, PropType } from 'vue'
import {VisurlEditorBlockData} from '@/packages/visual-editor.utils'


export const VisualEditorBlock = defineComponent({
    props:{
        block:{type:Object as PropType<VisurlEditorBlockData>, requried:true }
    },
    setup(props){

        const styles = computed(()=>({
            top:`${props.block?.top}px`,
            left:`${props.block?.left}px`,
        }))
        
        return ()=>{
            return <div class="visual-editor-block" style={styles.value}>
                这个是一条block
            </div>
        }
    }
})