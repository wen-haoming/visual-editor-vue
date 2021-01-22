import { defineComponent } from 'vue'
import './visual-editor.scss'

export const VisualEditor = defineComponent({
    props: {},
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