import * as actions from './actionTypes';

const userInitialState = {
	isAuth: false, // default value - false. After success login - true
	name: '', // default value - empty string. After success login - name of user
	email: '', // default value - empty string. After success login - email of user
	token: '', // default value - empty string or token value from localStorage.
	// After success login - value from API /login response. See Swagger.
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
		default:
			return state;
	}
};

export default userReducer;
