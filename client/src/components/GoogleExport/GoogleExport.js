import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const GoogleExport = (props) => {

	const renderItem = (itemData, i) => {

		const data = itemData.result;

		return <CSSTransition
					classNames="google-export-listitem"
					key={`google-export-item-${i}`}
					timeout={{ enter : 100, exit : 100 }}>
					<li 
						className="google-export-listitem"><span>{ data.name }</span> 
						<button 
							className="delete is-small"
							value={data.place_id}
							onClick={props.removeItem}
							></button> 
					</li>
				</CSSTransition>
	}

	return (
		<div className="google-export">
			<h6 className="title is-6" 
				style={{ opacity : props.data.length > 0 ? 1 : 0 }}>
				Выгрузить
			</h6>
			
			<TransitionGroup 
				className="google-export-items"
				component="ul">

				<CSSTransition
					classNames="google-export-listitem"
					key={`google-export-item-button`}
					timeout={{ enter : 100, exit : 100 }}>

					<button 
						className="button is-primary" 
						style={{ opacity : props.data.length > 0 ? 1 : 0 }}
						onClick={props.saveExport}>
						<span className="icon is-small">
						<i className="far fa-save"></i>
						</span>
					</button>

				</CSSTransition>
				
				{ props.data ? props.data.map(renderItem) : null }
			
			</TransitionGroup>
		</div>
	);
};

export default GoogleExport;