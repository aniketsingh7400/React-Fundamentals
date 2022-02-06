import React, { useState } from 'react';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';

function App() {
	const [isButtonClicked, setIsButtonClicked] = useState(false);

	const showCourseHandler = () => {
		setIsButtonClicked(!isButtonClicked);
	};

	return (
		<div>
			<Header />
			{isButtonClicked ? (
				<CreateCourse clickHandler={showCourseHandler} />
			) : (
				<Courses addCourseClickHandler={showCourseHandler} />
			)}
		</div>
	);
}

export default App;
