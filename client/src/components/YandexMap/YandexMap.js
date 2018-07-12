import React from 'react';
import { 
	YMaps, 
	Map, 
	Placemark } from 'react-yandex-maps';


const YandexMap = (props) => {

	const center = props.center
							.split(',')
								.map( i => Number(i))
									.reverse();

	const mapState = {center, zoom: 14};

	const points = () => {

		if (!props.data) return null;

		return props.data.map( (i, index) => {
			return <Placemark
				key={index}
				geometry={{
					coordinates: i.geometries[0].coordinates.reverse()
				}}	
				options={{
					preset: 'islands#dotIcon',
					iconColor: '#735184'
				}}
			/>
		});
	};

	return (
		<div className="map">
			<YMaps>
				<Map state={mapState} width="100%" >
					{ points() }
				</Map>
			</YMaps>	
		</div>
	);
};

export default YandexMap;