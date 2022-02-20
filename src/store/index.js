import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';

// Combine all reducers in rootReducer
const rootReducer = combineReducers({
	authorsReducer,
	coursesReducer,
	userReducer,
});

// Creating persisted state for redux in local storage
const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(localStorage.getItem('reduxState'))
	: {};

// Created a composed enhancer for redux store
const composedEnhancer = compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Creating redux store
const store = createStore(rootReducer, persistedState, composedEnhancer);

// Subscribing store
store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
