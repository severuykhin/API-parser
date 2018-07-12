import React from 'react';
import config from '../../../config/main';
import VariantsBuilder from '../../VariantsBuilder/VariantsBuilder';


const RemetrikaIndexForm = (props) => {

	if (!props.counters) return <div className="stub is-loading"></div>;

	const counters = props.counters.map( item => {
		return {
			name  : `${item.site} - ${item.name}`,
			value : item.id
		};
	});

	const periods = [...config.periods];

	/**
	 * Parse data from form when input change
	 * @param { object } e 
	 */
	const getValues = (e) => {
		const form      = e.target.form;
		const period    = form.period.value;
		const counterId = form.counters.value;
		
		const data = { period, counterId };

		props.handler(data);
	}

	return (
		<div className="remetrika-index-form">
			<form 
				action="/"
				onSubmit={this.handleSubmit}
				>

				<div className="form-group">
					<small className="text-muted">Проект</small>
					<VariantsBuilder 
						id="counters"
						name="counters"
						variants={counters}
						icon="fas fa-globe"
						handler={(e) => { getValues(e) }}
					/>
				</div>

			
				<div className="form-group">
					<small className="text-muted">Период</small>
					<VariantsBuilder 
						id="period"
						name="period"
						variants={periods}
						handler={(e) => { getValues(e) }}
					/>
				</div>
			</form>
		</div>
	);
};

export default RemetrikaIndexForm;