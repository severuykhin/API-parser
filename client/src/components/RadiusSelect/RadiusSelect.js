import React from 'react';
import config from '../../config/main';

const RadiusSelect = (props) => {

	const generateOptions = (data) => {
		return data.map( (item, i) => {

			let diameterW = (0.01 * item * 2).toFixed(3);
			let diameterL = (0.009 * item * 2).toFixed(3);

			return  <option 
						key={`radius-select-${i}`}  
						value={`${diameterW},${diameterL}`}> 
						{item} 
					</option>;
		});
	};

	const generateGoogleOptions = (data) => {
		return data.map( (item, i) => {
			return  <option 
						key={`radius-select-${i}`}  
						value={item * 1000}> 
						{item} 
					</option>;
		});
	}

	return (
		<div>
			<small className="text-muted">Радиус(км)</small>
			<div className="control has-icons has-icons-left">
				<div className="select">
					<select className="select" id="radius" name="radius">
						{ props.type === 'google' ? 
							generateGoogleOptions(config.radiusValues) 
							: generateOptions(config.radiusValues) 
						}
					</select>
					<span className="icon is-small is-left">
						<i className="far fa-circle"></i>
					</span>
				</div>
			</div>
		</div>
	);
};

export default RadiusSelect;