import React, { Component } from 'react';
import DataProvider from '../../utils/DataProvider';
import QueryBuilder from '../../utils/queryBuilder';

import RemetikaNav from '../RemetrikaComponents/RemetrikaNav/RemetrikaNav';
import RemetrikaIndexForm from '../RemetrikaComponents/RemetrikaIndexForm/RemetrikaIndexForm';
import RemetrikaCounters from '../RemetrikaComponents/RemetrikaCounters/RemetrikaCounters';


class Remetrika extends Component {

	constructor(props) {
		super(props);
		this.provider     = new DataProvider();
		this.queryBuilder = new QueryBuilder();

		this.state = {
			data : null,
			counters : null,
			busy : false,
			countersQuery : {
				'ids'         : '47772808',
				'metrics'     : 'ym:s:visits,ym:s:pageviews,ym:s:users',
				'dimensions'  : 'ym:s:date',
				'date1'       : '356daysAgo',
				'date2'       : 'yesterday',
				'sort'        : 'ym:s:date',
			}
		};
	}

	componentWillMount() {
		const query = this.queryBuilder.makeGet(
			'/remetrika/index',
			this.state.countersQuery
		);

		this.getData(query);
	}

	getData(query) {

		Promise.all([
			this.provider.get('/remetrika/counters'),
			this.provider.get(query)
		])
			.then( data  => {
				console.log(data);
				this.setState({ 
					data : data[1].data,
					counters : data[0].counters 
				});
			})
			.catch(e => {
				if (e)
					throw e;
			});
	}

	/**
	 * @param { object } data - данные для поиска
	 */ 
	getCounterSummary = (data) => {

		this.setState({ busy : true });

		const params = {...this.state.countersQuery};

		params.date1 = data.period;
		params.ids   = data.counterId;

		const query = this.queryBuilder.makeGet( '/remetrika/index', params );

		this.provider.get(query)
			.then( data => {
				this.setState({
					data : data.data,
					busy : false
				});
			})
			.catch( e => { throw e });

	}

	render() {
		return (
			<div className="remetrika">
				<div className="remetrika-left">
					<RemetikaNav />

					<div className="panel-block">
						<RemetrikaIndexForm
							handler={this.getCounterSummary} 
							counters={this.state.counters} />
					</div>

				</div>			
				<div className="remetrika-right">
					<h1 className="title">Общая статистика</h1>
					<h2 className="subtitle">За выбранный период</h2>
					<RemetrikaCounters
						busy={this.state.busy} 
						data={this.state.data}/>
				</div>
			</div>
		);
	}
}

export default Remetrika;