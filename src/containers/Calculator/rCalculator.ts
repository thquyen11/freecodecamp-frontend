import { CALCULATOR_INSERT_NUMBER, CALCULATOR_INSERT_EQUALS, CALCULATOR_INSERT_UNDO
    , CALCULATOR_INSERT_C, CALCULATOR_INSERT_ERROR } from "./constans";



const initialCalculator={
    display: "0" as string,
    toCalculate: "" as string,
}

export const Calculator = (state=initialCalculator, action:any={})=>{

    switch(action.type){
        case CALCULATOR_INSERT_NUMBER:
            //remove unexpected first zero number
            if(state.display[0]==="0"){
                state.display = state.display.slice(1);
            }
            if(state.toCalculate[0]==="0"){
                state.toCalculate = state.toCalculate.slice(1);
            }

            if(action.payload==="+"||action.payload==="-"||action.payload==="*"||action.payload==="/"){
                const lastChar = state.toCalculate.charAt(state.toCalculate.length-1);
                if(lastChar==="+"||lastChar==="-"||lastChar==="*"||lastChar==="/"){
                    state.toCalculate = state.toCalculate.slice(0,state.toCalculate.length-1);
                }
                return Object.assign({}, state, { display: action.payload, toCalculate: state.toCalculate + action.payload })
            } else if(action.payload==="."&&state.display.indexOf(action.payload)!==-1){
                return state;
            } else{
                return Object.assign({}, state, { display: state.display+action.payload, toCalculate: state.toCalculate + action.payload })
            }

        case CALCULATOR_INSERT_EQUALS:
                const result = eval(state.toCalculate).toString();
                return Object.assign({}, state, { display: result, toCalculate: result })
            
        case CALCULATOR_INSERT_C:
            return Object.assign({}, state, { display: "0", toCalculate: "" } )

        case CALCULATOR_INSERT_UNDO:
            const toCalculateUndo = state.toCalculate.slice(0, state.toCalculate.length-1);
            return Object.assign({}, state, { toCalculate: toCalculateUndo })

        case CALCULATOR_INSERT_ERROR:
            return state;

        default:
            return state;
    }
}