import './App.css';
import Map from './components/Map';
import BikeMarker from './components/BikeMarker';
import Login from './components/Login';
import { locations } from './mocks/locations';
import { useState } from 'react';
import Header from './components/Header';

function App() {
	const [isOpened, setIsOpened] = useState(false);
	return (
		<>
			<Header
				setIsOpened={setIsOpened}
				className="menu"
			/>
			<Map>
				{locations.map((bike) => (
					<BikeMarker
						key={`${bike.lat} ${bike.lng}`}
						bike={bike}
					/>
				))}
			</Map>
			{isOpened && <Login setIsOpen={setIsOpened} />}
		</>
	);
}

export default App;
