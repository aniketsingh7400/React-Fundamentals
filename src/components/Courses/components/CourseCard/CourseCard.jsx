import React from 'react';
import Button from '../../../../common/Button/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthors, getUser } from '../../../../store/selectors';
import { timeGenerator } from '../../../../helpers/pipeDuration';
import './CourseCard.css';

const CourseCard = (props) => {
	const authorsList = [];
	const navigate = useNavigate();
	const storeAuthors = useSelector(getAuthors);
	const storeUser = useSelector(getUser);
	const userRole = storeUser.role;

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
				<h1 data-testid='course-title'>{props.course.title}</h1>
				<p data-testid='course-description'>{props.course.description}</p>
			</div>
			<div className='course-card-author-details'>
				<p>
					<strong>Authors: </strong>
					<span data-testid='course-authors'>{authors}</span>
				</p>
				<p>
					<strong>Duration: </strong>
					<span data-testid='course-duration'>
						{timeGenerator(props.course.duration) + ' hours'}
					</span>
				</p>
				<p>
					<strong>Created: </strong>
					<span data-testid='course-creationdate'>
						{props.course.creationDate}
					</span>
				</p>
				<div className='buttons'>
					<Button
						buttonText='Show course'
						onClickHandler={() => navigate(`/courses/${props.course.id}`)}
					/>

					{/* Displays Edit and Delete course button for only Admin */}
					{userRole === 'admin' && (
						<>
							<Button
								buttonText={<EditIcon fontSize='small' />}
								onClickHandler={() =>
									navigate(`/courses/update/${props.course.id}`)
								}
							/>
							<Button
								buttonText={<DeleteIcon fontSize='small' />}
								onClickHandler={props.onDeleteHandler}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
