import React from 'react';
import { TileLayer, MapContainer } from 'react-leaflet';
function Map({ children }) {
	return (
		<main>
			<MapContainer
				className="map-container"
				center={[51.34034237332582, 12.373281214849849]} // Leipzig Location
				zoom={15}
			>
				<TileLayer
					url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
					attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
				/>
				{children}
			</MapContainer>
		</main>
	);
}

export default Map;
