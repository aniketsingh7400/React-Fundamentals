import axios from 'axios';
import { setCourses } from './store/courses/actionCreators';
import { setAuthors } from './store/authors/actionCreators';
import { userLoggedIn } from './store/user/actionCreators';

// API call to fetch all the courses
export const fetchCourses = () => {
	return (dispatch) => {
		axios
			.get('http://localhost:3000/courses/all')
			.then((res) => {
				dispatch(setCourses(res.data.result));
			})
			.catch((err) => {
				alert(err.message);
			});
	};
};

// API call to fetch all the authors
export const fetchAuthors = () => {
	return (dispatch) => {
		axios
			.get('http://localhost:3000/authors/all')
			.then((res) => {
				dispatch(setAuthors(res.data.result));
			})
			.catch((err) => {
				alert(err.message);
			});
	};
};

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
