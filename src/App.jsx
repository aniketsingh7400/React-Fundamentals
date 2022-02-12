import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Navigate replace to='/login' />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/register' element={<Registration />} />
				<Route exact path='/courses' element={<Courses />} />
				<Route exact path='/courses/add' element={<CreateCourse />} />
				<Route exact path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>
		</>
	);
}

export default App;
