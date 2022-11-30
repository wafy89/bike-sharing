import '../styles/Header.css';
import { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { IoFilterCircleSharp } from 'react-icons/io5';
import { logout } from '../utils/api';

function Header({
	isRegister,
	setIsRegister,
	setIsOpened,
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
		setIsOpened(true);
	};
	return (
		<>
			<button
				className="header-icon-container"
				name="navigation"
				onClick={switchOpen}
			>
				<IoFilterCircleSharp
					className={
						!animationStatus
							? 'header-icon'
							: animationStatus === 'opening'
							? 'header-icon spin'
							: 'header-icon reverse'
					}
				/>
			</button>
			<div className={!openHeader ? 'header' : 'header open'}>
				<p className="header-logo">Bike-Shaire</p>
				<nav className="header-nav">
					<a
						className="header-nav-item "
						onClick={() => openDialog({ register: true })}
						name="signup"
					>
						signup
					</a>
					{loggedIn ? (
						<a
							className="header-nav-item"
							onClick={handelLogout}
							name="logout"
						>
							logout
						</a>
					) : (
						<a
							className="header-nav-item "
							onClick={() => openDialog({ register: false })}
							name="login"
						>
							login
						</a>
					)}
				</nav>
			</div>
		</>
	);
}

export default Header;
