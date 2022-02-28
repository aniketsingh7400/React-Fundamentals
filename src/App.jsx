import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';

function App() {
	return (
		// If the user is NOT logged in, ProtectedRoute never allows user to navigate to
		// different pages except Login and Registration. Rather, it redirects the user to
		// Login page if user tries to navigate to different pages except Login and Registration
		//
		// PrivateRoute limits the add, delete and update course route for role: "user"
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate replace to='/login' />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/register' element={<Registration />} />
				<Route element={<ProtectedRoute />}>
					<Route exact path='/courses' element={<Courses />} />
					<Route exact path='/courses/:courseId' element={<CourseInfo />} />
					<Route
						exact
						path='/courses/add'
						element={
							<PrivateRouter>
								<CourseForm />
							</PrivateRouter>
						}
					/>
					<Route
						exact
						path='/courses/update/:courseId'
						element={
							<PrivateRouter>
								<CourseForm />
							</PrivateRouter>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
