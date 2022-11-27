import '../styles/Button.css';
import React from 'react';

function Button({ onClick, title }) {
	return (
		<button
			onClick={onClick}
			className="button"
		>
			{title}
		</button>
	);
}

export default Button;
