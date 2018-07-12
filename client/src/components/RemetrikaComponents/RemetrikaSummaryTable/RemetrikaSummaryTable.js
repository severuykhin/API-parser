import React, { Component } from 'react';
import { presets } from './convertPresets';

class RemetrikaSummaryTable extends Component {

	getPreset(type) {
		return presets[type];
	}

	convertData(data, preset) {
		const convertPreset = this.getPreset(preset);

		return convertPreset(data);
	}

	makeRow(item) {

		const active = this.props.active;

		return (
			<tr key={ item.id }>
				<td>{ active[item.id].name }</td>
				<td>{ item.totalUnique }</td>
				<td>{ item.totalViews }</td>
				<td>{ item.totalVisits }</td>
				<td>{ item.totalPD }</td>
				<td>{ item.totalGoals }</td>
			</tr>			
		);
	}

	makeTable(data) {

		const totals = this.convertData(data, this.props.type);

		if (totals.length <= 0) return null; 

		return (
			<table className="table">
				<tbody>
					<tr>
						<td>Имя</td>
						<td>Уников</td>
						<td>Визитов</td>
						<td>Просмотров</td>
						<td>PD</td>
						<td>Целей</td>
					</tr>
					{ totals.map( i => this.makeRow(i) ) }
				</tbody>	
			</table>
		)
	}

	render() {

		const { data } = this.props;

		if (data.length <= 0) return null;

		return (
			<div>
				{ this.makeTable(data) }
			</div>
		);
	}
}

export default RemetrikaSummaryTable;