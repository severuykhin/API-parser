import React, { Component } from 'react';
import DataProvider from '../../utils/DataProvider';
import QueryBuilder from '../../utils/queryBuilder';
import CitySelect   from '../CitySelect/CitySelect';
import RadiusSelect from '../RadiusSelect/RadiusSelect';
import YandexMap    from '../YandexMap/YandexMap';
import Table 		from '../Table/Table';
import VariantsBuilder from '../VariantsBuilder/VariantsBuilder';
import Filters from '../Filters/Filters';
import Button from '../Button/Button';
import config from '../../config/main';
import makeExport from '../../utils/makeExport';


class Search extends Component {

	constructor(props) {
		super(props);
		
		this.provider = new DataProvider();
		this.queryBuilder = new QueryBuilder();

		this.state = {
			busy : false,
			results : null,
			features : [],
			cities : [],
			params : {
				'll'      : '37.64,55.76',
			}
		};

	}

	makeExport = () => {
		makeExport(this.state.features);
	}

	makeSearch(config) {

		const params = {
				'text'    : config.text,
				'lang'    : 'ru_RU',
				'll'      : config.city,
				'spn'     : config.radius,
				'type'    : 'biz',
				'results' : config.results,
				'skip'    : 0	
			};

		this.makeQuery(params);
	}

	makeQuery(params, isLoadMore) {
		const query = this.queryBuilder.makeGet('/api/search', params);

		this.setState({ busy : true });

		this.provider.get(query)
			.then( data  => {

				console.log(data);

				const resFeatures = isLoadMore ? [...this.state.features, ...data.features] : data.features;

				this.setState({
					busy     : false,
					backup   : resFeatures,
					features : resFeatures,
					params
				});
			})
			.catch( e  => {
				throw e;
			});
	}

	loadMore = (e) => {
		const newParams = {...this.state.params};
		newParams.skip = +newParams.skip + +newParams.results;
		this.makeQuery(newParams, true);		
	}

	/**
	 * @param {array} cities - Array of cities geo points
	 * @param {string} text - Search phrase
	 */
	parseCities = (cities, text) => {
		const query = this.queryBuilder.makeGet('/api/parse', { cities, text });

		this.setState({ busy : true });

		this.provider.get(query)
			.then( data => {
				console.log(data);
				this.setState({ busy : false });
			})
			.catch(e => {
				throw e;
			});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		
		let city    = e.target.city;
		let options = city.options;
		let text    = e.target.text.value;
		let radius  = e.target.radius.value;
		let results = e.target.results.value;

		if (!text) { 
			alert('Введите поисковую фразу');
			return;
		}

		const cities = [];

		[].slice.apply(options, [0]).forEach( option => {
			if (option.selected) {
				cities.push(option.value);
			}
		});

		if (cities.length === 1) {
			this.makeSearch({ city : cities[0], text, radius, results });
		} else {
			// this.parseCities(cities, text);
			this.setState({cities});
		}

	}

	handleFilter = (params) => {
		console.log(params);
		let data = [...this.state.backup];

		// Filter by site
		if (params.sitefilter === '1') {
			data = data.filter( i => i.properties.CompanyMetaData.url !== undefined);
		} else if (params.sitefilter === '2') {
			data = data.filter( i => i.properties.CompanyMetaData.url === undefined);
		}

		// Filter by social profiles
		if (params.socialfilter === '0') {
			data = data.filter( i => i.properties.CompanyMetaData.Links === undefined);
		} else if (params.socialfilter === '1') {
			data = data.filter( i => i.properties.CompanyMetaData.Links !== undefined);			
		}

		this.setState({
			features : data
		});

	}

	makeButton(features) {

		if (!features) return null;

		if (features) {

			let busyClassName = this.state.busy ? 'is-loading' : '';

			const amount  = features.length;
			const offset  = Number(this.state.params.results);

			if (amount % offset !== 0 || amount === 0) return null;

			return ( 	
				<Button
					buttonClass={`button is-warning ${busyClassName}`}
					text={`Ещё ${this.state.params.results}`}
					handler={this.loadMore}
				/> 
			);

		}

		return null;

	}
	
	render() {

		const { params, features, busy } = this.state;

		let busyClassName = busy ? 'is-loading' : '';

		return (
			<div className="search">
				<YandexMap 
					data={features} 
					center={params.ll} />

				<div className="search-inner">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
							<form 
								action="/"
								method="GET"
								onSubmit={this.handleSubmit} 
								>
								<div className="row">
									<div className="col-lg-3">
										<div className="field">
											<small className="text-muted">Города</small>			
											<CitySelect
												size={10}
												multiple={true} />
										</div>
									</div>
									<div className="col-lg-3">
										<div className="form-group">
											<small className="text-muted">Поисковая фраза</small>
											<div className="control has-icons-left">
												<input id="text" className="input" type="text" placeholder="Шкаф купе..." />
												<span className="icon is-small is-left">
													<i className="fas fa-search"></i>
												</span>
											</div>
										</div>	
										<div className="form-group">
											<RadiusSelect />
										</div>
										<div className="form-group">
											<small className="text-muted">Результатов</small>
											<VariantsBuilder 
												id="results"
												name="results"
												variants={config.amountValues}
											/>
										</div>
										<div className="form-group">
											<br/>
											<button className={`button expand is-warning ${busyClassName}`} type="submit" >Искать</button>															
										</div>
									</div>
									<div className="col-lg-3">
										<div className="search-cities-text">
											[{this.state.cities.map(item => {
												return `'${item}',`;
											})}]
										</div>	
									</div>
								</div>
							</form>

							{
								this.state.features.length > 0 ? 
									<Filters 
										handler={ this.handleFilter }
										exportHandler={this.makeExport} /> 
									: null 
							}

							{/* <Filters 
								handler={ this.handleFilter } 
								exportHandler={this.makeExport} 
							/> */}


							<br/>
							<br/>

							<Table data={features} />


							<div className="buttons">
								{ this.makeButton(features) }
							</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Search;