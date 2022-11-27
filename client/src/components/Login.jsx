import '../styles/Login.css';
import { useState, useEffect } from 'react';
import Button from './Button';
import { BiShowAlt } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
function Login({ isOpen, setIsOpen }) {
	const [isRegister, setIsRegister] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [closeModule, setCloseModule] = useState(false);
	const handelClick = () => {
		setTimeout(() => {
			setIsOpen(false);
		}, 1000); //waiting for closing animation
		setCloseModule(true);
	};
	return (
		<div className={`wrapper ${closeModule ? 'close' : 'open'}`}>
			<div className="card">
				<button
					onClick={handelClick}
					className="wrapper-closer"
				>
					<AiFillCloseCircle
						size="24px"
						color="red"
					/>
				</button>
				<form className="form">
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
						<Button
							title={isRegister ? 'Register' : 'Login'}
							onClick={handelClick}
						/>

						<a
							onClick={() => setIsRegister(!isRegister)}
							className="signup"
						>
							{isRegister ? 'Have account already?' : "Don't have account yet?"}
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
