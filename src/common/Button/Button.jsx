import React from 'react';
import './Button.css';

const Button = ({ onClickHandler, buttonText, buttonType }) => {
	return (
		<button type={buttonType} onClick={onClickHandler}>
			{buttonText}
		</button>
	);
};

export default Button;
