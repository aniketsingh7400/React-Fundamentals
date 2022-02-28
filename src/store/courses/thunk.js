import axios from 'axios';
import {
	courseAdded,
	courseDeleted,
	courseUpdated,
	setCourses,
} from './actionCreators';

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

// API call to add course
export const addCourse = (courseDetail, token, navigate) => {
	return (dispatch) => {
		axios
			.post('http://localhost:3000/courses/add', courseDetail, {
				headers: { Authorization: token },
			})
			.then((res) => {
				alert(`New course "${courseDetail.title}" created successfully`);
				dispatch(courseAdded(res.data.result));
				navigate('/courses');
			})
			.catch((err) => alert(err.message));
	};
};

// API call to delete course
export const deleteCourse = (
	courseId,
	token,
	coursesList,
	setCoursesList,
	index
) => {
	return (dispatch) => {
		axios
			.delete(`http://localhost:3000/courses/${courseId}`, {
				headers: { Authorization: token },
			})
			.then((res) => {
				coursesList.splice(index, 1);
				setCoursesList(coursesList);
				dispatch(courseDeleted(courseId));
			})
			.catch((err) => {
				alert(err.message);
			});
	};
};

// API call to update course
export const updateCourse = (courseDetail, token, navigate, courseId) => {
	return (dispatch) => {
		axios
			.put(`http://localhost:3000/courses/${courseId}`, courseDetail, {
				headers: { Authorization: token },
			})
			.then((res) => {
				alert(`Updated course "${courseDetail.title}" successfully`);
				dispatch(courseUpdated(res.data.result));
				navigate('/courses');
			})
			.catch((err) => alert(err.message));
	};
};
