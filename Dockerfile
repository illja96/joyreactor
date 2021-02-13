FROM node:15-alpine AS build

ARG BUILD_NUMBER
RUN test -n "${BUILD_NUMBER}" || (echo "BUILD_NUMBER argument not provided" && false)

WORKDIR /app
COPY . ./
RUN npm version "${BUILD_NUMBER}" --no-git-tag-version
RUN npm install
RUN npm run ng build -- -c=production

FROM nginx:1.19-alpine
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm index.html
COPY --from=build /app/dist/joyreactor ./

CMD ["nginx", "-g", "daemon off;"]