import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {createStore,applyMiddleware,combineReducers} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FCCProjects from './containers/FCCProjects/cFCCProjects';
import { Authenticate, Profile } from './containers/FCCProjects/rFCCProjects';
import { RandomQuote } from "./containers/QuoteMachine/rQuoteMachine";
import { Markdown, Zoom } from "./containers/MarkdownPreviewer/rMarkdownPreviewer";
import { Drum } from "./containers/Drum/rDrum";
import { Calculator } from "./containers/Calculator/rCalculator";
import { Clock } from "./containers/Clock/rClock";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger();

const rootReducers = combineReducers({
  Authenticate,
  Profile,
  RandomQuote,
  Markdown,
  Zoom,
  Drum,
  Calculator,
  Clock,
});

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
);

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={FCCProjects} />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.querySelector('#root') as HTMLElement
);
registerServiceWorker();
