FROM node:15-alpine AS build

ARG VERSION
RUN test -n "${VERSION}" || (echo "VERSION argument not provided" && false)

WORKDIR /app
COPY . ./
RUN npm version "${VERSION}" --no-git-tag-version
RUN npm install
RUN npm run ng build -- -c=production

FROM nginx:1.19-alpine
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm index.html
COPY --from=build /app/dist/joyreactor ./

CMD ["nginx", "-g", "daemon off;"]