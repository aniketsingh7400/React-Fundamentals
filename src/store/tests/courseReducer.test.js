import * as actions from '../courses/actionTypes';
import coursesReducer from '../courses/reducer';

const coursesList = [
	{
		title: 'title',
		description: 'description',
		creationDate: '9/3/2021',
		duration: 30,
		authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
		id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
	},
	{
		title: 'title 2',
		description: 'description 2',
		creationDate: '3/9/2021',
		duration: 50,
		authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
		id: '96ca289e-6ba9-69e2-9ca5-0e4a409f6496',
	},
];

describe('reducer', () => {
	it('should return initial state', () => {
		const newState = coursesReducer([], {
			type: actions.NOT_PRESENT,
			payload: {},
		});

		expect(newState).toEqual([]);
	});

	it('should handle COURSE_ADDED and returns new state', () => {
		const course = {
			title: 'title 3',
			description: 'description 3',
			duration: 57,
			authors: [
				'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
				'97771411-77ee-437c-b601-c290dcb2667d',
			],
		};

		const newState = coursesReducer(coursesList, {
			type: actions.COURSE_ADDED,
			payload: {
				course,
			},
		});

		expect(newState[2]).toBe(course);
	});

	it('should handle SET_COURSES and returns new state', () => {
		const newState = coursesReducer([], {
			type: actions.SET_COURSES,
			payload: {
				coursesList,
			},
		});

		expect(newState).toBe(coursesList);
	});
});
