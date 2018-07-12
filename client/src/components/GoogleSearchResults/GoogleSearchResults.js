import React, { Component } from 'react';

class GoogleSearchResults extends Component {

	geneateRows(data) {

		console.log('hello from rows');

		return data.map( (item, i) => {

			let isOpenNow  = item.opening_hours ? item.opening_hours.open_now : false;
			let isInExport = this.props.exportData.find( i => {
				if (i.result.place_id === item.place_id) return true;
				else return false;
			}); 

			return (
				<tr key={`google-places-row-${i + 1}`}>
					<td>{i + 1}</td>
					<td>{ item.name }</td>
					<td>{ item.vicinity }</td>
					<td className="centered">{ isOpenNow ? 
						<div className="is-primary is-rounded">
							<span className="icon is-small">
								<i className="fas fa-check"></i>
							</span>
						</div> : null }
					</td>
					<td>
					<button 
						className="button"
						onClick={() => {
							console.log(item); 
							this.props.showQuickView(item.place_id) }}>
						<span className="icon is-small">
							<i className="fas fa-eye"></i>
						</span>
					</button>
					</td>					
					<td>
						<label className="checkbox">
							<input 
								id={`google-places-export-${i + 1}`} 
								type="checkbox"
								checked={ isInExport ? true : false }
								onChange={this.props.resolveExport} 
								value={item.place_id}/>
						</label>
					</td>
				</tr>
			);
		});
	}

	render() {

		if (this.props.data.length <= 0) return null;

		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>№</th>
							<th>Название</th>
							<th>Адрес</th>
							<th>Открыто</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.geneateRows(this.props.data)}
					</tbody>
				</table>				
			</div>
		);
	}
}

export default GoogleSearchResults;