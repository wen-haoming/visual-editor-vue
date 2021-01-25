import { computed, defineComponent, PropType, ref } from 'vue'
import './visual-editor.scss'
import { VisualEditorComponent, VisualEditorConfig, VisualEditorModelValue, createNewBlock, VisurlEditorBlockData } from '@/packages/visual-editor.utils'
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

        const methods = {
            clearFoucs: (block?: VisurlEditorBlockData) => {
                let blocks = (dataModel.value.blocks || [])
                if (blocks.length === 0) return
                if (blocks) {
                    blocks = blocks.filter(item => item !== block)
                }
                blocks.forEach(block => block.focus = false)
            }
        }

        const menuDraggier = (() => {
            let component = null as null | VisualEditorComponent
            /**
             *  container 容器注册监听当前拖拽事件
             */
            const containerHandler = {
                // 拖拽鼠标进入菜单的时候，设置鼠标为可放置的状态
                dragenter: (e: DragEvent) => {
                    e.dataTransfer!.dropEffect = 'move'
                },
                // 拖拽鼠标进入菜单的时候，禁用默认事件
                drageover: (e: DragEvent) => {
                    e.preventDefault()
                },
                // 拖拽鼠标离开容器的时候，设置鼠标为不可放置状态
                dragleave: (e: DragEvent) => {
                    e.dataTransfer!.dropEffect = 'none'
                },
                // 容器中释放鼠标的时候触发
                drop: (e: DragEvent) => {
                    const blocks = dataModel.value.blocks || []
                    blocks.push(createNewBlock({
                        component: component!,
                        left: e.offsetX,
                        top: e.offsetY
                    }))
                    dataModel.value = {
                        ...dataModel.value,
                        blocks
                    }
                }
            }
            /**
             *  每个menu 组件注册拖拽事件
             */
            const blockHandler = {
                dragstart: (e: DragEvent, current: VisualEditorComponent) => {
                    console.log(e);
                    containerRef.value.addEventListener('dragenter', containerHandler.dragenter)
                    containerRef.value.addEventListener('dragover', containerHandler.drageover)
                    containerRef.value.addEventListener('dragleave', containerHandler.dragleave)
                    containerRef.value.addEventListener('drop', containerHandler.drop)
                    component = current
                },
                dragend: (e: DragEvent) => {
                    console.log(e);
                    containerRef.value.removeEventListener('dragenter', containerHandler.dragenter)
                    containerRef.value.removeEventListener('dragover', containerHandler.drageover)
                    containerRef.value.removeEventListener('dragleave', containerHandler.dragleave)
                    containerRef.value.removeEventListener('drop', containerHandler.drop)
                    component = null
                }
            }
            return blockHandler
        })()


        const focusHandler = (() => {
            return {
                container: {
                    onMousedown(e: MouseEvent) {
                        e.stopPropagation();
                        e.preventDefault();
                        methods.clearFoucs()

                    }
                },
                block: {
                    onMousedown(e: MouseEvent, block: VisurlEditorBlockData) {
                        e.stopPropagation();
                        e.preventDefault();
                        if (e.shiftKey) {
                            block.focus = !block.focus
                        } else {
                            block.focus = true
                            methods.clearFoucs(block)
                        }

                    }
                }
            }
        })()

        return () => {
            return <>
                <div class="visual-editor">
                    <div class="visual-editor-menu">
                        {
                            props.config.componentList.map(component => (
                                <div class="visual-editor-menu-item"
                                    draggable
                                    onDragstart={(e) => menuDraggier.dragstart(e, component)}
                                    onDragend={menuDraggier.dragend}
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
                            <div
                                class="visual-editor-container"
                                style={containerStyles.value}
                                ref={containerRef}
                                {...focusHandler.container}
                            >
                                {
                                    dataModel.value.blocks.map((block, index) => {
                                        return <VisualEditorBlock
                                            config={props.config}
                                            block={block}
                                            key={index}
                                            {...{
                                                onMousedown(e: MouseEvent) { focusHandler.block.onMousedown(e, block) }
                                            }}
                                        />
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