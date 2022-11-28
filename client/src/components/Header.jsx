import '../styles/Header.css';
import Logo from '../assets/Logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import axios from 'axios';

function Header({ setIsOpened, loggedIn, setLoggedIn, setError }) {
	const handelLogout = () => {
		axios
			.delete(`http://localhost:8080/auth/logout`)
			.then((response) => {
				setLoggedIn(false);
				setIsOpened(false);
			})
			.catch((err) => {
				setError(err.message);
			});
	};
	return (
		<div className="header">
			<img
				className="header-image"
				src={Logo}
				alt="logo"
			/>
			{!loggedIn ? (
				<button
					onClick={() => setIsOpened(true)}
					className="header-button"
				>
					<FaUserCircle
						size="36px"
						color="grey"
					/>
				</button>
			) : (
				<button
					onClick={() => handelLogout()}
					className="header-button"
				>
					<RiLogoutCircleRLine
						onClick={handelLogout}
						size="36px"
						color="grey"
					/>
				</button>
			)}
		</div>
	);
}

export default Header;
