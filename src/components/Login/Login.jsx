import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/selectors';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Login.css';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const storeUser = useSelector(getUser);
	const [userLoginDetails, setUserLoginDetails] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		// Redirects to Courses page if user is already logged in
		if (storeUser && storeUser.isAuth) navigate('/courses');
	});

	const loginDetailsSubmit = (event) => {
		// Validates login form details i.e. email and password on submit of form
		// Sends POST request and if successful then redirects to Courses page
		event.preventDefault();
		if (!validator.isEmail(userLoginDetails.email)) {
			alert('Please enter a valid email address. Example: abcd@gmail.com');
		} else if (userLoginDetails.password.length < 8) {
			alert('Password should be of atleast 8 characters');
		} else {
			dispatch(userLogin(userLoginDetails)); // post request from services.js
		}
	};

	return (
		<form onSubmit={loginDetailsSubmit} className='login'>
			<h2>Login</h2>
			<Input
				textType='email'
				labelText='Email'
				placeholderText='Enter email'
				textChangeHandler={(event) =>
					setUserLoginDetails({
						...userLoginDetails,
						email: event.target.value,
					})
				}
			/>
			<Input
				textType='password'
				labelText='Password'
				placeholderText='Enter password'
				textChangeHandler={(event) =>
					setUserLoginDetails({
						...userLoginDetails,
						password: event.target.value,
					})
				}
			/>
			<Button buttonText='Login' buttonType='submit' />
			<p>
				If you not have an account you can <Link to='/register'>Register</Link>
			</p>
		</form>
	);
};

export default Login;
