import React from 'react';
import config from '../../config/main';

const CitySelect = (props) => {

	const generateCities = (data) => {
		return data.map( (item, i) => {
			return <option key={`city-select-${i}`} value={ item.geo }> {item.name} </option>
		});
	}

	const cities = config.cities;

	return (
		<div className="control has-icons-left">
			<div className="select">
				<select className="select"  name="city" id="city">
					{ generateCities(cities) }
				</select>
				<span className="icon is-small is-left">
					<i className="fas fa-map-marker"></i>
				</span>
			</div>
		</div>
	);
};

export default CitySelect;