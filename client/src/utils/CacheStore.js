class CacheStore {

	constructor() {
		this.store = {};
	}

	/**
	 * Sets new value
	 * @param {string} hash - Hash string or unique id 
	 * @param {misc} item - Anu available data sctructure
	 */
	add(hash, item) {
		if (!this.store[hash]) {
			this.store[hash] = item;
		}
	}

	/**
	 * Gets value by hashname
	 * @param {string} hash - Hash string or unique id 
	 */
	get(hash) {
		return this.store[hash];
	}

}

export default CacheStore;