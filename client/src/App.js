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
	useEffect(() => {
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
	const [isOpened, setIsOpened] = useState(false);
	return (
		<>
			<Header
				setIsOpened={setIsOpened}
				className="menu"
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
			{isOpened && <Login setIsOpen={setIsOpened} />}
		</>
	);
}

export default App;
