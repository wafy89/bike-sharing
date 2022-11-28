import '../styles/Login.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
// ICONS
import { BiShowAlt } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';

function Login({ isOpen, setIsOpen }) {
	const [isRegister, setIsRegister] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [closeModule, setCloseModule] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

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
				console.log(response.data);
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
								htmlFor="email"
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
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
					{error && <div>{error}</div>}
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
