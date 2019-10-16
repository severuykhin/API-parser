import axios from 'axios'
import md5 from 'md5'
import cache from './cache'

const instance = axios.create({
  baseURL : '',
  headers : {}
});

const ENABLE_API_RESPONSE_CACHE = true;

class ApiClientConstructor {

  async request(url, params) {
    let response;
    if (ENABLE_API_RESPONSE_CACHE) {
      let urlHash = md5(url);
      let cachedValue = cache.get(urlHash)
      if (cachedValue) return cachedValue;
      else {
        response = await instance.get(url, params);
        cache.set(urlHash, response.data)
        return response.data;
      }
    }
    response = await instance.get(url, params);
    return response.data;

  }

  async getUsers () {
    const response = await this.request('http://react-ssr-api.herokuapp.com/users', {})
    return response
  }
}

export default new ApiClientConstructor()
