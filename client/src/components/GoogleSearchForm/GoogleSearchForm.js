import React, { Component } from 'react';
// import config from '../../config/main';
// import VariantsBuilder from '../VariantsBuilder/VariantsBuilder';
import CitySelect from '../CitySelect/CitySelect';
import RadiusSelect from '../RadiusSelect/RadiusSelect';
// import { CSSTransition } from 'react-transition-group';

class GoogleSearchForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			hasError : false
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
	
		const searchData = {
			location : e.target.city.value.split(',').reverse().join(','),
			keyword  : e.target.text.value,
			radius   : e.target.radius.value,
			language : 'ru'
		};

		if (e.target.text.value === '') {
			this.setState({ hasError : true });

			return;
		}

		this.props.makeSearch(searchData);
		this.setState({ hasError : false });
			
	}

	render() {

		let { hasError} = this.state;
		let { isbusy  } = this.props;

		let inputClassName   = hasError ? 'input is-danger' : 'input';
		let controlClassName = hasError ? 'control has-icons-left shake' : 'control has-icons-left';
		let buttonClassName  = isbusy   ? 'button is-info is-loading' : 'button is-info';

		return (
			<div className="google-search-form">
				<h6 className="title is-6">Искать</h6>
				<form 
					action="/"
					onSubmit={this.handleSubmit}
					>

					<div className="field">
						<small className="text-muted">Город</small>			
						<CitySelect />
					</div>

				
					<div className="form-group">
						<small className="text-muted">Поисковая фраза</small>
						<div className={controlClassName}>
							<input id="text" className={inputClassName} type="text"  />
							<span className="icon is-small is-left">
								<i className="fas fa-search"></i>
							</span>
						</div>
					</div>

					<div className="form-group">
						<RadiusSelect type="google" />
					</div>
					<div className="form-group">
						<button className={buttonClassName}>
							<span className="icon">
								<i className="fas fa-search"></i>
							</span>
							<span>Искать</span>
						</button>		
					</div>
					
				</form>
			</div>
		);
	}
}

export default GoogleSearchForm;