import '../styles/BikeMarker.css';
import { useRef, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import redMarkerSvg from '../assets/redMarkerIcon.svg';
import greyMarkerSvg from '../assets/greyMarkerIcon.svg';
import Button from './Button';
import { rentBike, returnBike } from '../utils/api';
import { useState } from 'react';

// generate Icons
const redIcon = new Icon({
	iconUrl: redMarkerSvg,
	iconAnchor: [5, 55],
	popupAnchor: [10, -44],
	iconSize: [50, 50],
});
const greyIcon = new Icon({
	iconUrl: greyMarkerSvg,
	iconAnchor: [5, 55],
	popupAnchor: [10, -44],
	iconSize: [50, 50],
});

export default function BikeMarker({ bike, setBikes, bikes }) {
	const [error, setError] = useState('');
	const handleESCPress = (event) => {
		const { keyCode } = event;
		if (keyCode === 27) {
			closePopup();
		}
	};

	// replace bike data in bikesArray
	const updateBikeData = (newBike) => {
		const index = bikes.findIndex((bike) => bike._id === newBike._id);
		if (index >= 0) {
			setBikes((oldData) =>
				oldData.map((oldBike) =>
					oldBike._id === newBike._id ? newBike : oldBike
				)
			);
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

	const handleButtonClick = ({ bikeID, isReturning }) => {
		isReturning
			? returnBike(bikeID)
					.then((response) => {
						//console.log(response.data);
						updateBikeData(response);
						closePopup();
						setError('');
					})
					.catch((err) => {
						setError(err);
					})
			: rentBike(bikeID)
					.then((response) => {
						updateBikeData(response);
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
						onClick={() =>
							handleButtonClick({ bikeID: bike._id, isReturning: bike.rented })
						}
					/>
				</div>
			</Popup>
		</Marker>
	);
}
