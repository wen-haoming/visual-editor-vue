import { computed, defineComponent, PropType, ref } from 'vue'
import './visual-editor.scss'
import { VisualEditorComponent, VisualEditorConfig, VisualEditorModelValue } from '@/packages/visual-editor.utils'
import { useModel } from './utils/useModel'
import { VisualEditorBlock } from './visual-editor-block'


export const VisualEditor = defineComponent({
    props: {
        modelValue: {
            type: Object as PropType<VisualEditorModelValue>,
            required: true
        },
        config: {
            type: Object as PropType<VisualEditorConfig>,
            required: true
        }
    },
    emits: {
        'update:modelValue': (val?: VisualEditorModelValue) => val
    },
    setup(props, ctx) {

        const dataModel = useModel(() => props.modelValue, (val) => ctx.emit('update:modelValue', val))
        const containerRef = ref({} as HTMLDivElement)

        const containerStyles = computed(() => ({
            width: `${dataModel.value.container.width}px`,
            height: `${dataModel.value.container.height}px`
        }))

        const menuDraggier = {
            current: {
                component: null as null | VisualEditorComponent
            },
            dragstart: (e: DragEvent, component: VisualEditorComponent) => {
                containerRef.value.addEventListener('dragenter', menuDraggier.dragenter)
                containerRef.value.addEventListener('dragover', menuDraggier.drageover)
                containerRef.value.addEventListener('dragleave', menuDraggier.dragleave)
                containerRef.value.addEventListener('drop', menuDraggier.drop)

                menuDraggier.current.component = component
                
            },
            dragenter: (e: DragEvent) => {
                e.dataTransfer!.dropEffect = 'move'
            },
            drageover: (e: DragEvent) => {
                e.preventDefault()
            },
            dragleave: (e: DragEvent) => {
                e.dataTransfer!.dropEffect = 'none'
            },
            dragend:(e: DragEvent)=>{
                containerRef.value.removeEventListener('dragenter',menuDraggier.dragenter)
                containerRef.value.removeEventListener('dragover',menuDraggier.drageover)
                containerRef.value.removeEventListener('dragleave',menuDraggier.dragleave)
                containerRef.value.removeEventListener('drop',menuDraggier.drop)

                menuDraggier.current.component = null
            },
            drop: (e: DragEvent) => {
                const blocks = dataModel.value.blocks || []
                blocks.push({
                    top:e.offsetY,
                    left:e.offsetX
                })
                dataModel.value = {
                    ...dataModel.value,
                    blocks
                }
            }
        }

        return () => {
            return <>
                <div class="visual-editor">
                    <div class="visual-editor-menu">
                        {
                            props.config.componentList.map(component => (
                                <div class="visual-editor-menu-item" 
                                draggable
                                onDragend={menuDraggier.dragend} 
                                onDragstart={(e) => menuDraggier.dragstart(e, component)}
                                onDrop={menuDraggier.drop}
                                >
                                    <span class="visual-editor-menu-item-label">
                                        {component.label}
                                    </span>
                                    {component.preview()}
                                </div>)
                            )
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
                            <div class="visual-editor-container" style={containerStyles.value} ref={containerRef}>
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