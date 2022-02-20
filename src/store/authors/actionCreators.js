import * as actions from './actionTypes';

export const setAuthors = (authorsList) => ({
	type: actions.SET_AUTHORS,
	payload: {
		authorsList,
	},
});

export const authorAdded = (author) => ({
	type: actions.AUTHOR_ADDED,
	payload: {
		author,
	},
});

export const authorDeleted = (author) => ({
	type: actions.AUTHOR_DELETED,
	payload: {
		author,
	},
});
