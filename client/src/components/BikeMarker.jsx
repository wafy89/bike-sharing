import '../styles/BikeMarker.css';
import { useRef, useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import redMarkerSvg from '../assets/redMarkerIcon.svg';
import greyMarkerSvg from '../assets/greyMarkerIcon.svg';
import Button from './Button';
import { rentBike } from '../utils/api';

// generate marker Icons
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

export default function BikeMarker({
	bike,
	setBikes,
	bikes,
	setIsLoginOpened,
}) {
	const [error, setError] = useState('');
	const [loginLink, setLoginLink] = useState(false);

	// CLOSE POPUP FUNCTIONALITY
	const popupRef = useRef(null);
	const closePopup = () => {
		if (!popupRef.current || !popupRef.current._closeButton) return;
		popupRef.current._closeButton.click();
	};

	const handleESCPress = (event) => {
		const { keyCode } = event;
		if (keyCode === 27) {
			closePopup();
		}
	};

	useEffect(() => {
		// close popup with escape key
		window.addEventListener('keydown', handleESCPress);
		//cleanup
		return () => {
			window.removeEventListener('keydown', handleESCPress);
		};
	}, []);

	//OPEN LOGIN DIALOG
	const openLogin = () => {
		setIsLoginOpened(true);
		setLoginLink(false);
		setError('');
	};

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

	const handleButtonClick = ({ bikeID, isReturning }) => {
		rentBike({ bikeID, isReturning })
			.then((response) => {
				updateBikeData(response);
				closePopup();
				setError('');
			})
			.catch((err) => {
				if (err.status === 401) {
					setLoginLink(true);
				}
				setError(err.data);
			});
	};

	return (
		<Marker
			position={[bike.lat, bike.lng]}
			icon={bike.rented ? greyIcon : redIcon}
		>
			<Popup ref={popupRef}>
				<div className="popup">
					<section className="details">
						<h2 className="details-header">{`Bike  >${bike.name}<`}</h2>
						<i className="details-status">
							This bike is {bike.rented ? 'not available' : 'available'}
						</i>
						<ol>
							<li>Click on Rent Bike</li>
							<li>Bike lock will unlock automatically</li>
							<li>Adjust suddle height and happy ride</li>
						</ol>
						{error && (
							<>
								<p className="details-error">
									{error}{' '}
									{loginLink && (
										<a
											onClick={() => openLogin(true)}
											className="login-link"
											role="button"
											tabIndex={0}
											href="#"
										>
											Login?
										</a>
									)}
								</p>{' '}
							</>
						)}
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
