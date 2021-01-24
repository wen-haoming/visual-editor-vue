import { computed, defineComponent, PropType } from 'vue'
import './visual-editor.scss'
import { VisualEditorConfig, VisualEditorModelValue } from '@/packages/visual-editor.utils'
import { useModel } from './utils/useModel'
import { VisualEditorBlock } from './visual-editor-block'


export const VisualEditor = defineComponent({
    props: {
        modelValue: {
            type: Object as PropType<VisualEditorModelValue>,
            required: true
        },
        config:{
            type:Object as PropType<VisualEditorConfig>,
            required:true
        }
    },
    emits: {
        'update:modelValue': (val?: VisualEditorModelValue) => val
    },
    setup(props, ctx) {

        const dataModel = useModel(() => props.modelValue, (val) => ctx.emit('update:modelValue', val))
        console.log(props.config);
        
        const containerStyles = computed(()=>({
            width:`${dataModel.value.container.width}px`,
            height:`${dataModel.value.container.height}px`
        }))

        return () => {
            return <>
                <div class="visual-editor">
                    <div class="visual-editor-menu">
                        {
                            props.config.componentList.map(component=> <div class="visual-editor-menu-item">
                                <span class="visual-editor-menu-item-label">
                                    {component.label}
                                </span>
                                {component.preview()}
                            </div> )
                        }
                    </div>
                    <div class="visual-editor-head">
                        head
                    </div>
                    <div class="visual-editor-operator">
                        operator
                    </div>
                    <div class="visual-editor-body">
                        <div class="visual-editor-content">
                            <div class="visual-editor-container" style={containerStyles.value}>
                                {
                                    dataModel.value.blocks.map((block, index) => {
                                        return <VisualEditorBlock block={block} key={index} />
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </>
        }
    }
})