import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCourse, updateCourse } from '../../store/courses/thunk';
import { addAuthor } from '../../store/authors/thunk';
import { timeGenerator } from '../../helpers/pipeDuration';
import { getAuthors, getCourses } from '../../store/selectors';
import useLocalStorageToken from '../../useLocalStorageToken';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './CourseForm.css';

const CourseForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { courseId } = useParams();
	const token = useLocalStorageToken();
	const storeAuthors = useSelector(getAuthors);
	const [authorsList, setAuthorsList] = useState(storeAuthors);
	const [addAuthors, setAddAuthors] = useState([]);
	const [createAuthor, setCreateAuthor] = useState('');
	const [calculateDuration, setCalculateDuration] = useState('00:00');
	const [formDetails, setFormDetails] = useState({
		title: '',
		description: '',
		duration: '',
		authors: [],
	});

	// Gets the user based on id for updation
	const updateCourseDetail = useSelector(getCourses).filter(
		(course) => course.id === courseId
	);

	// Prefills the form data for updatation of course on clicking update course button
	useEffect(() => {
		if (updateCourseDetail.length) {
			setFormDetails({
				...formDetails,
				title: updateCourseDetail[0].title,
				description: updateCourseDetail[0].description,
				duration: updateCourseDetail[0].duration,
				authors: updateCourseDetail[0].authors,
			});

			setCalculateDuration(timeGenerator(updateCourseDetail[0].duration));

			setAuthorsList(
				authorsList.filter(function (author) {
					return !updateCourseDetail[0].authors.includes(author.id);
				})
			);

			setAddAuthors(
				authorsList.filter(function (author) {
					return updateCourseDetail[0].authors.includes(author.id);
				})
			);
		}
	}, []);

	// Author input will be stored in createAuthor if any changes takes place
	const createAuthorChange = (event) => {
		setCreateAuthor(event.target.value);
	};

	const createAuthorHandler = () => {
		// Validates the author input and updates the authorsList in store
		// also updates add author in store using dispatch method
		if (createAuthor.length < 2) {
			alert('Please enter atleast 2 characters...');
			return;
		}
		const author = { name: createAuthor };

		// Checks for duplicate author creation
		let duplicateAuthor = false;
		authorsList.forEach((author) => {
			if (author.name.toLowerCase() === createAuthor.toLowerCase()) {
				alert(`Author ${createAuthor} already exists`);
				duplicateAuthor = true;
			}
		});
		if (!duplicateAuthor) {
			dispatch(addAuthor(author, token, authorsList, setAuthorsList));
		}
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
		const hours = event.target.value;
		setCalculateDuration(timeGenerator(hours));
		setFormDetails({
			...formDetails,
			duration: parseInt(hours),
		});
	};

	const submitHandler = () => {
		// Validates whether any field is missing otherwise adds to courseList
		// If validation is successful then redirects to Courses page with updated course list.
		// Add new course or Updates existing course based on Admin's action.
		if (
			formDetails.description !== '' &&
			formDetails.duration !== '' &&
			formDetails.title !== '' &&
			formDetails.authors.length !== 0 &&
			formDetails.description.length >= 2
		) {
			updateCourseDetail.length
				? dispatch(updateCourse(formDetails, token, navigate, courseId))
				: dispatch(addCourse(formDetails, token, navigate));
		} else {
			alert('All fields are required, Please, fill them all');
		}
	};

	return (
		<div className='create-course' data-testid='create-course'>
			<div className='create-course-title'>
				<Input
					textType='text'
					labelText='Title'
					inputValue={formDetails.title}
					placeholderText='Enter title...'
					textChangeHandler={(event) =>
						setFormDetails({ ...formDetails, title: event.target.value })
					}
				/>
				<Button
					buttonText={
						updateCourseDetail.length ? 'Update course' : 'Create course'
					}
					onClickHandler={submitHandler}
				/>
			</div>
			<div className='create-course-description'>
				<label>Description</label>
				<textarea
					name='description'
					className='create-course-description-text'
					cols='160'
					minLength={2}
					rows='5'
					defaultValue={formDetails.description}
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
							inputValue={formDetails.duration}
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

export default CourseForm;
