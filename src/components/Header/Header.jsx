import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
	const navigate = useNavigate();
	const userData = JSON.parse(localStorage.getItem('userData'));

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
			{localStorage.length > 0 && (
				<div className='header-username'>
					<strong>{userData.data.user.name}</strong>
					<Button buttonText='Logout' onClickHandler={onLogout} />
				</div>
			)}
		</div>
	);
};

export default Header;
