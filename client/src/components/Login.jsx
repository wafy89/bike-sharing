import '../styles/Login.css';
import { useState, useEffect } from 'react';
import Button from './Button';
import { authenticate } from '../utils/api';
// ICONS
import { BiShowAlt } from 'react-icons/bi';
import { TfiClose, TfiEmail, TfiLock } from 'react-icons/tfi';

function Login({
	setIsLoginOpen,
	setLoggedIn,
	error,
	setError,
	isRegister,
	setIsRegister,
}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [closeModule, setCloseModule] = useState(false);

	const handelClosing = () => {
		setTimeout(() => {
			setError('');
			setIsLoginOpen(false);
		}, 1000); //waiting for closing animation to be done
		setCloseModule(true); // animation starts
	};

	const handelSubmit = (e) => {
		e.preventDefault();
		setError('');
		const requestType = isRegister ? 'register' : 'login';

		authenticate({ requestType, email, password })
			.then(() => {
				setLoggedIn(true);
				handelClosing();
			})
			.catch((err) => {
				setError(err);
			});
	};
	// ALLOW CLOSING LOGIN WITH ESC KEY
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
	}, [handleESCPress]);

	return (
		<div className={`wrapper ${closeModule ? 'close' : 'open'}`}>
			<div className="card">
				<form
					className="form"
					onSubmit={handelSubmit}
					name="login"
				>
					<div className="form-header">
						<h2>{isRegister ? 'Register' : 'Login'}</h2>
						<button
							aria-label="close"
							name="close"
							className="form-close"
						>
							<TfiClose
								onClick={handelClosing}
								className="form-close"
							/>
						</button>
					</div>
					<p
						aria-label="required credentials"
						className="form-discription"
					>
						{isRegister
							? 'Use your email and password to register'
							: 'Use your email and password to login.'}
					</p>
					<div className="form-content">
						<div className="form-field">
							<label
								htmlFor="email"
								className="form-content-label"
							>
								EMAIL
							</label>
							<span
								className="form-content-icon"
								aria-label="email"
							>
								<TfiEmail aria-label="email-icon" />
							</span>
							<input
								id="email"
								className="form-content-input"
								type="email"
								name="email"
								aria-label="email input"
								required
								autoFocus={true}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="form-field">
							<label
								htmlFor="password"
								className="form-content-label"
							>
								PASSWORD
							</label>
							<span
								className="form-content-icon"
								htmlFor="password"
							>
								<TfiLock aria-label="email-icon" />
							</span>
							<input
								id="password"
								required
								className="form-content-input"
								type={showPassword ? 'text' : 'password'}
								name="password"
								aria-label="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<BiShowAlt
								onClick={() => {
									setShowPassword(!showPassword);
								}}
								aria-label="show password"
								color="#b39bab"
								size={25}
								className="show-icon"
							/>
						</div>
					</div>
					{error && <p className="form-error">{error}</p>}
					<div
						className="form-actions"
						aria-label="form actions"
					>
						<Button title={isRegister ? 'Signup' : 'Login'} />
						<a
							onClick={() => setIsRegister(!isRegister)}
							className="regisler-link"
							role="button"
							href="#"
						>
							{`${
								isRegister
									? 'Have account already? login.'
									: 'No account yet? regitrer.'
							}`}
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
