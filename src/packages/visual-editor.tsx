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
        // 双向数据绑定
        const dataModel = useModel(() => props.modelValue, (val) => ctx.emit('update:modelValue', val))
        // container 节点 dom 对象的引用
        const containerRef = ref({} as HTMLDivElement)
        // container 节点的style对象
        const containerStyles = computed(() => ({
            width: `${dataModel.value.container.width}px`,
            height: `${dataModel.value.container.height}px`
        }))
        // 计算选中和未选中的 block 数据
        const focusData = computed(() => {
            const focus: VisurlEditorBlockData[] = []
            const unfocus: VisurlEditorBlockData[] = [];
            (dataModel.value.blocks || []).forEach((block: VisurlEditorBlockData) => ((block.focus ? focus : unfocus)).push(block))
            return {
                focus, // 选中的数据
                unfocus // 此时未选中的数据
            }
        })

        // 对外暴露的一些方法
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
        // 处理从菜单拖拽组件到容器的相关动作
        const menuDraggier = (() => { 
            let component = null as null | VisualEditorComponent
            /**
             *  container 容器注册监听当前拖拽事件
             */
            const containerHandler = {
                // 拖拽鼠标进入菜单的时候，设置鼠标为可放置的状态
                dragenter: (e: DragEvent) => {
                    e.dataTransfer&&(e.dataTransfer.dropEffect = 'move')
                },
                // 拖拽鼠标进入菜单的时候，禁用默认事件
                drageover: (e: DragEvent) => {
                    e.preventDefault()
                },
                // 拖拽鼠标离开容器的时候，设置鼠标为不可放置状态
                dragleave: (e: DragEvent) => {
                    e.dataTransfer&&(e.dataTransfer.dropEffect = 'none')
                },
                // 容器中释放鼠标的时候触发
                drop: (e: DragEvent) => {
                    const blocks = dataModel.value.blocks || []
                    blocks.push(createNewBlock({
                        component: component as VisualEditorComponent,
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

        // 处理block在container中拖拽移动的相关动作
        const blockDraggier = (() => {

            let dragState = {
                startX: 0,
                startY: 0,
                starPos: [] as { left: number; top: number }[],
            }

            const mouseMove = (e: MouseEvent) => {
                const durX = e.clientX - dragState.startX
                const durY = e.clientY - dragState.startY
                focusData.value.focus.forEach((block, index) => {
                    block.top = dragState.starPos[index].top + durY
                    block.left = dragState.starPos[index].left + durX
                })
            }

            const mouseUp = () => {
                document.removeEventListener('mousemove', mouseMove)
                document.removeEventListener('mouseup', mouseUp)
            }

            const mouseDown = (e: MouseEvent) => {
                dragState = {
                    startX: e.pageX,
                    startY: e.pageY,
                    starPos: focusData.value.focus.map(({ top, left }) => ({ top, left }))
                }
                document.addEventListener('mousemove', mouseMove)
                document.addEventListener('mouseup', mouseUp)
            }
            
           

            return {
                mouseDown
            }

        })()

        // 处理 block 选中的相关动作
        const focusHandler = (() => {
            return {
                container: {
                    onMousedown(e: MouseEvent) {
                        e.stopPropagation();
                        e.preventDefault();
                        // 点击空白处清空
                        methods.clearFoucs()
                    }
                },
                block: {
                    onMousedown(e: MouseEvent, block: VisurlEditorBlockData) {
                        e.stopPropagation();
                        e.preventDefault();
                        if (e.shiftKey) {
                            if(focusData.value.focus.length <= 1){
                                block.focus = true
                            }else{
                                block.focus= !block.focus
                            }
                        } else {
                            if(!block.focus){
                                block.focus = true
                                methods.clearFoucs(block)
                            }
                        }
                        blockDraggier.mouseDown(e)
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