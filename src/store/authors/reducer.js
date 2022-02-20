import * as actions from './actionTypes';

// default value - empty array. After success getting authors from API - array of authors.
const authorsInitialState = [];

const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actions.SET_AUTHORS:
			return action.payload.authorsList;
		case actions.AUTHOR_ADDED:
			return [...state, action.payload.author];
		case actions.AUTHOR_DELETED:
			return state.filter(
				(perAuthor) => perAuthor.id !== action.payload.author.id
			);
		default:
			return state;
	}
};

export default authorsReducer;
