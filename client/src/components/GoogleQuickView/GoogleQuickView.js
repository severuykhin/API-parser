import React from 'react';

const GoogleQuickView = (props) => {

	let className = props.isOpened ? 'google-quick-view google-quick-view-opened' : 'google-quick-view';

	if (!props.data) return <div className="google-quick-view"></div>;

	const data = props.data.result;

	if (!data) { return null; }

	return (
		<div className={className}>
			<a 
				className="delete is-large"
				onClick={props.closeQuickView}
				></a>

			<div className="card">
				<div className="card-image">
					<figure className="image is-4by3">
					<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Some"/>
					</figure>
				</div>
				<div className="card-content">
					<div className="media">
						<div className="media-content">
							<p className="title is-4">{ data.name }</p>
							<p className="subtitle is-6">
								<a href={`tel:${data.international_phone_number}`}>{ data.international_phone_number }</a>
							</p>
							<p className="subtitle is-6">
								{ data.website ? <a href={data.website}>{ data.website }</a> : null }							
							</p>
							<p className="subtitle is-6">
								<time dateTime="2016-1-1">{ data.vicinity }</time>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GoogleQuickView;