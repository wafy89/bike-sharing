import '../styles/BikeMarker.css';
import { useRef, useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import redMarkerSvg from '../assets/redMarkerIcon.svg';
import greyMarkerSvg from '../assets/greyMarkerIcon.svg';
import Button from './Button';
import { rentBike } from '../utils/api';

// generate marker Icons
const redIconOptions = {
	iconUrl: redMarkerSvg,
	iconAnchor: [5, 55],
	popupAnchor: [10, -44],
	iconSize: [50, 50],
};
const greyIconOptions = {
	iconUrl: greyMarkerSvg,
	iconAnchor: [5, 55],
	popupAnchor: [10, -44],
	iconSize: [50, 50],
};

export default function BikeMarker({
	bike,
	setBikes,
	bikes,
	setIsLoginOpened,
}) {
	const [error, setError] = useState('');
	const [loginLink, setLoginLink] = useState(false);
	const [myBikeData, setMyBikeData] = useState(null);

	// FORCE FOCUS ON POPUP
	const [refVisible, setRefVisible] = useState(false);
	const buttonRef = useRef(null);
	useEffect(() => {
		//force focus on button if buttonRef === null
		if (refVisible) {
			buttonRef.current.focus();
		}
	}, [refVisible]);

	// UPDATE CLOSE POPUP FUNCTION
	const map = useMapEvents({
		popupclose(popup) {
			// cleanup States
			setError('');
			setLoginLink(false);
			setMyBikeData(null);
			// setting focus on source marker ( dosen't work when rent bike triggered because the icon ref is changed )
			popup.popup._source._icon.focus();
		},
	});

	// CLOSE POPUP BY ESC KEY
	const handleESCPress = (event) => {
		const { keyCode } = event;
		if (keyCode === 27) {
			map.closePopup();
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

	// POINT ON USER'S RENTED BIKE
	const goToMyBike = () => {
		map.closePopup();
		map.flyTo([myBikeData.lat, myBikeData.lng], 17);
	};

	// REFRESH MARKERS ON MAP
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

	// PRIMARY BUTTON HANDLER
	const handleButtonClick = ({ bikeID, isReturning }) => {
		rentBike({ bikeID, isReturning })
			.then((response) => {
				updateBikeData(response);
				map.closePopup();
				setError('');
			})
			.catch((err) => {
				if (err.status === 401) {
					setError(err.data);
					setLoginLink(true);
				} else {
					setError(err.data.message);
					setMyBikeData(err.data.myBike);
				}
			});
	};

	return (
		<Marker
			position={[bike.lat, bike.lng]}
			icon={new Icon(bike.rented ? greyIconOptions : redIconOptions)}
		>
			<Popup>
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
							<p className="details-error">
								{error}{' '}
								{loginLink && (
									<a
										onClick={() => openLogin(true)}
										className="login-link"
										href="#"
										tabIndex={0}
									>
										Login?
									</a>
								)}
								{/* allow user to find his bike */}
								{myBikeData && (
									<a
										onClick={goToMyBike}
										className="login-link"
										href="#"
										tabIndex={0}
									>
										Take me to my bike
									</a>
								)}
							</p>
						)}
					</section>
					<Button
						ref={(el) => {
							buttonRef.current = el;
							setRefVisible(true);
						}}
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
