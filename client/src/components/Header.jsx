import '../styles/Header.css';
import Logo from '../assets/Logo.png';
import { AiOutlineUser } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';

import axios from 'axios';

function Header({ setIsOpened, loggedIn, setLoggedIn, setError }) {
	const handelLogout = () => {
		console.log('logout');
		axios
			.delete(`http://localhost:8080/auth/logout`)
			.then((re) => {
				console.log('response', re);
				setLoggedIn(false);
			})
			.catch((err) => {
				setError(err.message);
			});
	};
	return (
		<div className="header">
			<p>Bike-Shaire</p>
			{!loggedIn ? (
				<button
					onClick={() => setIsOpened(true)}
					className="header-icon"
					name="login"
				>
					<AiOutlineUser />
				</button>
			) : (
				<button
					onClick={(e) => handelLogout(e)}
					className="header-icon"
					name="register"
				>
					<TbLogout size="36px" />
				</button>
			)}
		</div>
	);
}

export default Header;
