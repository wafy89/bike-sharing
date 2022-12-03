import '../styles/Header.css';
import { useState, useEffect, useRef } from 'react';
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
	const [openHeader, setOpenHeader] = useState(true);
	const [animationStatus, setAnimationStatus] = useState('');
	const [focus, setFocus] = useState(null);

	const headerRef = useRef(null);

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

	// ALLOW NAVIGATION WITH ARROW KEYS
	const handleArrowKeyPress = (event) => {
		if (!openHeader) return;
		const { keyCode } = event;
		if (keyCode === 37) {
			if (focus < 2) return; // focus on first element
			headerRef.current.querySelector(`#focus-item-${focus - 1}`).focus();
		} else if (keyCode === 39) {
			if (focus > 2) return; // focus on lsat element
			headerRef.current.querySelector(`#focus-item-${focus + 1}`).focus();
		}
	};
	useEffect(() => {
		// close popup with escape key
		window.addEventListener('keydown', handleArrowKeyPress);
		//cleanup
		return () => {
			window.removeEventListener('keydown', handleArrowKeyPress);
		};
	}, [handleArrowKeyPress]);

	return (
		<header
			className="header"
			ref={headerRef}
		>
			<nav
				className="header-navbar"
				aria-label="navigation"
			>
				<div className="header-logo">
					<img
						src={Logo}
						className="header-logo-image"
						alt="logo"
					/>
				</div>
				<ul
					role="menubar"
					className={
						!openHeader ? 'header-navbar-menu' : 'header-navbar-menu open'
					}
					aria-label="navigation links"
					id="nav-menu"
				>
					<li className="header-nav-item">
						<a
							onFocus={() => setFocus(1)}
							id="focus-item-1"
							className="header-nav-link"
							onClick={() => openDialog({ register: true })}
							name="signup"
							role="menuitem"
							aria-label="signup"
							href="#"
						>
							signup
						</a>
					</li>
					<li className="header-nav-item">
						{loggedIn ? (
							<a
								onFocus={() => setFocus(2)}
								id="focus-item-2"
								onClick={handelLogout}
								className="header-nav-link"
								name="logout"
								role="menuitem"
								aria-label="logout"
								href="#"
							>
								logout
							</a>
						) : (
							<a
								onFocus={() => setFocus(2)}
								id="focus-item-2"
								className="header-nav-link"
								onClick={() => openDialog({ register: false })}
								name="login"
								role="menuitem"
								aria-label="login"
								href="#"
							>
								login
							</a>
						)}
					</li>
				</ul>
			</nav>
			<button
				onFocus={() => setFocus(3)}
				id="focus-item-3"
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
		</header>
	);
}

export default Header;
