import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from '../../../store';
import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';

const mockUserState = {
	userReducer: {
		isAuth: true,
		name: 'test',
		email: 'test1@test.com',
		token: 'example token',
		role: 'user',
	},

	authorsReducer: [
		{
			name: 'author',
			id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
		},
		{
			name: 'Aniket',
			id: '97771411-77ee-437c-b601-c290dcb2667d',
		},
	],

	coursesReducer: [
		{
			title: 'title',
			description: 'description',
			creationDate: '9/3/2021',
			duration: 30,
			authors: [
				'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
				'97771411-77ee-437c-b601-c290dcb2667d',
			],
			id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
		},
		{
			title: 'title 2',
			description: 'description 2',
			creationDate: '3/9/2021',
			duration: 57,
			authors: ['97771411-77ee-437c-b601-c290dcb2667d'],
			id: '65ac299b-4fe9-59c2-3cb5-5c4d439a6320',
		},
	],
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
	useDispatch: jest.fn(),
}));

const store = createStore(rootReducer, mockUserState);

describe('CourseCard', () => {
	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...mockUserState });
		});

		render(
			<BrowserRouter>
				<Provider store={store}>
					<Courses />
				</Provider>
			</BrowserRouter>
		);
	});

	afterEach(() => {
		useSelector.mockClear();
	});

	it('should display amount of CourseCard equal length of courses array', () => {
		const courseTitle = screen.getAllByTestId('course-title');

		expect(courseTitle.length).toBe(mockUserState.coursesReducer.length);
	});
});

describe('CourseCard', () => {
	const newMockUserState = { ...mockUserState, coursesReducer: [] };
	const newStore = createStore(rootReducer, newMockUserState);

	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...newMockUserState });
		});

		useDispatch.mockImplementation(() => () => {
			return;
		});
	});

	afterEach(() => {
		useSelector.mockClear();
		useDispatch.mockClear();
	});

	it('should display Empty container if courses array length is 0', () => {
		render(
			<BrowserRouter>
				<Provider store={newStore}>
					<Courses />
				</Provider>
			</BrowserRouter>
		);
		const courseTitle = screen.queryAllByTestId('course-title');

		expect(courseTitle.length).toBe(0);
	});
});

describe('CourseForm', () => {
	const newMockUserState = {
		...mockUserState,
		userReducer: { ...mockUserState.userReducer, role: 'admin' },
	};
	const newStore = createStore(rootReducer, newMockUserState);

	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...newMockUserState });
		});

		render(
			<BrowserRouter>
				<Provider store={newStore}>
					<Courses />
				</Provider>
			</BrowserRouter>
		);
	});

	it('should be showed after a click on a button "Add new course"', () => {
		const addButton = screen.getByText('Add new course');
		fireEvent.click(
			addButton,
			render(
				<BrowserRouter>
					<Provider store={newStore}>
						<CourseForm />
					</Provider>
				</BrowserRouter>
			)
		);
		const divElement = screen.getByTestId('create-course');

		expect(divElement).toBeInTheDocument();
	});
});
