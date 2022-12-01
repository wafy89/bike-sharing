import '../styles/Button.css';
import React from 'react';

function Button({ onClick, title }) {
	return (
		<button
			onClick={onClick}
			className="button"
			type="submit"
		>
			{title}
		</button>
	);
}

export default Button;
