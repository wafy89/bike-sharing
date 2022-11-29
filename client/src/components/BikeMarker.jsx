import '../styles/BikeMarker.css';
import { useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import redMarkerSvg from '../assets/redMarkerIcon.svg';
import greyMarkerSvg from '../assets/greyMarkerIcon.svg';
import Button from './Button';
import { rentBike } from '../utils/api';
import { useState } from 'react';

// generate Icons
const redIcon = new Icon({
	iconUrl: redMarkerSvg,
	iconAnchor: [5, 55],
	popupAnchor: [10, -44],
	iconSize: [30, 30],
});
const greyIcon = new Icon({
	iconUrl: greyMarkerSvg,
	iconAnchor: [5, 55],
	popupAnchor: [10, -44],
	iconSize: [30, 30],
});

export default function BikeMarker({ bike }) {
	const [error, setError] = useState('');
	const handleESCPress = (event) => {
		const { keyCode } = event;
		if (keyCode === 27) {
			closePopup();
		}
	};

	// close popup functionality
	const popupRef = useRef(null);
	const closePopup = () => {
		if (!popupRef.current || !popupRef.current._closeButton) return;
		popupRef.current._closeButton.click();
	};

	useEffect(() => {
		// close popup with escape key
		window.addEventListener('keydown', handleESCPress);
		//cleanup
		return () => {
			window.removeEventListener('keydown', handleESCPress);
		};
	}, []);

	const handleButtonClick = (bikeId) => {
		rentBike(bikeId)
			.then((response) => {
				console.log(response.data);
				closePopup();
				setError('');
			})
			.catch((err) => {
				setError(err);
			});
	};

	return (
		<Marker
			position={[bike.lat, bike.lng]}
			icon={bike.rented ? greyIcon : redIcon}
		>
			<Popup ref={popupRef}>
				<div className="popup">
					<section className="popup-details">
						<h2 className="popup-details-header">{`Bike  >${bike.name}<`}</h2>
						<p className="popup-details-sub_header">This bike is for rent</p>
						<ol>
							<li>Click on Rent Bike</li>
							<li>Bike lock will unlock automatically</li>
							<li>Adjust suddle height and happy ride</li>
						</ol>
						{error && <p className="popup-details-error">{error}</p>}
					</section>
					<Button
						title={bike.rented ? 'Return Bike' : 'Rent Bike'}
						onClick={() => handleButtonClick(bike._id)}
					/>
				</div>
			</Popup>
		</Marker>
	);
}
