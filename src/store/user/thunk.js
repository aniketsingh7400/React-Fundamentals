import axios from 'axios';
import {
	getTheCurrentUser,
	userLoggedIn,
	userLoggedOut,
} from './actionCreators';

// API call to send the user login details
export const userLogin = (userLoginDetails) => {
	return (dispatch) => {
		axios
			.post('http://localhost:3000/login', userLoginDetails)
			.then((res) => {
				dispatch(userLoggedIn(res));
			})
			.catch((err) => alert(err.message));
	};
};

// API call to get current user
export const getCurrentUser = (token) => {
	return (dispatch) => {
		axios
			.get('http://localhost:3000/users/me', {
				headers: { Authorization: token },
			})
			.then((res) => {
				dispatch(getTheCurrentUser(res.data.result.role));
			})
			.catch((err) => {
				alert(err.message);
			});
	};
};

// API call to logout the user
export const userLogout = (token, navigate) => {
	return (dispatch) => {
		axios
			.delete('http://localhost:3000/logout', {
				headers: { Authorization: token },
			})
			.then((res) => {
				dispatch(userLoggedOut());
				localStorage.clear();
				navigate('/login');
			})
			.catch((err) => {
				alert(err.message);
			});
	};
};
