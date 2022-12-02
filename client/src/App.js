import './App.css';
import Map from './components/Map';
import BikeMarker from './components/BikeMarker';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { getAllBikes, checkAuthentication } from './utils/api';

function App() {
	const [bikes, setBikes] = useState([]);
	const [isLoginOpened, setIsLoginOpened] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState('');
	const [isRegister, setIsRegister] = useState(false);

	useEffect(() => {
		checkAuthentication().then((data) => {
			if (data && data.authenticated) {
				setLoggedIn(true);
			}
		});
		getAllBikes()
			.then((data) => {
				setBikes(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Header
				setIsLoginOpened={setIsLoginOpened}
				loggedIn={loggedIn}
				className="menu"
				setError={setError}
				setLoggedIn={setLoggedIn}
				setIsRegister={setIsRegister}
			/>
			<main>
				<Map>
					{bikes &&
						bikes.map((bike) => (
							<BikeMarker
								key={`${bike.lat} ${bike.lng}`}
								bike={bike}
								setBikes={setBikes}
								bikes={bikes}
								setIsLoginOpened={setIsLoginOpened}
							/>
						))}
				</Map>
				{isLoginOpened && (
					<Login
						setLoggedIn={setLoggedIn}
						setIsLoginOpen={setIsLoginOpened}
						setError={setError}
						error={error}
						isRegister={isRegister}
						setIsRegister={setIsRegister}
					/>
				)}
			</main>
		</>
	);
}

export default App;
