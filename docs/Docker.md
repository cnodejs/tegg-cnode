# Docker

## Requirements

- docker
- docker-compose

## Config

**Compose**

- docker-compose.dev.yml
- docker-compose.yml

**Modify Github Id/Secret**

```yml
version: '3'
services: 
  cnode:
    environment:
      - EGG_PASSPORT_GITHUB_CLIENT_ID=test
      - EGG_PASSPORT_GITHUB_CLIENT_SECRET=test
```

**Modify Alinode AppId/Secret**

```yml
version: '3'
services: 
  cnode:
    environment:
      - EGG_ALINODE_APPID=appid
      - EGG_ALINODE_SECRET=secret
```

> to disable alinode, modify config/plugin.prod.js

**Change Port**

```yml
version: '3'
services: 
  cnode:
    ports:
      - ${PORT}:7001
```

## Develop

Setup redis / mongodb / egg-cnode

```bash
# start
docker-compose -f docker-compose.dev.yml up

# stop
docker-compose -f docker-compose.dev.yml down

# remove volume/cache
docker-compose -f docker-compose.dev.yml down -v
```

**Develop**:

```bash
export EGG_REDIS_PASSWORD=cnode
export EGG_MONGODB_URL=mongodb://cnode:cnode@127.0.0.1:27017/cnode
export EGG_PASSPORT_GITHUB_CLIENT_ID=${id}
export EGG_PASSPORT_GITHUB_CLIENT_SECRET=${secret}

npm i
npm run dev
```

## Deploy

Modify docker-compose.yml

**Run / Stop**

```bash
# start
docker-compose up -d

# stop
docker-compose down

# remove volume/cache
docker-compose down -v
```