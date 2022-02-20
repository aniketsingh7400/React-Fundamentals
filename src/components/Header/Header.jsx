import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import useLocalStorageToken from '../../useLocalStorageToken';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedOut } from '../../store/user/actionCreators';
import { getUser } from '../../store/selectors';
import './Header.css';

const Header = () => {
	const navigate = useNavigate();
	const token = useLocalStorageToken();
	const storeUser = useSelector(getUser);
	const dispatch = useDispatch();

	const onLogout = () => {
		// Updates store with logged out details
		// Clears the local storage, so no logged in token is left
		dispatch(userLoggedOut());
		localStorage.clear();
		navigate('/login');
	};

	return (
		// Displays the user name and Logout button only if the user is logged in
		<div className='header'>
			<div className='header-logo'>
				<Logo />
			</div>
			{token && (
				<div className='header-username'>
					<strong>{storeUser.name}</strong>
					<Button buttonText='Logout' onClickHandler={onLogout} />
				</div>
			)}
		</div>
	);
};

export default Header;
