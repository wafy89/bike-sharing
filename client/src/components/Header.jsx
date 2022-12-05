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
	const [isSmallScreen, setIsSmallScreen] = useState(null);

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
		if (isSmallScreen) {
			if (keyCode === 38) {
				if (focus < 1) return; // focus on first element
				headerRef.current.querySelector(`#focus-item-${focus - 1}`).focus();
			} else if (keyCode === 40) {
				if (focus > 1) return; // focus on lsat element
				headerRef.current.querySelector(`#focus-item-${focus + 1}`).focus();
			}
		} else {
			if (keyCode === 37) {
				if (focus < 2) return; // focus on first element
				headerRef.current.querySelector(`#focus-item-${focus - 1}`).focus();
			} else if (keyCode === 39) {
				if (focus > 2) return; // focus on lsat element
				headerRef.current.querySelector(`#focus-item-${focus + 1}`).focus();
			}
		}
	};
	useEffect(() => {
		function handleResize() {
			// Set window width/height to state
			if (window.innerWidth < 600) {
				setIsSmallScreen(true);
			} else {
				setIsSmallScreen(false);
			}
		}
		// Add event listener
		window.addEventListener('resize', handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();

		// close popup with escape key
		window.addEventListener('keydown', handleArrowKeyPress);

		//cleanup
		return () => {
			window.removeEventListener('keydown', handleArrowKeyPress);
			window.removeEventListener('resize', handleResize);
		};
	}, [handleArrowKeyPress]);

	return (
		<header
			className={openHeader ? 'header open' : 'header'}
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
							SIGNUP
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
								LOGOUT
							</a>
						) : (
							<a
								onFocus={() => setFocus(2)}
								id={'focus-item-2'}
								className="header-nav-link"
								onClick={() => openDialog({ register: false })}
								name="login"
								role="menuitem"
								aria-label="login"
								href="#"
							>
								LOGIN
							</a>
						)}
					</li>
				</ul>
			</nav>
			<button
				onFocus={() => {
					isSmallScreen ? setFocus(0) : setFocus(3);
				}}
				id={isSmallScreen ? 'focus-item-0' : 'focus-item-3'}
				className="burger-menu"
				name="burger-menu"
				onClick={switchOpen}
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
