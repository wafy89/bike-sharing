import './App.css';
import Map from './components/Map';
import BikeMarker from './components/BikeMarker';
import Login from './components/Login';
import { locations } from './mocks/locations';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import axios from 'axios';

const baseURL = 'http://localhost:8080/';

function App() {
	const [bikes, setBikes] = useState([]);
	const [isOpened, setIsOpened] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		// fetch all bikes
		axios
			.get('http://localhost:8080/bikes')
			.then((response) => {
				console.log(response.data);
				setBikes(response.data);
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
					locations.map((bike, index) => (
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
				/>
			)}
		</>
	);
}

export default App;
