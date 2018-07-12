import React, { Component } from 'react';
import DataProvider from '../../../utils/DataProvider';

class RemetrikaAvailableCounters extends Component {

	constructor(props) {
		super(props);

		this.dataProvider = new DataProvider();

		this.state = {
			counters : []
		};
	}

	addToSummary = (e) => {

		const isChecked = e.target.checked;
		const id        = e.target.value;

		// Avoid side effects
		const counter = [...this.state.counters].find( item => {
			if (item.id === Number(id)) return true;
			else return false;
		});

		if (!counter) throw new Error('No counter find in STATE');

		if (isChecked) {
			this.props.addCounter(counter);
		} else {
			this.props.removeCounter(counter);
		}
	}

	componentWillMount() {

		this.dataProvider.get('/remetrika/counters')
			.then( data => {
				this.setState({ counters : data.counters });
			})
			.catch( e => { throw e })

	}

	renderCounter = (item, i) => {
		return (
			<div key={`re-checkbox-${i}`} className="re-chechbox">
				<input 
					type="checkbox" 
					id={`re-checkbox-${i}`} 
					value={item.id}
					onChange={this.addToSummary}
					/>
				<label htmlFor={`re-checkbox-${i}`}>{`${item.name}`}</label>
			</div>
		);
	}

	render() {
		return (
			<div className="rem-av-counters">
				{ this.state.counters.map(this.renderCounter) }	
			</div>
		);
	}
}

export default RemetrikaAvailableCounters;