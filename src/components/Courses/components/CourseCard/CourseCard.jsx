import React from 'react';
import Button from '../../../../common/Button/Button';
import { timeGenerator } from '../../../../helpers/pipeDuration';
import { mockedAuthorsList } from '../../../../constants';
import './CourseCard.css';

const CourseCard = (props) => {
	const authorsList = [];

	//gets the list of authors name
	mockedAuthorsList.forEach((author) =>
		props.course.authors.forEach((courseAuthor) => {
			if (courseAuthor === author.id) authorsList.push(author.name);
		})
	);

	// if the authors names don't come in a single line, it changes to short hand
	let authors = authorsList.join(', ');
	if (authors.length > 32) {
		authors = `${authors.slice(0, 29)}...`;
	}

	return (
		<div className='course-card'>
			<div className='course-card-course-details'>
				<h1>{props.course.title}</h1>
				<p>{props.course.description}</p>
			</div>
			<div className='course-card-author-details'>
				<p>
					<strong>Authors: </strong>
					{authors}
				</p>
				<p>
					<strong>Duration: </strong>
					{timeGenerator(props.course.duration) + ' hours'}
				</p>
				<p>
					<strong>Created: </strong>
					{props.course.creationDate}
				</p>
				<Button buttonText='Show course' />
			</div>
		</div>
	);
};

export default CourseCard;