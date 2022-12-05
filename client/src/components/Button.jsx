import '../styles/Button.css';
import { forwardRef } from 'react';

const Button = forwardRef(({ onClick, title }, ref) => (
	<button
		onClick={onClick}
		className="button"
		type="submit"
		id="submit"
		ref={ref}
	>
		{title}
	</button>
));

export default Button;
