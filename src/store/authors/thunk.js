import axios from 'axios';
import { authorAdded, setAuthors } from './actionCreators';

// API call to fetch all the authors
export const fetchAuthors = () => {
	return (dispatch) => {
		axios
			.get('http://localhost:3000/authors/all')
			.then((res) => {
				dispatch(setAuthors(res.data.result));
			})
			.catch((err) => {
				alert(err.message);
			});
	};
};

// API call to add author
export const addAuthor = (author, token, authorsList, setAuthorsList) => {
	return (dispatch) => {
		axios
			.post('http://localhost:3000/authors/add', author, {
				headers: { Authorization: token },
			})
			.then((res) => {
				setAuthorsList([...authorsList, res.data.result]);
				dispatch(authorAdded(res.data.result));
			})
			.catch((err) => {
				alert(err.message);
			});
	};
};
