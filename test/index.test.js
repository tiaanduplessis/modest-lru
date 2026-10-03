import ModestLRU from '../src'

test('should be defined', () => {
  expect(ModestLRU).toBeDefined()
})

test('should provide max size', () => {
  expect(() => { new ModestLRU() }).toThrow()
})

test('should set values', () => {
  const lru = new ModestLRU(2)

  lru.set('foo', 'bar')
  lru.set('bar', 'baz')
  lru.set('baz', 'foo')

  expect(lru.size).toBe(1)

})

describe('remove', () => {
  function expectRemoved (lru, key) {
    expect(lru.remove(key)).toBe(true)
    expect(lru.has(key)).toBe(false)
    expect(lru.get(key)).toBe(false)
    expect(lru.remove(key)).toBe(false)
  }

  function previousGeneration (key, value) {
    const lru = new ModestLRU(3)
    lru.set(key, value)
    lru.set('second', 2)
    lru.set('third', 3)
    return lru
  }

  test('removes an entry promoted by get from both generations', () => {
    const lru = previousGeneration('first', 1)
    expect(lru.get('first')).toBe(1)
    expect(lru.prevCache.has('first')).toBe(true)
    expect(lru.cache.has('first')).toBe(true)

    expectRemoved(lru, 'first')
    expect(lru.has('second')).toBe(true)
    expect(lru.has('third')).toBe(true)
  })

  test('removes both the old and updated value', () => {
    const lru = previousGeneration('first', 1)
    expect(lru.set('first', 4)).toBe(4)
    expect(lru.prevCache.get('first')).toBe(1)
    expect(lru.cache.get('first')).toBe(4)

    expectRemoved(lru, 'first')
  })

  test('removes an entry present only in the current generation', () => {
    const lru = new ModestLRU(3)
    lru.set('first', 1)
    expectRemoved(lru, 'first')
  })

  test('removes an entry present only in the previous generation', () => {
    const lru = previousGeneration('first', 1)
    expectRemoved(lru, 'first')
  })

  test('returns false for an absent entry without changing either generation', () => {
    const lru = previousGeneration('first', 1)
    lru.set('fourth', 4)
    expect(lru.remove('missing')).toBe(false)
    expect(lru.prevCache.size).toBe(3)
    expect(lru.cache.size).toBe(1)
    expect(lru.size).toBe(1)
  })

  test('preserves the rotation counter and does not resurrect removed entries', () => {
    const lru = previousGeneration('first', 1)
    lru.get('first')
    expectRemoved(lru, 'first')
    expect(lru.size).toBe(1)
    lru.set('fourth', 4)
    expect(lru.size).toBe(2)
    lru.set('fifth', 5)
    expect(lru.size).toBe(0)
    expect(lru.has('first')).toBe(false)
    expect(lru.has('second')).toBe(false)
    expect(lru.has('fourth')).toBe(true)
    expect(lru.has('fifth')).toBe(true)
    expect(lru.set('first', 6)).toBe(6)
    expect(lru.get('first')).toBe(6)
    expectRemoved(lru, 'first')
  })

  test('works before and after clear without changing its return value or counter', () => {
    const lru = previousGeneration('first', 1)
    lru.get('first')
    expectRemoved(lru, 'first')
    expect(lru.clear()).toBeUndefined()
    expect(lru.size).toBe(1)
    expect(lru.remove('first')).toBe(false)
    expect(lru.remove('second')).toBe(false)
    lru.set('first', 2)
    expectRemoved(lru, 'first')
  })

  ;[0, false, '', null, undefined, NaN].forEach((value, index) => {
    test(`removes a promoted falsy value (${index})`, () => {
      const lru = previousGeneration('first', value)
      expect(Object.is(lru.get('first'), value)).toBe(true)
      expectRemoved(lru, 'first')
    })
  })

  test('uses object identity for keys', () => {
    const key = {}
    const otherKey = {}
    const lru = previousGeneration(key, 1)
    lru.get(key)
    lru.set(otherKey, 2)
    expectRemoved(lru, key)
    expect(lru.get(otherKey)).toBe(2)
  })

  test('removes NaN keys using Map equality', () => {
    const lru = previousGeneration(NaN, 1)
    lru.get(NaN)
    expectRemoved(lru, NaN)
  })

  test('treats positive and negative zero as the same key', () => {
    const lru = previousGeneration(0, 1)
    lru.set(-0, 2)
    expectRemoved(lru, -0)
    expect(lru.has(0)).toBe(false)
  })

  ;[1, 2].forEach(max => {
    test(`removes promoted entries with capacity ${max}`, () => {
      const lru = new ModestLRU(max)
      lru.set('first', 1)
      if (max === 2) lru.set('second', 2)
      expect(lru.get('first')).toBe(1)
      expectRemoved(lru, 'first')
      lru.set('third', 3)
      expect(lru.has('first')).toBe(false)
      expect(lru.get('third')).toBe(3)
    })
  })
})
