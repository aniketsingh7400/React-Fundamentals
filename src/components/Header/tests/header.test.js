import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from '../../../store';
import { createStore } from 'redux';
import { useSelector } from 'react-redux';
import Header from '../Header';

const mockUserState = {
	userReducer: {
		isAuth: true,
		name: 'test',
		email: 'test1@test.com',
		token: 'example token',
		role: 'user',
	},
};

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));

const store = createStore(rootReducer, mockUserState);

localStorage.setItem(
	'reduxState',
	JSON.stringify({ userReducer: { token: 'some token' } })
);

describe('Header', () => {
	beforeEach(() => {
		useSelector.mockImplementation((callback) => {
			return callback({ ...mockUserState });
		});

		render(
			<BrowserRouter>
				<Provider store={store}>
					<Header />
				</Provider>
			</BrowserRouter>
		);
	});

	afterEach(() => {
		useSelector.mockClear();
	});

	it('should have logo', () => {
		const logoElement = screen.getByAltText('logo');

		expect(logoElement).toBeInTheDocument();
	});

	it("should have user's name", () => {
		const userName = screen.getByTestId('user-name');

		expect(userName.textContent).toBe('test');
	});
});
