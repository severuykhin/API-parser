import React, { Component } from 'react';
import GoogleSearchForm from '../GoogleSearchForm/GoogleSearchForm';
import GoogleSearchResults from '../GoogleSearchResults/GoogleSearchResults';
import QueryBuilder from '../../utils/queryBuilder';
import DataProvider from '../../utils/DataProvider';
import GoogleQuickView from '../GoogleQuickView/GoogleQuickView';
import GoogleExport from '../../components/GoogleExport/GoogleExport';
import makeGoogleExport from '../../utils/makeGoogleExport';
import CacheStore from '../../utils/CacheStore';

import { connect } from 'react-redux';

class GoogleSearch extends Component {

	constructor(props) {
		super(props);

		this.queryBuilder = new QueryBuilder();
		this.dataProvider = new DataProvider();
		this.cacheStore   = new CacheStore();

		this.state = {
			busy     : false,
			store    : [],
			toRender : [],
			nextPage : '',
			export   : []
		};
	}


	/**
	 * Данные для поиска
	 * @param {object} data 
	 */
	makeSearch = (data, isLoadMore) => {
		let query = this.queryBuilder.makeGet('/api/google', data);

		this.setState({ busy : true });

		this.dataProvider.get(query)
			.then( data => {
				if (data && data.status === 'OK') {

					const results = isLoadMore ? [...this.state.store, ...data.results] : data.results;

					this.setState({
						busy     : false,
						store    : results,
						toRender : results,
						nextPage : data.next_page_token			 
					});
				}
			});
	}


	getPlace(id) {
		let query = this.queryBuilder.makeGet('/api/googleplace', {
			placeid    : id,
			language   : 'ru',
		});

		this.dataProvider.get(query)
			.then( data => {
				if (data && data.result) {

					const inCache = this.cacheStore.get(data.result.place_id);

					if (!inCache) {
						this.cacheStore.add(data.result.place_id, data);
					}

					this.setState({
						quickViewOpened : true,
						quickViewData   : data,
						busy  : false,
					});

				} else {
					alert('Произошла ошибка');
				}
			});
		
	}


	loadMore = () => {
		this.makeSearch({
			pagetoken : this.state.nextPage
		}, true);
	}

	showQuickView = (id) => {
		this.setState({ busy : true });

		const inCacheItem = this.cacheStore.get(id);

		if (inCacheItem) {
			this.setState({
				quickViewOpened : true,
				quickViewData   : inCacheItem,
				busy  : false,
			});
		} else {
			this.getPlace(id);
		}

	}

	closeQuickView = (e) => {

		e.preventDefault();

		this.setState({
			quickViewOpened : false,
			quickViewData   : null,
			blurContent : false
		});
	}

	saveExport = () => {
		makeGoogleExport(this.state.export);
	}


	resolveExport = (e) => {
		const item = e.target;
		const place_id = item.value;
		
		let isChecked = item.checked;

		if (isChecked) {
			this.exportAddItem(place_id);
		} else {
			this.exportRemoveItem(place_id);
		}
	}

	exportAddItem(place_id) {

		let isCacheItem = this.cacheStore.get(place_id);

		if (isCacheItem) {

			const exportItems = [...this.state.export];
			exportItems.push(isCacheItem);
			this.setState({
				export : exportItems
			});

			this.props.onAddExport(isCacheItem);
			
			return;
		};

		let query = this.queryBuilder.makeGet('/api/googleplace', {
			placeid    : place_id,
			language   : 'ru',
		});

		this.dataProvider.get(query)
			.then( data => {
				if (data && data.result) {

					this.cacheStore.add(data.result.place_id, data);

					const exportItems = [...this.state.export];
					exportItems.push(data);
					this.setState({
						export : exportItems
					});
					this.props.onAddExport(data);

				} else {
					alert('Произошла ошибка');
				}
			});
	}

	exportRemoveItem(place_id) {
		const exportItems = [...this.state.export];

		const itemToDelete = exportItems.find( i => {
			if (i.result.place_id === place_id) return true;
			else return false;
		});

		if (itemToDelete) {
			let index  = exportItems.indexOf(itemToDelete);
			exportItems.splice(index, 1);

			this.setState({
				export : exportItems
			});
		}
	}

	removeItem = (e) => {
		const item = e.target;
		const place_id = item.getAttribute('value');

		this.exportRemoveItem(place_id);
	}


	render() {
		console.log(this.props.testStore);
		let buttonClassName  = this.state.busy ? 'button is-info is-loading' : 'button is-info';
		let contentClassName = this.state.busy ? 'google-search-right control is-loading' : 'google-search-right control';
		return (
			<div className="google-search">
				<div className="google-search-left">
					<GoogleSearchForm 
						isbusy={this.state.busy}
						makeSearch={this.makeSearch}/>
					<br />
					<GoogleExport 
							key="export"
							data={this.state.export}
							saveExport={this.saveExport}
							removeItem={this.removeItem}/>
				</div>
				<div className={contentClassName}>
					<GoogleSearchResults
						resolveExport={this.resolveExport} 
						showQuickView={this.showQuickView}
						data={this.state.toRender}
						exportData={this.state.export} />
					<div>
						{ this.state.nextPage ? <button 
							className={buttonClassName}
							onClick={this.loadMore} >
							<span>Ещё</span>
							<span className="icon is-small">
								<i> </i><i className="fas fa-angle-double-right"></i>
							</span>
						</button> : null}
					</div>
				</div>
					<GoogleQuickView 
						isOpened={this.state.quickViewOpened}
						closeQuickView={this.closeQuickView}
						data={this.state.quickViewData ? this.state.quickViewData : null} />
			</div>
		);
	}
}

export default connect(
	state => ({
		testStore : state
	}),
	dispatch => ({
		onAddExport : (item) => {
			dispatch({
				type : 'ADD_GOOGLE_EXPORT',
				payload : item
			});
		}
	})
)(GoogleSearch);

// export default GoogleSearch;