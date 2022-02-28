import * as actions from './actionTypes';

export const userLoggedIn = (response) => ({
	type: actions.USER_LOGGED_IN,
	payload: {
		name: response.data.user.name,
		email: response.data.user.email,
		token: response.data.result,
	},
});

export const userLoggedOut = () => ({
	type: actions.USER_LOGGED_OUT,
	payload: {
		name: '',
		email: '',
		token: '',
	},
});

export const getTheCurrentUser = (role) => ({
	type: actions.GET_THE_CURRENT_USER,
	payload: {
		role,
	},
});
