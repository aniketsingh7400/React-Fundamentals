import React, { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import './SearchBar.css';

const SearchBar = (props) => {
	const [searchText, setSearchText] = useState('');

	// triggers when text value changes
	const searchTextOnChange = (event) => {
		setSearchText(event.target.value);
	};

	return (
		<div className='search-bar'>
			<Input
				textType='text'
				placeholderText='Enter course name...'
				textChangeHandler={searchTextOnChange}
			/>
			<Button
				buttonText='Search'
				onClickHandler={() => props.clickHandler(searchText)}
			/>
		</div>
	);
};

export default SearchBar;
