import { DRUM_UPDATE_CLIPID } from "./constans"



export const updateClipId=(clipId:string)=>{
    return{
        type: DRUM_UPDATE_CLIPID,
        payload: clipId,
    }
}