const fs = require('fs');
const axios = require('axios');


class CitiesParser {

	constructor(config) {
		this.inputFile  = config.inputFile;
		this.outputFile = config.outputFile;

		this.API_KEY = 'bd79323b-1a36-4c01-94ac-ebe0c862825f';
	}


	/**
	 * Parse cities from txt file to Java Script object
	 * @param { string } filePath
	 */
	_parseCitiesFromFile(filePath) {
		const content = fs.readFileSync(filePath, 'utf-8').split('\r\n');
		return content;
	}


	/**
	 * City name to search
	 * @param  { string } cityName
	 * @return { object } 
	 */
	makeQuery(cityName) {

		let query = `https://search-maps.yandex.ru/v1/?text=${encodeURIComponent(cityName)}&type=geo&lang=ru_RU&apikey=${this.API_KEY}`;

		axios.get(query)
			.then( data => {

				let resp = data.data;


				let geo = `${resp.features[0].geometry.coordinates[0]},${resp.features[0].geometry.coordinates[1]}`;

				let cityData = {
					name : resp.features[0].properties.name,
					geo,
				};

				this.parsed.cities.push(cityData);

				fs.writeFileSync(this.outputFile, JSON.stringify(this.parsed));

				console.log(`------ City Parser: city - ${cityName} - READY`);

			})
			.catch( e => {
				console.log(e);
			});
	}

	/**
	 * Makes Set data collection from array to avoid repeats
	 * @param {array} cities - Array of cities names 
	 */
	checkAndRemoveRepeats(cities) {
		let set = new Set(cities);
		console.log(`------- Clears ${cities.length} to ${set.size} data set`);
		return set;
	}

	run() {

		this.parsed = require(`./${this.outputFile}`);
		this.inputCities  = this._parseCitiesFromFile(`./${this.inputFile}`);
		this.inputCities = this.checkAndRemoveRepeats(this.inputCities);

		let counter = 1;
		
		this.inputCities.forEach( (item, i) => {

			let cityName = item.toLowerCase();

			let isParsed = this.parsed.cities.find( i => {
				return i.name.toLowerCase() === cityName;
			});

			if (isParsed) {
				console.log(`------ City Parser: city - ${cityName} - already parsed`);
				return;
			}
				

			let timeout = 4000 * counter;

			setTimeout(() => {
				this.makeQuery(cityName);
			}, timeout);

			counter++;
		});

	}

}

const parser = new CitiesParser({
	inputFile  : 'cities.txt',
	outputFile : 'client/src/cities.json' 
});

parser.run();