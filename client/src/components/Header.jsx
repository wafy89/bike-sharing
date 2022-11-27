import '../styles/Header.css';
import Logo from '../assets/Logo.png';
import { FaUserCircle } from 'react-icons/fa';

function Header({ setIsOpened }) {
	return (
		<div className="header">
			<img
				className="header-image"
				src={Logo}
				alt="logo"
			/>
			<button
				onClick={() => setIsOpened(true)}
				className="header-button"
			>
				<FaUserCircle
					size="36px"
					color="grey"
				/>
			</button>
		</div>
	);
}

export default Header;
