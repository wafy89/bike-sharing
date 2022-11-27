import '../styles/Login.css';
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
// ICONS
import { BiShowAlt } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';

function Login({ isOpen, setIsOpen }) {
	const [isRegister, setIsRegister] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [closeModule, setCloseModule] = useState(false);

	const handelClosing = () => {
		setTimeout(() => {
			setIsOpen(false);
		}, 1000); //waiting for closing animation to be done
		setCloseModule(true); // animation starts
	};

	const handelSubmit = (e) => {
		e.preventDefault();
		handelClosing();
	};

	// const handleUserKeyPress = (event) => {
	// 	const { keyCode } = event;
	// 	if (keyCode === 27) {
	// 		handelClosing();
	// 	} else if (13) {
	// 		handelSubmit();
	// 	}
	// };
	// const buttonRef = useRef(null);

	// useEffect(() => {
	// 	// close popup with escape key
	// 	window.addEventListener('keydown', handleUserKeyPress);
	// 	console.log({ buttonRef });
	// 	buttonRef.current && buttonRef.current.focus();
	// 	//cleanup
	// 	return () => {
	// 		window.removeEventListener('keydown', handleUserKeyPress);
	// 	};
	// }, []);

	const handleESCPress = (event) => {
		const { keyCode } = event;
		if (keyCode === 27) {
			handelClosing();
		}
	};
	useEffect(() => {
		// close popup with escape key
		window.addEventListener('keydown', handleESCPress);
		//cleanup
		return () => {
			window.removeEventListener('keydown', handleESCPress);
		};
	}, []);
	return (
		<div className={`wrapper ${closeModule ? 'close' : 'open'}`}>
			<div className="card">
				<AiFillCloseCircle
					onClick={handelClosing}
					size="24px"
					color="red"
					className="wrapper-closer"
				/>
				<form
					className="form"
					onSubmit={handelSubmit}
				>
					<h3 className="form-header">{isRegister ? 'Register' : 'Login'}</h3>
					<div className="form-content">
						<div className="form-field">
							<label
								className="form-content-label"
								htmlFor="user-email"
							>
								Email:
							</label>
							<input
								id="user-email"
								className="form-content-input"
								type="email"
								name="email"
								required
								autoFocus={true}
							/>
						</div>
						<div className="form-divider" />
						<div className="form-field">
							<label
								className="form-content-label"
								htmlFor="user-password"
							>
								Password:
							</label>
							<input
								id="user-password"
								className="form-content-input"
								type={showPassword ? 'text' : 'password'}
								name="password"
								required
							/>
							<BiShowAlt
								onClick={() => {
									setShowPassword(!showPassword);
								}}
								color="grey"
								size={25}
								className="show-icon"
							/>
						</div>
						<div className="form-divider" />
					</div>
					<div className="form-actions">
						<Button title={isRegister ? 'Register' : 'Login'} />
						<a
							onClick={() => setIsRegister(!isRegister)}
							className="regisler"
							accessKey="s"
						>
							{`Click or ( alt + s ) to ${isRegister ? 'login' : 'register'}`}
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
