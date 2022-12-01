import '../styles/Header.css';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { IoFilterCircleSharp } from 'react-icons/io5';
import { logout } from '../utils/api';
import Logo from '../assets/bicycle.png';

function Header({
	setIsRegister,
	setIsLoginOpened,
	loggedIn,
	setLoggedIn,
	setError,
}) {
	const [openHeader, setOpenHeader] = useState(false);
	const [animationStatus, setAnimationStatus] = useState('');

	const switchOpen = () => {
		if (openHeader) {
			setAnimationStatus('closing');
			setOpenHeader(false);
			setTimeout(() => {
				setAnimationStatus('');
			}, 1000);
		} else {
			setAnimationStatus('opening');
			setOpenHeader(true);
			setTimeout(() => {
				setAnimationStatus('');
			}, 1000);
		}
	};

	const handelLogout = () => {
		logout()
			.then(() => {
				setLoggedIn(false);
			})
			.catch((err) => {
				setError(err);
			});
	};

	const openDialog = ({ register }) => {
		if (register) {
			setIsRegister(true);
		} else {
			setIsRegister(false);
		}
		setIsLoginOpened(true);
	};
	return (
		<>
			<button
				className="burger-menu"
				name="burger-menu"
				onClick={switchOpen}
				tabIndex={0}
			>
				<IoFilterCircleSharp
					className={
						!animationStatus
							? 'burger-menu-icon'
							: animationStatus === 'opening'
							? 'burger-menu-icon spin'
							: 'burger-menu-icon reverse'
					}
				/>
			</button>
			<header className={!openHeader ? 'header' : 'header open'}>
				<div className="header-logo">
					<img
						src={Logo}
						className="header-logo-image"
					/>
				</div>
				<nav className="header-nav">
					<a
						className="header-nav-item "
						onClick={() => openDialog({ register: true })}
						name="signup"
						href="#"
						tabIndex={1}
					>
						signup
					</a>
					{loggedIn ? (
						<a
							className="header-nav-item"
							onClick={handelLogout}
							name="logout"
							href="#"
							tabIndex={2}
						>
							logout
						</a>
					) : (
						<a
							className="header-nav-item "
							onClick={() => openDialog({ register: false })}
							name="login"
							href="#"
							tabIndex={2}
						>
							login
						</a>
					)}
				</nav>
			</header>
		</>
	);
}

export default Header;
