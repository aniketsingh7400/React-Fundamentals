import React from 'react';
import './Button.css';

const Button = ({ onClickHandler, buttonText }) => {
	return <button onClick={onClickHandler}>{buttonText}</button>;
};

export default Button;
