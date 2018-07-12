import React from 'react';

const styles = {
	display   : 'flex',
	alignItem : 'cener',
	width     : '100%',
	height    : '100%'
};

const DefaultValueComponent = ({ value }) => {
	return (
		<div className="value" style={styles}>
			{ value }
		</div>
	);
};

export default DefaultValueComponent;