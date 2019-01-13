import * as React from "react";
import { connect } from "react-redux";
import { queryRandomQuote, postTwitter } from "./aQuoteMachine";
import './cQuoteMachine.css';



interface StateProps{
  quoteContent: string;
  quoteAuthor: string;
}

const mapStateToProps = (state: any): StateProps => {
  return{
    quoteContent: state.RandomQuote.randomQuoteContent,
    quoteAuthor: state.RandomQuote.randomQuoteAuthor,
  }
}

interface DispatchProps{
  queryRandomQuote: typeof queryRandomQuote;
  postTwitter: typeof postTwitter;
}

const mapDispatchToProps = (dispatch:any): DispatchProps => {
  return{
    queryRandomQuote: () => dispatch(queryRandomQuote()),
    postTwitter: ()=> dispatch(postTwitter()),
  }
}

interface Props extends StateProps, DispatchProps{
}

export class QuoteMachine extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const { quoteContent, quoteAuthor, queryRandomQuote } = this.props;
    const tweeting: string = "https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text="+encodeURIComponent(quoteContent);

    return (
        <div id="quote-machine-wrapper">
          <div className="container col-md-4 p-5" id="quote-box">
            <div className="text-center" id="text">
              <h3>{quoteContent}</h3>
            </div>
            <div className="text-right" id="author">
              <p>- {quoteAuthor}</p>
            </div>
            <div className="row" id="buttons">
              <a className="button" id="tweet-quote" title="Tweet this quote!" target="_blank" href={tweeting}>
                <i className="fab fa-3x fa-twitter"></i>
              </a>
              <input id="new-quote" type="button" onClick={queryRandomQuote} value="New quote" className="btn btn-primary" />
            </div>
            </div>
          <div className="text-center my-2"><p>by Quyen</p></div>
        </div>
    );
  }

  componentDidMount() {
    this.props.queryRandomQuote();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);

