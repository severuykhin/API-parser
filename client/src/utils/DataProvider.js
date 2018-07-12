
/**
 * Represents Data Provider class
 */
class DataProvider {


	/**
	 * Makes GET query on given URL
	 * @param {string} url - Query URL
	 * @returns {object} - Promise 
	 */
	get(url) {
		return new Promise((resolve, reject) => {

			const xhr = new XMLHttpRequest();

			xhr.open('GET', url, true);

			xhr.onload = function () {
				if(this.status === 200) {

					let data = this.responseText;

					try {
						data = JSON.parse(data);
					} catch(e) {
						throw e;
					} 

					resolve(data);
				} else {
					reject();
					throw new Error('Error while getting data');
				}
			}

			xhr.send(null);

		});
	}

	post(url, requestData) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xhr.onload = function () {
				if(this.status === 200) {

					let data = this.responseText;

					try {
						data = JSON.parse(data);
					} catch(e) {
						throw e;
					} 

					resolve(data);
				} else {
					reject();
					throw new Error('Error while exporting data');
				}
			}

			let body = `data=${encodeURIComponent(requestData)}`;

			xhr.send(body);
		});
	}

}

export default DataProvider;