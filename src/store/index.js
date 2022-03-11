import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';

// Combine all reducers in rootReducer
export const rootReducer = combineReducers({
	authorsReducer,
	coursesReducer,
	userReducer,
});

// Creating persisted state for redux in local storage
const persistedState = localStorage.getItem('reduxState')
	? JSON.parse(localStorage.getItem('reduxState'))
	: {};

// Created a composed enhancer for redux store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Creating redux store
const store = createStore(
	rootReducer,
	persistedState,
	composeEnhancer(applyMiddleware(thunk))
);

// Subscribing store
store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
