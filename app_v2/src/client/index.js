import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root/Root.jsx';
import { BrowserRouter, } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducers from './redux/index';

// Prepare preloaded state
const preloadedState = window._PRELOADED_STATE_;
delete window._PRELOADED_STATE_;
document.body.removeChild(document.getElementById('preloaded_state'));

// Creating store and load reducer and preloaded state into it
const store = createStore(reducers, preloadedState, applyMiddleware(thunk, logger));

// Render BROWSER app
ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>    
    , document.getElementById('root'))