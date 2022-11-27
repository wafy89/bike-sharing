import React from 'react';
import { TileLayer, MapContainer } from 'react-leaflet';
function Map({ children }) {
	return (
		<MapContainer
			className="map-container"
			center={[51.34034237332582, 12.373281214849849]} // Leipzig Location
			zoom={15}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{children}
		</MapContainer>
	);
}

export default Map;
