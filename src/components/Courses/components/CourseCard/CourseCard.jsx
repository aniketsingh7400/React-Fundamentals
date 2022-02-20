import React from 'react';
import Button from '../../../../common/Button/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthors } from '../../../../store/selectors';
import { timeGenerator } from '../../../../helpers/pipeDuration';
import './CourseCard.css';

const CourseCard = (props) => {
	const authorsList = [];
	const navigate = useNavigate();
	const storeAuthors = useSelector(getAuthors);

	//gets the list of authors name
	storeAuthors.forEach((author) =>
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
		// Redirects to CourseInfo page with details for particular course based on it's course ID.
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
				<div className='buttons'>
					<Button
						buttonText='Show course'
						onClickHandler={() => navigate(`/courses/${props.course.id}`)}
					/>
					<Button buttonText={<EditIcon fontSize='small' />} />
					<Button
						buttonText={<DeleteIcon fontSize='small' />}
						onClickHandler={props.onDeleteHandler}
					/>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
