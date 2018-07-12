
class QueryBuilder {


	/**
	 * Builds GET query via url and given params
	 * @param {string} url 
	 * @param {object} params - Params to be paste in url 
	 */
	makeGet(url, params) {
		let query = url + '?';

		for (let item in params) {
			query += `${item}=${params[item]}&`
		}

		return query;
	}

}

export default QueryBuilder;