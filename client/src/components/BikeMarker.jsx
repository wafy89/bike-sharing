import '../styles/BikeMarker.css';
import { useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import redMarkerSvg from '../assets/redMarkerIcon.svg';
import greyMarkerSvg from '../assets/greyMarkerIcon.svg';
import Button from './Button';

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

function BikeMarker({ bike }) {
	// close popup functionality
	const popupRef = useRef(null);
	const closePopup = () => {
		if (!popupRef.current) return;
		popupRef.current._closeButton.click();
	};

	const handleClick = () => {
		closePopup();
	};

	return (
		<Marker
			position={[bike.lat, bike.lng]}
			icon={bike.rented ? greyIcon : redIcon}
		>
			<Popup ref={popupRef}>
				<div className="popup">
					<section className="popup-details">
						<h1 className="popup-details-header">{`Bike  >${bike.name}<`}</h1>
						<p className="popup-details-sub_header">This bike is for rent</p>
						<ol>
							<li>Click on Rent Bike</li>
							<li>Bike lock will unlock automatically</li>
							<li>Adjust suddle height and happy ride</li>
						</ol>
					</section>
					<Button
						title={bike.rented ? 'Return Bike' : 'Rent Bike'}
						onClick={handleClick}
					/>
				</div>
			</Popup>
		</Marker>
	);
}

export default BikeMarker;
