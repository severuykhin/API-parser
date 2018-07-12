import React, { Component } from 'react';
import RemetikaNav from '../RemetrikaNav/RemetrikaNav';
import RemetrikaAvailableCounters from '../RemetrikaAvailableCounters/RemetrikaAvailableCounters';
import VariantsBuilder from '../../VariantsBuilder/VariantsBuilder';
import QueryBuilder from '../../../utils/queryBuilder';
import DataProvider from '../../../utils/DataProvider';
import config from '../../../config/main';

class RemetrikaPresets extends Component {

	queryBuilder = new QueryBuilder();
	dataProvider = new DataProvider();
	
	state = {
		types : [
			{ name : 'Трафик', value : 'traffic' },
			{ name : 'Конверсии', value : 'conversion' },
			{ name : 'Наличие Javascript', value : 'tech_java_script'},
		],
		periods : config.periods,
		data : [],
		activeCounters : {},
		params : {
			'preset' : 'traffic',
			'date1'  : '7daysAgo',
			'date2'  : 'yesterday'
		}
	}

	getData(counters, params) {

		const queries = [];

		this.setState({ busy : true });

		for (let i in counters) {
			params.id = counters[i].id;

			const query = this.queryBuilder.makeGet('/remetrika/index', params);

			// Fill with promises
			queries.push(this.dataProvider.get(query));
		}

		Promise.all(queries)
			.then( data => {

				console.log(data);

				this.setState({ 
					activeCounters : counters,
					data,
					params, 
				});
			})
			.catch( e => { throw e });
	}

	/**
	 * Removes counter from active store
	 */
	removeCounter = (counter) => {
		const active = {...this.state.activeCounters}; // Avoid side effects
		if (active[counter.id]) delete active[counter.id];

		this.getData(active, {...this.state.params});
	}

	/**
	 * Adds counter to active store
	 */
	addCounter = (counter) => {
		const active = {...this.state.activeCounters}; // Avoid side effects
		if (!active[counter.id]) active[counter.id] = counter;

		this.getData(active, {...this.state.params});
	}

	/**
	 * Changes actual summary type
	 */
	changeType = (e) => {
		let value = e.target.value.trim();
		const params = {...this.state.params};

		if (value === '') return;

		params.preset = value;

		this.getData({...this.state.activeCounters}, params);		
	}

	/**
	 * Changes actual summary period
	 */
	changePeriod = (e) => {
		let value = e.target.value.trim();
		const params = {...this.state.params};
		
		if (value === '') return;

		params.date1 = value;
		this.getData({...this.state.activeCounters}, params);		
	}


	render() {

		let { types, periods } = this.state;

		console.log(this.state);
		

		return (
			<div className="remetrika">
				<div className="remetrika-left">
					<RemetikaNav />		
					<div className="panel-block">
						<RemetrikaAvailableCounters
							removeCounter={this.removeCounter}
							addCounter={this.addCounter}/>
					</div>
					<div className="panel-block panel-block_wrap">
						<div className="form-group">
							<small className="text-muted">Тип отчета</small>
							<VariantsBuilder 
								id="type"
								prompt={ true }
								name="type"
								variants={ types }
								handler={ this.changeType }
							/>
						</div>
						<div className="form-group">
							<small className="text-muted">Тип отчета</small>
							<VariantsBuilder 
								id="period"
								prompt={ true }
								name="period"
								variants={ periods }
								handler={ this.changePeriod }
							/>
						</div>
					</div>
				</div>			
				<div className="remetrika-right">
					<h1 className="title">Отчеты по шаблонам</h1>
					<p>Выберите счетчик/-ки, тип и период отчета</p>
				</div>
			</div>
		);
	}
}

export default RemetrikaPresets;