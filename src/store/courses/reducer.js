import * as actions from './actionTypes';

// default value - empty array. After success getting courses from API - array of courses.
const coursesInitialState = [];

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actions.SET_COURSES:
			return action.payload.coursesList;
		case actions.COURSE_ADDED:
			return [...state, action.payload.course];
		case actions.COURSE_DELETED:
			return state.filter((course) => course.id !== action.payload.courseId);
		case actions.COURSE_UPDATED:
			const index = state.findIndex(
				(course) => course.id === action.payload.course.id
			);
			state[index] = action.payload.course;
			return [...state];
		default:
			return state;
	}
};

export default coursesReducer;
