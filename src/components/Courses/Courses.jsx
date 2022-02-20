import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { courseDeleted } from '../../store/courses/actionCreators';
import { fetchCourses, fetchAuthors } from '../../services';
import { getCourses } from '../../store/selectors';
import './Courses.css';

const Courses = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const storeCourses = useSelector(getCourses);
	const [coursesList, setCoursesList] = useState(storeCourses);

	// Calls the API from services.js to fetch the data for getting courses and authors.
	// It again calls the functions only if the coursesList is empty.
	useEffect(() => {
		if (storeCourses.length === 0) {
			dispatch(fetchCourses());
			dispatch(fetchAuthors());
		}
	}, []);

	// It re-renders the courses list if there is any change in the courses state.
	// Shows the courses list on user login.
	useEffect(() => {
		setCoursesList(storeCourses);
	}, [storeCourses]);

	// mapping each course to course card
	const listOfCourses = coursesList.map((course, index) => (
		<CourseCard
			key={course.id}
			course={course}
			onDeleteHandler={() => {
				coursesList.splice(index, 1);
				setCoursesList(coursesList);
				dispatch(courseDeleted(course.id));
			}}
		/>
	));

	const courseListHandler = (searchKeyword) => {
		setCoursesList(
			searchKeyword === ''
				? storeCourses
				: storeCourses.filter(
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
