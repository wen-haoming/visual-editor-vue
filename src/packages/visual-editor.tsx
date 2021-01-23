import { computed, defineComponent, PropType } from 'vue'
import './visual-editor.scss'
import { VisualEditorModelValue } from '@/packages/visual-editor.utils'
import { useModel } from './utils/useModel'
import { VisualEditorBlock } from './visual-editor-block'


export const VisualEditor = defineComponent({
    props: {
        modelValue: {
            type: Object as PropType<VisualEditorModelValue>,
            required: true
        }
    },
    emits: {
        'update:modelValue': (val?: VisualEditorModelValue) => val
    },
    setup(props, ctx) {

        const dataModel = useModel(() => props.modelValue, (val) => ctx.emit('update:modelValue', val))

        const containerStyles = computed(()=>({
            width:`${dataModel.value.container.width}px`,
            height:`${dataModel.value.container.height}px`
        }))

        return () => {
            return <>
                <div class="visual-editor">
                    <div class="visual-editor-menu">
                        menu
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