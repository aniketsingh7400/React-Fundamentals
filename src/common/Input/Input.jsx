import React from 'react';
import './Input.css';

const Input = (props) => {
	return props.labelText ? (
		<div className='input'>
			<label htmlFor={props.labelText}>{props.labelText}</label>
			<input
				type={props.textType}
				id={props.labelText}
				placeholder={props.placeholderText}
				onChange={props.textChangeHandler}
			/>
		</div>
	) : (
		<input
			className='input'
			type={props.textType}
			placeholder={props.placeholderText}
			onChange={props.textChangeHandler}
		/>
	);
};

export default Input;
