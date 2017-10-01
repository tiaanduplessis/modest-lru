class ModestLRU {
  constructor (max = 0) {
    if (!max || max < 1) {
      throw new Error('Max size of above 1 is required')
    }

    this.max = max
    this.size = 0
    this.cache = new Map()
    this.prevCache = new Map()
  }

  set (key, value) {
    this.cache.set(key, value)

    this.size++

    if (this.size >= this.max) {
      this.size = 0
      this.prevCache = this.cache
      this.cache = new Map()
    }

    return value
  }

  get (key) {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    if (this.prevCache.has(key)) {
      const value = this.prevCache.get(key)
      this.set(key, value)
      return value
    }

    return false
  }

  has (key) {
    return this.prevCache.has(key) || this.cache.has(key)
  }

  remove (key) {
    return this.prevCache.delete(key) || this.cache.delete(key)
  }

  clear () {
    this.prevCache.clear()
    this.cache.clear()
  }
}

export default ModestLRU
