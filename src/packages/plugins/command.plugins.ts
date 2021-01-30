import { reactive, onUnmounted } from 'vue'

export interface CommandExecute {
    undo?: () => void;
    redo?: () => void;
}

export interface Command {
    name: string;                                     // 命令唯一标识Î
    keyboard?: string | string[];                     // 命令监听的快捷
    execute: (...args: any[]) => CommandExecute;      // 命令被执行的时候，所做的内容
    followQueue?: boolean;                            // 命令执行完之后 是否需要将命令执行得到的undo，redo存入命令队列
    init?: () => (() => void | undefined);            // 命令初始化函数
    date?: any;                                       // 命令缓存所需要的数据
}

export function useCommander() {
    const state = reactive({
        current: -1,                      // 队列中当前的命令
        queue: [] as CommandExecute[],   // 命令队列
        commandArray:[] as Command[],    // 命令对象数组
        commands:{} as Record<string,(...args: any[]) => void>, // 命令对象，方便通过命令的名称调用命令的execute函数，并且执行额外的命令队列的逻辑
        destroyList:[] as ( () => void | undefined )[] // 组件销毁的时候，需要调用的销毁逻辑数组
    })

    const registry = (command: Command)=>{
        state.commandArray.push(command)
        state.commands[command.name] = (...args: any)=>{
            const {undo, redo} = command.execute(...args)
            redo&&redo()
            // 命令执行之后，不需要进入命令队列，则直接结束
            if(command.followQueue === false){
                return  
            }
            const {current} = state
            if(state.queue.length > 0){
                state.queue  = state.queue.slice(0,current+1)
            }
            state.queue.push({undo,redo})
            state.current = current + 1;
        }
    }

    /**
     * 初始化函数，负责初始化键盘监听事件，调用命令初始化逻辑
     */
    const init = ()=>{
        const onKeydown = (e: KeyboardEvent)=>{
            console.log('监听键盘事件',e)
        }
        window.addEventListener('keydown',onKeydown)
        state.commandArray.forEach(command=> !!command.init && state.destroyList.push(command.init()))
        state.destroyList.push(()=> window.removeEventListener('keydown',onKeydown))
    }

    registry({
        name:'undo',
        keyboard:'ctrl+z',
        followQueue:false,
        execute:()=>{
            return {
                redo:()=>{
                    if(state.current === -1){
                        return 
                    }
                    const queueItem = state.queue[state.current]
                    if(queueItem){
                        !!queueItem.undo && queueItem.undo()
                        state.current --
                    }
                }
            }
        }
    })

    registry({
        name: 'redo',
        keyboard: [
            'ctrl+y',
            'ctrl+shift+z',
        ],
        followQueue: false,
        execute: () => {
            return {
                redo: () => {
                    const queueItem = state.queue[state.current + 1]
                    if (queueItem) {
                        queueItem.redo&&queueItem.redo()
                        state.current++
                    }
                },
            }
        },
    })

    onUnmounted(() => state.destroyList.forEach(fn => !!fn && fn()))

    return {
        state,
        registry,
        init,
    }

}
