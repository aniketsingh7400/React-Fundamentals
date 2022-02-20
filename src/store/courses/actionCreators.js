import * as actions from './actionTypes';

export const setCourses = (coursesList) => ({
	type: actions.SET_COURSES,
	payload: {
		coursesList,
	},
});

export const courseAdded = (course) => ({
	type: actions.COURSE_ADDED,
	payload: {
		course,
	},
});

export const courseDeleted = (courseId) => ({
	type: actions.COURSE_DELETED,
	payload: {
		courseId,
	},
});
