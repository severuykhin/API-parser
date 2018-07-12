import React, { Component } from 'react';
import RemetikaNav from '../RemetrikaNav/RemetrikaNav';
import RemetrikaAvailableCounters from '../RemetrikaAvailableCounters/RemetrikaAvailableCounters';
import RemetrikaSummaryTable from '../RemetrikaSummaryTable/RemetrikaSummaryTable';
import QueryBuilder from '../../../utils/queryBuilder';
import DataProvider from '../../../utils/DataProvider';
import VariantsBuilder from '../../VariantsBuilder/VariantsBuilder';
import config from '../../../config/main';

class RemetrikaSummary extends Component {

	constructor(props) {
		super(props);

		this.queryBuilder = new QueryBuilder();
		this.dataProvider = new DataProvider();

		this.state = {
			busy : false,
			activeCounters : {},
			type  : 'date',
			data  : [],
			paramsPreset : {
				'ids'         : '',
				'metrics'     : 'ym:s:visits,ym:s:pageviews,ym:s:users,ym:s:pageDepth,ym:s:sumGoalReachesAny',
				'dimensions'  : 'ym:s:date',
				'date1'       : '7daysAgo',
				'date2'       : 'yesterday',
				'sort'        : 'ym:s:date',
				'group'       : 'day',
				'accuracy'    : 'full'	
			}
		};
	}

	/**
	 * 
	 * @param {*} active 
	 */
	refreshData(active, params) {

		const queries = [];

		this.setState({ busy : true });

		for (let i in active) {
			params.ids = active[i].id;

			const query = this.queryBuilder.makeGet('/remetrika/summary', params);

			// Fill with promises
			queries.push(this.dataProvider.get(query));
		}

		Promise.all(queries)
			.then( data => {
				this.setState({ 
					activeCounters : active,
					data,
					paramsPreset : params,
					busy : false 
				});
			})
			.catch( e => { throw e });
	}

	changePeriod = (e) => {
		const value = e.target.value;
		const params = {...this.state.paramsPreset};
		
		if (params.ids === '') {
			alert('Сначала выберите счетчики'); return;
		}

		params.date1 = value;

		this.refreshData({...this.state.activeCounters}, params);

	}

	/**
	 * Remove from active counters by ID
	 * @param {object} counter 
	 */
	removeCounter = (counter) => {
		const active = {...this.state.activeCounters};

		if (active[counter.id]) delete active[counter.id];
		this.refreshData(active, {...this.state.paramsPreset});
	}

	/**
	 * Add to active counters by ID
	 * @param {object} counter 
	 */
	addCounter = (counter) => {

		const active = {...this.state.activeCounters};

		if (!active[counter.id]) {
			active[counter.id] = counter;

			this.refreshData(active, {...this.state.paramsPreset});
		} 
	}

	render() {

		const periods = [...config.periods];

		return (
			<div className="remetrika">
				<div className="remetrika-left">
					<RemetikaNav />

					<div className="panel-block">
						<RemetrikaAvailableCounters
							removeCounter={this.removeCounter}
							addCounter={this.addCounter}/>
					</div>

					<div className="panel-block">
						<div className="form-group">
							<small className="text-muted">Период</small>
							<VariantsBuilder 
								id="period"
								name="period"
								variants={periods}
								handler={this.changePeriod}
							/>
						</div>
					</div>		

				</div>			
				<div className="remetrika-right" style={{
					opacity : this.state.busy ? .5 : 1
				}}>
					<h1 className="title">Сводный отчет по счетчикам</h1>
					<h2 className="subtitle">За выбранный период</h2>
					<RemetrikaSummaryTable
						active={this.state.activeCounters}
						type={this.state.type} 
						data={this.state.data}/>
				</div>
			</div>
		);
	}
}

export default RemetrikaSummary;