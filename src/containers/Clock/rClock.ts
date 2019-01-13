import{ CLOCK_EDIT_LENGTH, CLOCK_START_PAUSE, CLOCK_RESET, CLOCK_DECREASE_TIMER, CLOCK_UPDATE_INTERVALID, CLOCK_SWITCH_TIMERTYPE, CLOCK_UPDATE_TIMER } from "./constans";



const initialClock={
    runStatus: "stop",
    sessionLength: 25,
    timerType: "session",
    breakLength: 5,
    intervalID: '',
    timer: 25*60,
}

export const Clock = (state:any=initialClock, action:any = {})=>{
    switch(action.type){
        case CLOCK_START_PAUSE:
            return Object.assign({}, state, { runStatus: action.payload })

        case CLOCK_RESET:
            return initialClock;

        case CLOCK_EDIT_LENGTH:
            const id = action.payload;
            if(id==="break-increment"){
                return state.breakLength===60? state : Object.assign({}, state, { breakLength: state.breakLength+1 })
            } else if(id==="break-decrement"){
                return state.breakLength===1? state : Object.assign({}, state, { breakLength: state.breakLength-1 })
            } else if(id==="session-increment"){
                return state.sessionLength===60? state: Object.assign({}, state, { sessionLength: state.sessionLength+1 })
            } else if(id==="session-decrement"){
                return state.sessionLength===1? state: Object.assign({}, state, { sessionLength: state.sessionLength-1 })
            }
        
        case CLOCK_UPDATE_TIMER:
            return Object.assign({}, state, { timer: state.sessionLength*60 })

        case CLOCK_DECREASE_TIMER:
            return Object.assign({}, state, { timer: state.timer - action.payload })

        case CLOCK_UPDATE_INTERVALID:
            return Object.assign({}, state, { intervalID: action.payload })

        case CLOCK_SWITCH_TIMERTYPE:
            return Object.assign({}, state, { timerType: action.payload.type, timer: action.payload.timerLength*60 })

        default:
            return state;
    }
}