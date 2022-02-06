import React from 'react';
import './Button.css';

const Button = (props) => {
	return <button onClick={props.onClickHandler}>{props.buttonText}</button>;
};

export default Button;
