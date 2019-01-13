import {QUERY_RANDOM_QUOTE_SUCCESS, QUERY_RANDOM_QUOTE_FAIL} from './constans'


const initialRandomQuote = {
    randomQuoteContent: "",
    randomQuoteAuthor: ""
}

export const RandomQuote = (state = initialRandomQuote, action:any = {}) => {
    switch(action.type){
        case QUERY_RANDOM_QUOTE_SUCCESS:
            return Object.assign({}, state, {randomQuoteContent: action.payload.randomQuoteContent, randomQuoteAuthor: action.payload.randomQuoteAuthor})
        case QUERY_RANDOM_QUOTE_FAIL:
            return Object.assign({}, state, {randomQuoteContent: "", randomQuoteAuthor: ""})         
        default:
            return state;
    }
}