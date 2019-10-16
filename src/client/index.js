import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root/Root.jsx';
import { BrowserRouter, } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './redux/index';
import Websocket from './services/Websocket';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './redux/saga/rootSaga';


// Prepare preloaded state
const preloadedState = window._PRELOADED_STATE_;
delete window._PRELOADED_STATE_;
document.body.removeChild(document.getElementById('preloaded_state'));

const sagaMiddleware = createSagaMiddleWare();

// Creating store and load reducer and preloaded state into it
export const store = createStore(reducers, preloadedState, applyMiddleware(thunk, logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

Websocket.createWebSocket(store);

// Render BROWSER app
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>    
    , document.getElementById('root'))