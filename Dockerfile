FROM node:lts-alpine AS app

ENV TIME_ZONE=Asia/Shanghai

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN \
  apk add --no-cache tzdata \
  && echo "${TIME_ZONE}" > /etc/timezone \ 
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime \
  && npm install \
  && npm run build \
  && npm prune --production

EXPOSE 7001

CMD npm run start
