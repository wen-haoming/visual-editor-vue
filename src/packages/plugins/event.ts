type SimgplyListener = () => void

export function createEvent(){
    let listeners: SimgplyListener[] = []
    return {
        on(cb: SimgplyListener){
            listeners.push(cb)
        },
        off(cb: SimgplyListener){
            listeners = listeners.filter((itemCb)=> itemCb !== cb )
        },
        emit(){
            listeners.forEach(item=>item())
        }
    }
}