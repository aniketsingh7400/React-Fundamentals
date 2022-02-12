import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { timeGenerator } from '../../helpers/pipeDuration';
import './CourseInfo.css';

const CourseInfo = () => {
	const courseList = mockedCoursesList;
	const authorList = mockedAuthorsList;
	const { courseId } = useParams();
	let thisCourse = {};

	// Gets the selected course, based on the course ID and set it's value to thisCourse object
	courseList.forEach((course) => {
		if (course.id === courseId) thisCourse = { ...course };
	});

	// Collects all the relevant author names of the selected course in authors list
	let authors = [];
	thisCourse.authors.forEach((id) => {
		authorList.forEach((author) => {
			if (id === author.id) authors.push(author);
		});
	});

	return (
		<div className='courseinfo'>
			<div className='courseinfo-container'>
				<Link className='link' to='/courses'>
					{'< Back to courses'}
				</Link>
				<center>
					<h2>{thisCourse.title}</h2>
				</center>
				<div className='courseinfo-content'>
					<div className='description'>{thisCourse.description}</div>
					<div className='authors'>
						<p>
							<strong>ID: </strong> {courseId}
						</p>
						<p>
							<strong>Duration: </strong>
							{`${timeGenerator(thisCourse.duration)} hours`}
						</p>
						<p>
							<strong>Created: </strong> {thisCourse.creationDate}
						</p>
						<p>
							<strong>Authors: </strong>
						</p>
						{authors.map((author) => (
							<p key={author.id}>{author.name}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
