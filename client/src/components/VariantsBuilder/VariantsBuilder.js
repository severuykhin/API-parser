import React from 'react';

const VariantsBuilder = (props) => {

	let icon = props.icon || 'fas fa-sort-amount-down';

	const prompt = props.prompt ? <option value="">Не выбрано</option> : null;

	return (
		<div className="control has-icons has-icons-left">
			<div className="select">
				<select 
					className="select" 
					name={props.name} 
					id={props.id}
					onChange={props.handler}
				>
					{ prompt }
					{ props.variants.map( (item, i) => {
						if (typeof item === 'object') {

							return (
								<option
									key={`variants-${props.name}-${i}`}  
									value={ item.value }>

									{item.name} 
								</option>
							);

						} else if (typeof item === 'number') {

							return <option 
										key={`variants-${props.name}-${i}`} 
										value={ item }> 
										
										{ item }

									</option>
						}
						return null;
					}) }
				</select>
			</div>
			<span className="icon is-small is-left">
				<i className={icon}></i>
			</span>
		</div>
	);
};

export default VariantsBuilder;