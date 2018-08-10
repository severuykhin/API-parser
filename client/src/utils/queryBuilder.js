
class QueryBuilder {


	/**
	 * Builds GET query via url and given params
	 * @param {string} url 
	 * @param {object} params - Params to be paste in url 
	 */
	makeGet(url, params) {
		let query = url + '?';

		for (let item in params) {
			
			if (Array.isArray(params[item])) {
				query += `${this._makeArrayParams(item, params[item])}&`; 
			} else {
				query += `${item}=${params[item]}&`;
			}
		}

		return query;
	}

	/**
	 * Makes array of params with given name in format "name[]=value1&name[]=value1"
	 * @param {string} name 
	 * @param {array} values 
	 * @returns {string}
	 */
	_makeArrayParams(name, values) {
		let res = '';

		values.forEach((item, index) => {
			res += `${name}[]=${item}`;
			if (index !== values.length - 1) {
				res += '&';
			}
		});

		return res;
	}

}

export default QueryBuilder;