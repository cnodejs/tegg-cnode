## tegg-cnode

[![Docker CI](https://github.com/cnodejs/tegg-cnode/actions/workflows/docker.yml/badge.svg)](https://github.com/cnodejs/tegg-cnode/actions/workflows/docker.yml)
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

- [Docker.md](docs/Docker.md)
- [Developement.md](docs/Developement.md)

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Docker

```bash
$ docker pull ghcr.io/cnodejs/tegg-cnode:master
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- Use `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 16.x
- Typescript 4.x+


## The OpenAPI Specification (OAS)

- [Swagger API](https://beta.cnodejs.org/api)
- [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification)


## License

[MIT](LICENSE)


## Contributors

[![contributors](https://ergatejs.implements.io/badges/contributors/cnodejs/tegg-cnode.svg)](https://github.com/cnodejs/tegg-cnode/graphs/contributors)
