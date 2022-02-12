import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Registration.css';

const Registration = () => {
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState({
		name: '',
		password: '',
		email: '',
	});

	useEffect(() => {
		// Redirects to Courses page if user is already logged in
		if (localStorage.length > 0) navigate('/courses');
	});

	const formDetailsSubmit = (event) => {
		// Validates registration form details i.e. name, email and password on submit of form
		// Sends POST request and if successful then redirects to Login page
		event.preventDefault();
		if (newUser.name.length < 1) {
			alert('Please enter a valid name');
		} else if (!validator.isEmail(newUser.email)) {
			alert('Please enter a valid email address. Example: abcd@gmail.com');
		} else if (newUser.password < 9) {
			alert('Password should be of atleast 8 characters');
		} else {
			axios
				.post('http://localhost:3000/register', newUser)
				.then((res) => {
					alert('Registration successful !');
					navigate('/login');
				})
				.catch((err) => alert('Email already registered !'));
		}
	};

	return (
		<form onSubmit={formDetailsSubmit} className='registration'>
			<h2>Registration</h2>
			<Input
				textType='text'
				labelText='Name'
				placeholderText='Enter name'
				textChangeHandler={(event) =>
					setNewUser({ ...newUser, name: event.target.value })
				}
			/>
			<Input
				textType='email'
				labelText='Email'
				placeholderText='Enter email'
				textChangeHandler={(event) =>
					setNewUser({ ...newUser, email: event.target.value })
				}
			/>
			<Input
				textType='password'
				labelText='Password'
				placeholderText='Enter password'
				textChangeHandler={(event) =>
					setNewUser({ ...newUser, password: event.target.value })
				}
			/>
			<Button buttonText='Registration' buttonType='submit' />
			<p>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</form>
	);
};

export default Registration;
