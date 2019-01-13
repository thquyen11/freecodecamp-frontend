import{ CLOCK_EDIT_LENGTH, CLOCK_START_PAUSE, CLOCK_RESET, CLOCK_DECREASE_TIMER, CLOCK_UPDATE_INTERVALID, CLOCK_SWITCH_TIMERTYPE, CLOCK_UPDATE_TIMER } from "./constans";



export const updateTimer=()=>{
    return{
        type: CLOCK_UPDATE_TIMER,
    }
}

export const onClick =(event:any, runStatus?: string)=>{
    const id = event.target.id;

    if(id==="start_stop"){
        return{
            type: CLOCK_START_PAUSE,
            payload: runStatus,
        }
    } else if(id==="reset"){
        return{
            type: CLOCK_RESET
        }
    } else{
        return{
            type: CLOCK_EDIT_LENGTH,
            payload: id,
        }
    }
}

export const decreaseTimer=(minute: number)=>{
    return{
        type: CLOCK_DECREASE_TIMER,
        payload: minute,
    }
}

export const dispatchIntervalID=(id: any)=>{
    return{
        type: CLOCK_UPDATE_INTERVALID,
        payload: id,
    }
}

export const switchTimerType=(type: string, length: number)=>{
    return{
        type: CLOCK_SWITCH_TIMERTYPE,
        payload: {
            type: type,
            timerLength: length,
        }
    }
}
