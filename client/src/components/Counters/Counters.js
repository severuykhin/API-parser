import React, { Component } from 'react';
import DataProvider from '../../utils/DataProvider';
import QueryBuilder from '../../utils/queryBuilder';


class Counters extends Component {

	constructor(props) {
		super(props);
		this.provider = new DataProvider();
		this.queryBuilder = new QueryBuilder();

		this.state = {
			data : null
		};
	}
	

	componentWillMount() {
		const query = this.queryBuilder.makeGet(
			'/api/counters',
			{
				'field'       : 'goals',
			}
		);

		this.getData(query);
	}

	getData(query) {
		this.provider.get(query)
			.then( data => {
				this.setState({ data });
			})
			.catch(e => {
				if (e)
					throw e;
			});
	}

	generateCounters(data) {
		console.log(data);
		  return (
			<table className="uk-table uk-table-striped">
				<thead>
					<tr>
						<th>Название счетчика</th>
						<th>Сайт</th>
						<th>Перейти в отчет</th>
					</tr>
				</thead>
				<tbody>
					{ data.map( item => {
						return (
							<tr key={item.id}>
								<td>{item.name}</td>
								<td><a className="uk-link-muted" href={`http://${item.site}`}>{item.site}</a></td>
								<td>lol</td>
							</tr>
						);
					}) }
				</tbody>
			</table>
		);
	}

	render() {
		return this.state.data ? this.generateCounters(this.state.data.counters) : null;
	}
}

export default Counters;