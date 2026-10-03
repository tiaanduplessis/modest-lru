
<h1 align="center">modest-lru</h1>
<div align="center">
  <strong>Simple LRU cache that gets the job done</strong>
</div>
<br>
<div align="center">
  <a href="https://npmjs.org/package/modest-lru">
    <img src="https://img.shields.io/npm/v/modest-lru.svg?style=flat-square" alt="npm package version" />
  </a>
  <a href="https://npmjs.org/package/modest-lru">
  <img src="https://img.shields.io/npm/dm/modest-lru.svg?style=flat-square" alt="npm downloads" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="standard JS linter" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square" alt="prettier code formatting" />
  </a>
  <a href="https://travis-ci.org/tiaanduplessis/modest-lru">
    <img src="https://img.shields.io/travis/tiaanduplessis/modest-lru.svg?style=flat-square" alt="travis ci build status" />
  </a>
  <a href="https://github.com/tiaanduplessis/modest-lru/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/modest-lru.svg?style=flat-square" alt="project license" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="make a pull request" />
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/tiaanduplessis/modest-lru/watchers">
    <img src="https://img.shields.io/github/watchers/tiaanduplessis/modest-lru.svg?style=social" alt="Github Watch Badge" />
  </a>
  <a href="https://github.com/tiaanduplessis/modest-lru/stargazers">
    <img src="https://img.shields.io/github/stars/tiaanduplessis/modest-lru.svg?style=social" alt="Github Star Badge" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20modest-lru!%20https://github.com/tiaanduplessis/modest-lru%20%F0%9F%91%8D">
    <img src="https://img.shields.io/twitter/url/https/github.com/tiaanduplessis/modest-lru.svg?style=social" alt="Tweet" />
  </a>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="https://github.com/tiaanduplessis">tiaanduplessis</a> and <a href="https://github.com/tiaanduplessis/modest-lru/contributors">contributors</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#about">About</a></li>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## About

[![Greenkeeper badge](https://badges.greenkeeper.io/tiaanduplessis/modest-lru.svg)](https://greenkeeper.io/)

Simple little LRU cache that works in node & browser. Based on the [hashlru](https://github.com/dominictarr/hashlru) algorithm. Uses [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) under the hood.

## Install

```sh
$ npm install modest-lru
# OR
$ yarn add modest-lru
```

## Usage

```js
const ModestLRU = require('modest-lru')
const lru = new ModestLRU(50) // Max size of 50

const foo = 'foo'
const baz = function baz() {}

lru.set(foo, 5)
lru.set(baz, 60)
lru.get(foo) // 5
lru.get(baz) // 60
lru.has(baz) // true
lru.has(6) // false
lru.remove(baz) // Remove key baz from cache 
lru.clear() // Clear the cache
```

## Contributing

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [a issue](https://github.com/tiaanduplessis/modest-lru/issues).

## License

Licensed under the MIT License.
