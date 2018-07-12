import DataProvider from './DataProvider';

export default function makeGoogleExport(items) {
	const provider = new DataProvider();
	let data = [];

	items.forEach((item, i) => {

		const meta =  item.result;
		const org = {};

		org.name    = meta.name;
		org.phone   = meta.formatted_phone_number;
		org.address = meta.formatted_address;
		org.url     = meta.website ? meta.website : 'Сайта нет';

		data.push(org);

	});

	try {
		data = JSON.stringify(data);
	} catch(e) {
		throw new Error('Error while converting data');
	}

	provider.post('/api/export', data)
		.then( data => {
			window.location.assign(data.filePath);
		});
}