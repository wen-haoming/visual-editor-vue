import { reactive } from "vue"

export interface CommandExecute {
    undo: () => void;
    redo: () => void;
}
export interface Command {
    name: string;                              // 命令唯一标识
    keyboard?: string | string[];                  //  命令监听的快捷键
    execute: (...args: any[]) => CommandExecute;  // 命令被执行的时候，所做的内容
    followQueue?: boolean;                             // 命令执行之后，是否需要将命令执行到undo，redo 存入到命令队列
}

export interface CommandManager {
    queue: CommandExecute[];
    current: number;
}

export function useCommander() {
    const state = reactive({
        current: -1,
        queue: [] as CommandExecute[],
        commands: {} as Record<string, (...args: []) => void>
    })

    const registry = (command: Command) => {
        state.commands[command.name] = (...args) => {
            const { undo, redo } = command.execute(...args)
            state.queue.push({ undo, redo })
            state.current += 1
        }
    }

    registry({
        name: 'undo',
        keyboard: 'ctrl+z',
        followQueue: false,
        execute: () => {
            // 命令被执行的时候，要做的事情
            return {
                redo: () => {
                    // 重新做一遍，要做事情
                    const { current } = state
                    if (current === -1) return
                    const { undo } = state.queue[current]
                    !!undo && undo();
                    state.current -= 1
                },
                undo: () => {
                    //  将做的事情还原
                },

            }
        }
    })

    return {
        state,
        registry
    }
}