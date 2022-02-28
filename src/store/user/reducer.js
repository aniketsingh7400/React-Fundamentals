import * as actions from './actionTypes';

const userInitialState = {
	isAuth: false, // default value - false. After success login - true
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: '', // default value - empty string or token value from localStorage.
	role: '', // default value - empty string or set role as 'admin' / 'user' based on current user.
};

const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actions.USER_LOGGED_IN:
			return {
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case actions.USER_LOGGED_OUT:
			return {
				isAuth: false,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case actions.GET_THE_CURRENT_USER:
			return {
				...state,
				role: action.payload.role,
			};
		default:
			return state;
	}
};

export default userReducer;
