import { computed, defineComponent, PropType } from 'vue'
import {VisualEditorConfig, VisurlEditorBlockData} from '@/packages/visual-editor.utils'


export const VisualEditorBlock = defineComponent({
    props:{
        block:{type:Object as PropType<VisurlEditorBlockData>, requried:true },
        config:{type:Object as PropType<VisualEditorConfig>,required:true}
    },
    setup(props){

        const styles = computed(()=>({
            top:`${props.block?.top}px`,
            left:`${props.block?.left}px`,
        }))
        
        return ()=>{

            const component = props.config.componentMap[props.block!.componentKey]
            console.log(props,'===');
            
            const Render = component.render()

            return <div class="visual-editor-block" style={styles.value}>
                {Render}
            </div>
        }
    }
})