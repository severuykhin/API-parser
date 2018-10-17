import DataProvider from './DataProvider';

export default function makeExport(features) {
	const provider = new DataProvider();
	let data = [];


	features.forEach((item, i) => {

		const meta =  item.properties.CompanyMetaData;
		const org = {};

		org.name    = meta.name;
		org.address = meta.address;
		org.url     = meta.url ? meta.url : 'Сайта нет';
		org.phone1 = '';
		org.phone2 = '';
		org.phone3 = '';
		org.phone4 = '';

		org.links1 = ''; 
		org.links2 = ''; 
		org.links3 = ''; 
		org.links4 = ''; 
		org.links5 = ''; 

		if (meta.Phones) {
			meta.Phones.forEach((item, index) => {
				if (index > 3) return;
				org[`phone${index + 1}`] = item.formatted
			});
		}

		if (meta.Links) {
			meta.Links.forEach((item, index) => {
				if (index > 4) return;
				org[`links${index + 1}`] = item.href
			});
		}
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