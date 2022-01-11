## tegg-cnode

[![Node.js CI](https://github.com/cnodejs/tegg-cnode/actions/workflows/nodejs.yml/badge.svg)](https://github.com/cnodejs/tegg-cnode/actions/workflows/nodejs.yml)
[![codecov](https://codecov.io/gh/cnodejs/tegg-cnode/branch/master/graph/badge.svg)](https://codecov.io/gh/cnodejs/tegg-cnode)

> CNodejs.org Powered By Tegg.

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- Use `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 16.x
- Typescript 4.x+

## How to contribute

- [API.md](docs/API.md)
- [Docker.md](docs/Docker.md)
- [Developement.md](docs/Developement.md)

## License

[MIT](LICENSE)
