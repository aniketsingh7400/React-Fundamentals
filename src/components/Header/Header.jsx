import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';

const Header = () => {
	return (
		<div className='header'>
			<div className='header-logo'>
				<Logo />
			</div>
			<div className='header-username'>
				<strong>Aniket</strong>
				<Button buttonText='Logout' />
			</div>
		</div>
	);
};

export default Header;
