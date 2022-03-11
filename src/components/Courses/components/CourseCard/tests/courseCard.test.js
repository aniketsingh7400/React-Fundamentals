import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from '../../../../../store';
import { createStore } from 'redux';
import { useSelector } from 'react-redux';
import CourseCard from '../CourseCard';

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
	],
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
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
					<CourseCard course={mockUserState.coursesReducer[0]} />
				</Provider>
			</BrowserRouter>
		);
	});

	afterEach(() => {
		useSelector.mockClear();
	});

	it('should show title', () => {
		const courseTitle = screen.getByTestId('course-title');

		expect(courseTitle.textContent).toBe('title');
	});

	it('should show description', () => {
		const courseDescription = screen.getByTestId('course-description');

		expect(courseDescription.textContent).toBe('description');
	});

	it('should display duration in the correct format', () => {
		const courseDuration = screen.getByTestId('course-duration');

		expect(courseDuration.textContent).toBe('00:30 hours');
	});

	it('should display authors list', () => {
		const courseAuthors = screen.getByTestId('course-authors');

		expect(courseAuthors.textContent).toBe('author, Aniket');
	});

	it('should display created date in the correct format', () => {
		const courseCreationDate = screen.getByTestId('course-creationdate');

		expect(courseCreationDate.textContent).toBe('9/3/2021');
	});
});
