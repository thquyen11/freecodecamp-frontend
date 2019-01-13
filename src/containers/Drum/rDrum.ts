import { DRUM_UPDATE_CLIPID } from "./constans"



const initialDrum={
    clipId: "",
}

export const Drum = (state:any=initialDrum, action:any={})=>{
    switch(action.type){
        case DRUM_UPDATE_CLIPID:
            return Object.assign({}, state, { clipId: action.payload })
        default:
            return state;
    }
}