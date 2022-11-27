import '../styles/Button.css';
import { forwardRef } from 'react';

const Button = forwardRef((props, ref) => (
	<button
		onClick={props.onClick}
		className="button"
		ref={ref}
	>
		{props.title}
	</button>
));

export default Button;
