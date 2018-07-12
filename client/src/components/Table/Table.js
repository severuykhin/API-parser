import React from 'react';

const Table = (props) => {

	const generateRows = features => {
		return features ?  features.map( (item, k) => {
				const meta = item.properties.CompanyMetaData;
			return (
				<tr key={`res-${k}`}>
					<td>{ k }</td>
					<td className="td-l">{ meta.name}</td>

					<td className="font-size-m td-m">
						{ meta.Phones ? meta.Phones.map( (item, i) => {
							return <p key={`phone-${i}`}>{ item.formatted }</p>
						}) : null }
					</td>

					<td className="font-size-xs font-grey">{ meta.address}</td>

					<td className="td-m">{ meta.url ? 
						<a href={ meta.url }>{ meta.url }</a> 
						: <div className="alert alert-success">Сайта нет :)</div> }</td>

					<td className="td-m">{ meta.Links ? meta.Links.map( (item, i) => {
						return <p key={`link-${k}-${i}`}>
							<a href={ item.href }>{ item.href }</a>
						</p>
					}) : <div className="alert alert-success">Не используют сервисы :)</div> }</td>

					<td className="font-size-xs font-grey">{ meta.Hours ? meta.Hours.text : null }</td>
				</tr>
			);
		}) : null;
	}

	const generateResults = data => {
		return (
			data ? 

			<table className="table table-striped">
				<thead className="">
					<tr>
						<th>№</th>					
						<th>Название</th>
						<th>Телефоны</th>
						<th>Адрес</th>
						<th>Сайт</th>
						<th>Сервисы</th>
						<th>Режим</th>
					</tr>
				</thead>
				<tbody>
					{ generateRows(data) }
				</tbody>
			</table>

			: 

			"Ничего не найдено"
		);
	}

	return (
		<div className="table-inner">
			{ generateResults(props.data) }
		</div>
	);
};

export default Table;