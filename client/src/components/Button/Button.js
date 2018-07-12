import React from 'react';

const Button = (props) => {
	return (
		<button 
			className={props.buttonClass}
			onClick={props.handler}
			>
			{props.text}
		</button>
	);
};

export default Button;