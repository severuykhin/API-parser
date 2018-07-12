import React, { Component } from 'react';
import DefaultValueComponent from './DefaultValueComponent';
import './style.css';


class Select extends Component {

	constructor(props) {
		super(props);

		this.state = {
			itemsContainerBox : {},
			opened : false,
		};
	}

	static defaultProps = {
		valueComponent : DefaultValueComponent,
		items : [],
		onChange : () => {}		
	};

	componentDidMount() {

		const handler = (e) => {
			const target = e.target;
			const elemClassList = target.classList;
			if (elemClassList.contains('value') ||
				elemClassList.contains('mui-select-button')) {
				return;
			}

			this.closeItemsContainer();
			
		}

		window.document.addEventListener('click', handler);
	}

	componentWillUnmount() {
		window.removeEventListener('click', () => {});
	}

	getItemsContainerBox = () => {
		if (!this.rootElement) return;
		
		const rootElementBoundary = this.rootElement.getBoundingClientRect();
		// const itemsContainerElementBoundary = this.itemsContainerElement.getBoundingClientRect();

		const left = rootElementBoundary.left;
		const top  = rootElementBoundary.top;
		return {
			width : `${this.rootElement.offsetWidth}px`,
			left  : `${left}px`,
			top   : `${top}px`
		}
	}

	setItemsContainerBox = () => {
		const itemsContainerBox = this.getItemsContainerBox();
		this.setState({ itemsContainerBox });	 
	}

	closeItemsContainer = () => {
		this.setState({
			opened : false
		});
	}

	openItemsContainer = () => {
		this.setState((state) => ({
			opened : true,
			itemsContainerBox : {
				...state.itemsContainerBox,
				...this.getItemsContainerBox()
			}
		}));
	}

	renderItemsContainer = () => {
		return (
			<div 
				className="mui-items-container"
				ref={ itemsContainer => { this.itemsContainerElement = itemsContainer } }
				style={this.state.itemsContainerBox} >
				<ul className="mui-items-list">
					{
						this.props.items.map((item, index) => {
							return (
								<li 
									key={index} 
									className="mui-list-item"
									onClick={() => { this.props.onChange(item) }}> {item} </li>
							)
						})
					}
				</ul>
			</div>
		);
	}

	render() {

		const { style, value, valueComponent : ValueComponent } = this.props;
		const { opened } = this.state;

		return (
			<React.Fragment>
				<div 
					className="mui-select-root" 
					ref={ root => { this.rootElement = root; } } >
					<div 
						className="mui-select-value"
						onClick={this.openItemsContainer}>
						<ValueComponent value={value} />
					</div>
					<button 
						className="mui-select-button"
						onClick={this.openItemsContainer}>
					</button>
				</div>
				{ opened && this.renderItemsContainer() }
			</React.Fragment>
		);
	}
}

export default Select;