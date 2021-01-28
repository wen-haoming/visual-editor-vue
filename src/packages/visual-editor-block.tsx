import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { VisualEditorConfig, VisurlEditorBlockData } from '@/packages/visual-editor.utils'


export const VisualEditorBlock = defineComponent({
    props: {
        block: { type: Object as PropType<VisurlEditorBlockData>, requried: true },
        config: { type: Object as PropType<VisualEditorConfig>, required: true }
    },
    setup(props) {
        const el = ref({} as HTMLDivElement)

        const classes = computed(() => [
            'visual-editor-block',
            {
                'visual-editor-block-focus': props.block?.focus
            }
        ])

        const styles = computed(() => ({
            top: `${props.block?.top}px`,
            left: `${props.block?.left}px`,
        }))

        onMounted(() => {
            const block = props.block
            if (block?.adjustPosition === true) {
                // 添加组件位置自动居中
                const { offsetWidth, offsetHeight } = el.value
                block.left = block.left - offsetWidth / 2
                block.top = block.top - offsetHeight / 2
                block.adjustPosition = false
            }
        })
        
        return () => {
            
            const component = props.config.componentMap[props.block!.componentKey]

            const Render = component.render()

            return <div class={classes.value} style={styles.value} ref={el}  >
                {Render}
            </div>
        }
    }
})