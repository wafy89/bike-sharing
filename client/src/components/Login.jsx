import '../styles/Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
// ICONS
import { BiShowAlt } from 'react-icons/bi';
import { TfiClose, TfiEmail, TfiLock } from 'react-icons/tfi';

function Login({ isOpen, setIsOpen, setLoggedIn, error, setError }) {
	const [isRegister, setIsRegister] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [closeModule, setCloseModule] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handelClosing = () => {
		setTimeout(() => {
			setIsOpen(false);
		}, 1000); //waiting for closing animation to be done
		setCloseModule(true); // animation starts
	};

	const handelSubmit = (e) => {
		const route = isRegister ? 'register' : 'login';
		e.preventDefault();
		axios
			.post(`http://localhost:8080/auth/${route}`, { email, password })
			.then((response) => {
				if (response.data) setLoggedIn(true);
				handelClosing();
			})
			.catch((err) => {
				setError(err.message);
			});

		handelClosing();
	};

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
				>
					<div className="form-header">
						<h2>{isRegister ? 'Register' : 'Login'}</h2>
						<TfiClose
							onClick={handelClosing}
							className="form-close"
						/>
					</div>
					<p className="form-discription">
						{isRegister
							? 'Use your email and password to register'
							: 'Use your email and password to login.'}
					</p>
					<div className="form-content">
						<div className="form-field">
							<label
								className="form-content-label"
								htmlFor="email"
							>
								<TfiEmail />
							</label>
							<input
								id="user-email"
								className="form-content-input"
								type="email"
								name="email"
								placeholder="EMAIL"
								required
								autoFocus={true}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="form-field">
							<label
								className="form-content-label"
								htmlFor="user-password"
							>
								<TfiLock />
							</label>
							<input
								id="user-password"
								className="form-content-input"
								type={showPassword ? 'text' : 'password'}
								name="password"
								value={password}
								placeholder="PASWORD"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<BiShowAlt
								onClick={() => {
									setShowPassword(!showPassword);
								}}
								color="#b39bab"
								size={25}
								className="show-icon"
							/>
						</div>
					</div>
					{error && <p>{error}</p>}
					<div className="form-actions">
						<Button title={isRegister ? 'Signup' : 'Login'} />
						<a
							onClick={() => setIsRegister(!isRegister)}
							className="regisler-link"
							accessKey="s"
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
