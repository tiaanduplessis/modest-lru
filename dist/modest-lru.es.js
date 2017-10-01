var ModestLRU = function ModestLRU (max) {
  if ( max === void 0 ) max = 0;

  if (!max || max < 1) {
    throw new Error('Max size of above 1 is required')
  }

  this.max = max;
  this.size = 0;
  this.cache = new Map();
  this.prevCache = new Map();
};

ModestLRU.prototype.set = function set (key, value) {
  this.cache.set(key, value);

  this.size++;

  if (this.size >= this.max) {
    this.size = 0;
    this.prevCache = this.cache;
    this.cache = new Map();
  }

  return value
};

ModestLRU.prototype.get = function get (key) {
  if (this.cache.has(key)) {
    return this.cache.get(key)
  }

  if (this.prevCache.has(key)) {
    var value = this.prevCache.get(key);
    this.set(key, value);
    return value
  }

  return false
};

ModestLRU.prototype.has = function has (key) {
  return this.prevCache.has(key) || this.cache.has(key)
};

ModestLRU.prototype.remove = function remove (key) {
  return this.prevCache.delete(key) || this.cache.delete(key)
};

ModestLRU.prototype.clear = function clear () {
  this.prevCache.clear();
  this.cache.clear();
};

export default ModestLRU;
