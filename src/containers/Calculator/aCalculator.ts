import { CALCULATOR_INSERT_NUMBER, CALCULATOR_INSERT_EQUALS, CALCULATOR_INSERT_UNDO
    ,  CALCULATOR_INSERT_C, CALCULATOR_INSERT_ERROR } from "./constans";



export const onInput=(event: any)=>{
    const value = event.target.value;
    const C = "C";
    const Undo = "undo";
    const Equals = "=";

    if(value===C){
        return{
            type: CALCULATOR_INSERT_C,
            payload: value,
        }
    } else if(value===Undo){
        return{
            type: CALCULATOR_INSERT_UNDO,
            payload: value,
        }
    } else if(value===Equals){
        return{
            type: CALCULATOR_INSERT_EQUALS,
            payload: value,
        }
    } else {
        return{
            type: CALCULATOR_INSERT_NUMBER,
            payload: value,
        }
    }
    //catch unexpected 
    return {
        type: CALCULATOR_INSERT_ERROR,
        payload: "",
    }
}