import React from 'react';
import VariantsBuilder from '../VariantsBuilder/VariantsBuilder';
import config from '../../config/main';

class Filters extends React.Component  {

	constructor (props) {
		super(props);

		this.state = {
			filtersData : {
				'sitefilter'   : '',
				'socialfilter' : ''
			}	
		};

	}

	

	handleChange = (e) => {

		let id    = e.target.id,
			value = e.target.value; 

		const filtersData = {...this.state.filtersData};

		filtersData[id] = value;

		this.setState({ filtersData });

		this.props.handler(filtersData);

	}

	render() {
		return (
			<div>
				<div className="row">
	
					<div className="col-lg-3">
						<div className="form-group">
							<small className="text-muted">Сайт</small>
							<VariantsBuilder 
								id="sitefilter"
								name="sitefilter"
								icon="fas fa-globe"
								prompt={true}
								variants={config.filters.site}
								handler={this.handleChange}
							/>
						</div>
					</div>
	
					<div className="col-lg-3">
						<div className="form-group">
							<small className="text-muted">Профили</small>
							<VariantsBuilder 
								id="socialfilter"
								name="socialfilter"
								icon="far fa-user-circle"
								prompt={true}
								variants={config.filters.social}
								handler={this.handleChange}							
							/>
						</div>
					</div>
					<div className="col-lg-2">

					</div>
					<div className="col-lg-2">

					</div>
					<div className="col-lg-2">
						<br/>
						<button 
							onClick={ this.props.exportHandler }
							className="button is-success expand">
							<span className="icon is-small">
								<i className="far fa-file-excel"></i>
							</span>
							<span>Выгрузить</span>
						</button>
					</div>
	
				</div>
			</div>
		);
	}
};

export default Filters;