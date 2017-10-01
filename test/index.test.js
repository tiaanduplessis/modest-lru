import ModestLRU from '../src'

test('should be defined', () => {
  expect(ModestLRU).toBeDefined()
})

test('should provide max size', () => {
  expect(() => {new ModestLRU()}).toThrow()
})

test('shoud set values', () => {
  const lru = new ModestLRU(2)

  lru.set('foo', 'bar')
  lru.set('bar', 'baz')
  lru.set('baz', 'foo')

  expect(lru.size).toBe(1)
  
})