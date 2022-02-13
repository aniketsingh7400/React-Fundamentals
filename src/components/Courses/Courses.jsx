import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { mockedCoursesList } from '../../constants';
import './Courses.css';

const Courses = () => {
	const navigate = useNavigate();
	const [coursesList, setCourseList] = useState(mockedCoursesList);

	// mapping each course to course card
	const listOfCourses = coursesList.map((course) => (
		<CourseCard key={course.id} course={course} />
	));

	const courseListHandler = (searchKeyword) => {
		setCourseList(
			searchKeyword === ''
				? mockedCoursesList
				: mockedCoursesList.filter(
						(course) =>
							course.title
								.toLowerCase()
								.includes(searchKeyword.toLowerCase()) ||
							course.id.toLowerCase().includes(searchKeyword.toLowerCase())
				  )
		);
	};

	return (
		<div className='courses'>
			<div className='courses-container'>
				<SearchBar clickHandler={courseListHandler} />
				<div className='courses-container-add-new-course'>
					<Button
						buttonText='Add new course'
						onClickHandler={() => navigate('/courses/add')}
					/>
				</div>
			</div>
			{listOfCourses}
		</div>
	);
};

export default Courses;
