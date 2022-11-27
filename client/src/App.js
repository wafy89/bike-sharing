import './App.css';
import Map from './components/Map';
import BikeMarker from './components/BikeMarker';
import Login from './components/Login';
import { locations } from './mocks/locations';
import { useState } from 'react';

function App() {
	const [isOpened, setIsOpened] = useState(true);
	return (
		<>
			<Map>
				{locations.map((bike) => (
					<BikeMarker
						key={`${bike.lat} ${bike.lng}`}
						bike={bike}
					/>
				))}
			</Map>
			<button
				onClick={() => setIsOpened(!isOpened)}
				className="menu"
			>
				OPEN
			</button>
			{isOpened && <Login />}
		</>
	);
}

export default App;
