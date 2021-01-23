import { defineComponent, PropType } from 'vue'
import './visual-editor.scss'
import { VisualEditorModelValue } from '@/packages/visual-editor.utils'

export const VisualEditor = defineComponent({
    props: {
        modelValue: {
            type: Object as PropType<VisualEditorModelValue>
        }
    },
    emits: {
        'update:modelValue': (val?: VisualEditorModelValue) => true
    },
    setup() {
        
        

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
                            content
                    </div>
                    </div>

                </div>
            </>
        }
    }
})