import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useNavigate } from 'react-router-dom';
import { authorAdded } from '../../store/authors/actionCreators';
import { courseAdded } from '../../store/courses/actionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthors } from '../../store/selectors';
import { timeGenerator } from '../../helpers/pipeDuration';
import './CreateCourse.css';

const CreateCourse = () => {
	const navigate = useNavigate();
	const storeAuthors = useSelector(getAuthors);
	const [authorsList, setAuthorsList] = useState(storeAuthors);
	const dispatch = useDispatch();
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
		// Validates the author input and updates the authorsList as well as add author in store
		if (createAuthor.length < 2) {
			alert('Please enter atleast 2 characters...');
			return;
		}
		const id = 'id' + Math.random().toString(16).slice(2);
		const author = { name: createAuthor, id: id };
		setAuthorsList([...authorsList, author]);
		dispatch(authorAdded(author));
	};

	const addAuthorHandler = (author) => {
		// addAuthors and authorList is updated to display it in course.
		// Stores the data in formDetails
		setAddAuthors([...addAuthors, author]);
		setAuthorsList(
			authorsList.filter((perAuthor) => perAuthor.id !== author.id)
		);
		setFormDetails({
			...formDetails,
			authors: [...formDetails.authors, author.id],
		});
	};

	const deleteAuthorHandler = (author, index) => {
		// Updates authorsList to get them in author list and also removes the authors from course
		setAuthorsList([...authorsList, author]);
		addAuthors.splice(index, 1);
		formDetails.authors.splice(index, 1);
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
			duration: hours,
			creationDate: today.split('-').reverse().join('/'),
		});
	};

	const submitHandler = () => {
		// Setting Course ID for formDetails
		formDetails.id = 'id' + Math.random().toString(16).slice(2);

		// Validates whether any field is missing otherwise adds to courseList
		// If validation is successful then redirects to Courses page with updated course list.
		// Add new course to the store
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
			dispatch(courseAdded(formDetails));
			navigate('/courses');
		} else {
			alert('All fields are required, Please, fill them all');
		}
	};

	return (
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
						{authorsList.map((author, index) => (
							<div className='authors' key={author.id}>
								<div>{author.name}</div>
								<Button
									buttonText='Add author'
									onClickHandler={() => addAuthorHandler(author, index)}
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
								: addAuthors.map((author, index) => (
										<div className='authors' key={author.id}>
											{author.name}
											<Button
												buttonText='Delete author'
												onClickHandler={() =>
													deleteAuthorHandler(author, index)
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
	);
};

export default CreateCourse;
