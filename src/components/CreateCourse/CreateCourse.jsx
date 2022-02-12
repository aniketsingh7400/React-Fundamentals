import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useNavigate } from 'react-router-dom';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { timeGenerator } from '../../helpers/pipeDuration';
import './CreateCourse.css';

const CreateCourse = () => {
	const navigate = useNavigate();

	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const [addAuthors, setAddAuthors] = useState([]);
	const [createAuthor, setCreateAuthor] = useState('');
	const [calculateDuration, setCalculateDuration] = useState('00:00');
	const [formDetails, setFormDetails] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: '',
		authors: [],
	});

	const createAuthorChange = (event) => {
		// Author input will be stored in createAuthor if any changes takes place
		setCreateAuthor(event.target.value);
	};

	const createAuthorHandler = () => {
		// Validates the author input and updates the authorsList as well as mockedAuthorsList
		if (createAuthor.length < 2) {
			alert('Please enter atleast 2 characters...');
			return;
		}
		const id = 'id' + Math.random().toString(16).slice(2);
		setAuthorsList([
			...authorsList,
			{
				id: id,
				name: createAuthor,
			},
		]);
		mockedAuthorsList.push({
			id: id,
			name: createAuthor,
		});
	};

	const addAuthorHandler = (authorId, authorName) => {
		// addAuthors and authorList is updated to display it in course.
		// Stores the data in formDetails
		setAddAuthors([
			...addAuthors,
			{
				id: authorId,
				name: authorName,
			},
		]);
		setAuthorsList(authorsList.filter((author) => author.id !== authorId));
	};

	const deleteAuthorHandler = (authorId, authorName) => {
		// Updates authorsList to get them in author list and also removes the authors from course
		setAuthorsList([
			...authorsList,
			{
				id: authorId,
				name: authorName,
			},
		]);
		setAddAuthors(addAuthors.filter((author) => author.id !== authorId));
	};

	const addAuthorsToFormDetails = () => {
		// returns all author IDs for course
		let authorsId = [];
		addAuthors.forEach((author) => {
			authorsId.push(author.id);
		});
		return authorsId;
	};

	const durationHandler = (event) => {
		// Handles duration to be converted to show on the page
		// and update the hours in formDetails to be converted later
		// And updates the formDetails
		const today = new Date().toISOString().slice(0, 10);
		const hours = event.target.value;
		setCalculateDuration(timeGenerator(hours));
		setFormDetails({
			...formDetails,
			authors: addAuthorsToFormDetails(),
			duration: hours,
			id: 'id' + Math.random().toString(16).slice(2),
			creationDate: today.split('-').reverse().join('/'),
		});
	};

	const submitHandler = () => {
		// Validates whether any field is missing otherwise adds to courseList
		// If validation is successful then redirects to Courses page with updated course list.
		if (
			formDetails.creationDate !== '' &&
			formDetails.description !== '' &&
			formDetails.duration !== '' &&
			formDetails.id !== '' &&
			formDetails.title !== '' &&
			formDetails.authors.length !== 0 &&
			formDetails.description.length >= 2
		) {
			alert(`New course "${formDetails.title}" created successfully`);
			mockedCoursesList.push(formDetails);
			navigate('/courses');
		} else {
			alert('All fields are required, Please, fill them all');
		}
	};

	return (
		// Renders only if token is present in local storage.
		localStorage.length > 0 && (
			<div className='create-course'>
				<div className='create-course-title'>
					<Input
						textType='text'
						labelText='Title'
						placeholderText='Enter title...'
						textChangeHandler={(event) =>
							setFormDetails({ ...formDetails, title: event.target.value })
						}
					/>
					<Button buttonText='Create course' onClickHandler={submitHandler} />
				</div>
				<div className='create-course-description'>
					<label>Description</label>
					<textarea
						name='description'
						className='create-course-description-text'
						cols='160'
						minLength={2}
						rows='5'
						onChange={(event) =>
							setFormDetails({
								...formDetails,
								description: event.target.value,
							})
						}
					/>
				</div>
				<div className='create-course-add-authors'>
					<div className='create-course-add-author-create'>
						<div className='create-course-add-author-create-author'>
							<strong>Add author</strong>
							<Input
								textType='text'
								labelText='Author name'
								placeholderText='Enter author name...'
								textChangeHandler={createAuthorChange}
							/>
							<Button
								buttonText='Create author'
								onClickHandler={createAuthorHandler}
							/>
						</div>
						<div className='create-course-add-author-create-list'>
							<strong>Authors</strong>
							{authorsList.map((author) => (
								<div className='authors' key={author.id}>
									<div>{author.name}</div>
									<Button
										buttonText='Add author'
										onClickHandler={() =>
											addAuthorHandler(author.id, author.name)
										}
									/>
								</div>
							))}
						</div>
					</div>
					<div className='create-course-add-author-added'>
						<div className='create-course-add-author-added-duration'>
							<strong>Duration</strong>
							<Input
								textType='number'
								labelText='Duration'
								placeholderText='Enter duration in minutes...'
								textChangeHandler={durationHandler}
							/>
						</div>
						<div className='create-course-add-author-added-list'>
							<strong>Course authors</strong>
							<div>
								{addAuthors.length === 0
									? 'Author list is empty'
									: addAuthors.map((author) => (
											<div className='authors' key={author.id}>
												{author.name}
												<Button
													buttonText='Delete author'
													onClickHandler={() =>
														deleteAuthorHandler(author.id, author.name)
													}
												/>
											</div>
									  ))}
							</div>
						</div>
					</div>
				</div>
				<div className='create-course-duration'>
					Duration: <strong>{calculateDuration}</strong> hours
				</div>
			</div>
		)
	);
};

export default CreateCourse;
