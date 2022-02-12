import React, { useState, useEffect } from 'react';
import axios from 'axios';
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Login.css';

const Login = () => {
	const navigate = useNavigate();
	const [userLoginDetails, setUserLoginDetails] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		// Redirects to Courses page if user is already logged in
		if (localStorage.length > 0) navigate('/courses');
	});

	const loginDetailsSubmit = (event) => {
		// Validates login form details i.e. email and password on submit of form
		// Sends POST request and if successful then redirects to Courses page
		event.preventDefault();
		if (!validator.isEmail(userLoginDetails.email)) {
			alert('Please enter a valid email address. Example: abcd@gmail.com');
		} else if (userLoginDetails.password < 9) {
			alert('Password should be of atleast 8 characters');
		} else {
			axios
				.post('http://localhost:3000/login', userLoginDetails)
				.then((res) => {
					localStorage.setItem('userData', JSON.stringify(res));
					navigate('/courses');
				})
				.catch((err) => alert('Oops!! Entered wrong email or password'));
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
