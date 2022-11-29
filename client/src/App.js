import './App.css';
import Map from './components/Map';
import BikeMarker from './components/BikeMarker';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { getAllBikes, checkAuthentication } from './utils/api';

function App() {
	const [bikes, setBikes] = useState([]);
	const [isOpened, setIsOpened] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState('');

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
				setIsOpened={setIsOpened}
				loggedIn={loggedIn}
				className="menu"
				setError={setError}
				setLoggedIn={setLoggedIn}
			/>
			<Map>
				{bikes.length &&
					bikes.map((bike, index) => (
						<BikeMarker
							key={`${bike.lat} ${bike.lng}`}
							bike={bike}
							bikeID={index}
						/>
					))}
			</Map>
			{isOpened && (
				<Login
					setLoggedIn={setLoggedIn}
					setIsOpen={setIsOpened}
					setError={setError}
					error={error}
				/>
			)}
		</>
	);
}

export default App;
