import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import useLocalStorageToken from '../../useLocalStorageToken';
import './Header.css';

const Header = () => {
	const navigate = useNavigate();
	const token = useLocalStorageToken();

	const onLogout = () => {
		// Clears the local storage, so no logged in token is left
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
					<strong>{token.data.user.name}</strong>
					<Button buttonText='Logout' onClickHandler={onLogout} />
				</div>
			)}
		</div>
	);
};

export default Header;
