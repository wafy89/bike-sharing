import '../styles/Header.css';
import { AiOutlineUser } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { logout } from '../utils/api';

function Header({ setIsOpened, loggedIn, setLoggedIn, setError }) {
	const handelLogout = () => {
		logout()
			.then(() => {
				setLoggedIn(false);
			})
			.catch((err) => {
				setError(err);
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
