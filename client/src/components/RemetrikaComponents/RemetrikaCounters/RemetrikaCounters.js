import React from 'react';

const RemetrikaCounters = (props) => {

	if (!props.data) return <div className="stub is-loading"></div>;

	const data = props.data;

	const storeData = {
		visits : 0,
		views  : 0,
		unics  : 0,
	};

	data.reduce((reducedData, item) => {

		reducedData.visits += item.metrics[0];
		reducedData.views  += item.metrics[1];
		reducedData.unics  += item.metrics[2];
		return reducedData;

	}, storeData);

	for(let i in storeData) {
		storeData[`${i}_reduce`] = Math.floor(storeData[i] / data.length);
	}

	return (
		<div className={props.busy ? 'remetrika-counters is-loading' : 'remetrika-counters'}>
			<div className="tile is-ancestor">
				<div className="tile is-parent">
					<article className="tile is-child box">
						<p className="title">{ storeData.visits_reduce }</p>
						<p className="subtitle">Среднее количество визитов в сутки</p>
					</article>
				</div>
				<div className="tile is-parent">
					<article className="tile is-child box">
						<p className="title">{ storeData.views_reduce }</p>
						<p className="subtitle">Среднее количество просмотров в сутки</p>
					</article>
				</div>
				<div className="tile is-parent">
					<article className="tile is-child box">
						<p className="title">{ storeData.unics_reduce }</p>
						<p className="subtitle">Среднее количество уников в сутки</p>
					</article>
				</div>
			</div>
			<div className="tile is-ancestor">
				<div className="tile is-parent">
					<article className="tile is-child box">
						<p className="title">{ storeData.visits }</p>
						<p className="subtitle">Всего визитов</p>
					</article>
				</div>
				<div className="tile is-parent">
					<article className="tile is-child box">
						<p className="title">{ storeData.views }</p>
						<p className="subtitle">Всего просмотров</p>
					</article>
				</div>
				<div className="tile is-parent">
					<article className="tile is-child box">
						<p className="title">{ storeData.unics }</p>
						<p className="subtitle">Всего уникальных посетителей</p>
					</article>
				</div>
			</div>
		</div>
	);
};

export default RemetrikaCounters;