import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App/App';


// Создаем функцию-редюсер

const initialState = {
	googleExport : [],
	someAnother  : []
};

const reducer = (state = initialState, action) => {

	const {type, payload} = action;

	if (type === 'ADD_GOOGLE_EXPORT') {
		return {
			...state,
			googleExport : [...state.googleExport, payload]
		};
	}

	return state;
}

// Создаем само хранилище состояния
const store = createStore(reducer);

ReactDOM.render(
	<Provider
		store={store}>
		<App />
	</Provider>,
	 document.getElementById('root'));