import React from 'react';
import './Input.css';

const Input = ({ labelText, textType, placeholderText, textChangeHandler }) => {
	return labelText ? (
		<div className='input'>
			<label htmlFor={labelText}>{labelText}</label>
			<input
				type={textType}
				id={labelText}
				placeholder={placeholderText}
				onChange={textChangeHandler}
			/>
		</div>
	) : (
		<input
			className='input'
			type={textType}
			placeholder={placeholderText}
			onChange={textChangeHandler}
		/>
	);
};

export default Input;
