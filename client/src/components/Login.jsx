import '../styles/Login.css';
import { useState, useEffect } from 'react';
import Button from './Button';

function Login({ isOpen, setIsOpen }) {
	const [isRegister, setIsRegister] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="wrapper">
			<div className="card">
				<div className="form">
					<h3 className="form-header">{isRegister ? 'Register' : 'Login'}</h3>
					<form className="form-content">
						<div className="form-field">
							<label
								className="form-content-label"
								htmlFor="user-email"
							>
								Email
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
								Password
							</label>
							<input
								id="user-password"
								className="form-content-input"
								type={showPassword ? 'text' : 'password'}
								name="password"
								required
							/>
						</div>
						<div className="form-divider" />
						<div className="form-actions">
							<Button
								title={isRegister ? 'Register' : 'Login'}
								onClick={() => {}}
							/>

							<a
								onClick={() => setIsRegister(!isRegister)}
								className="signup"
							>
								{isRegister
									? 'Have account already?'
									: "Don't have account yet?"}
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
