import DataProvider from './DataProvider';

export default function makeExport(features) {
	const provider = new DataProvider();
	let data = [];

	console.log('sdf');

	features.forEach((item, i) => {

		const meta =  item.properties.CompanyMetaData;
		const org = {};

		org.name    = meta.name;
		org.phones  = meta.Phones ? meta.Phones.map( i => {
			return i.formatted;
		}).join(', ') : '';
		org.address = meta.address;
		org.url     = meta.url ? meta.url : 'Сайта нет';
		org.links   = meta.Links ? meta.Links.map(i => {
			return i.href;
		}).join(', ') : 'Не используют сервисы';
		org.hours = meta.Hours ? meta.Hours.text : '';


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