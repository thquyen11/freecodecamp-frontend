import {QUERY_RANDOM_QUOTE_SUCCESS, QUERY_RANDOM_QUOTE_FAIL} from './constans'

export const queryRandomQuote = () => (dispatch: any) => {
    // event.preventDefault();

    const api = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    fetch(api)
        .then(response => response.json())
        .then(object => {
            const quotes = object.quotes;
            const random = Math.floor(Math.random()*quotes.length);
            
            dispatch({
                type: QUERY_RANDOM_QUOTE_SUCCESS,
                payload: {
                    randomQuoteContent: quotes[random].quote as string,
                    randomQuoteAuthor: quotes[random].author as string
                }
            })
        })
        .catch(error => dispatch({type: QUERY_RANDOM_QUOTE_FAIL, payload: error}))
}

export const postTwitter = () => (dispatch:any)=>{
    
}