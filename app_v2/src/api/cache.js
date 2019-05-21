import cache from 'memory-cache'

class MemoryCache {
  set(hash, value) {
    try {
      value = JSON.stringify(value);
      cache.put(hash, value, 100000);
    } catch (e) { console.log(e);  }
  }

  get(hash) {
    return JSON.parse(cache.get(hash));
  }
}

export default new MemoryCache()
