import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import allReducers from './reducers';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
require('./stylesheets/common.css');
const createLogger =  require('redux-logger');


const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger();
  middlewares.push(logger);
}
const store = createStore(
    allReducers,
    applyMiddleware(promise, ...middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);

