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

	// CLOSE POPUP FUNCTIONALITY
	const [refVisible, setRefVisible] = useState(false);
	const buttonRef = useRef(null);
	const map = useMapEvents({
		popupclose(popup) {
			setError('');
			setLoginLink('');

			// setting focus on source marker ( dosen't work when rent bike triggered because the icon is changed )
			popup.popup._source._icon.focus();
		},
	});

	useEffect(() => {
		//force focus on button if buttonRef === null
		if (refVisible) {
			buttonRef.current.focus();
		}

		//return setRefVisible(false);
	}, [refVisible]);

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
				map.closePopup();
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
							<>
								<p className="details-error">
									{error}{' '}
									{loginLink && (
										<a
											onClick={() => openLogin(true)}
											className="login-link"
											role="button"
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
