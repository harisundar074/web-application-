FROM node:22-bookworm-slim AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_DEMO_IFRAME_URL=
RUN set -eu; \
    for module in \
        Ch1-Introduction-to-Alphabot \
        Ch2-IO-Interfacing-and-Masking \
        Ch3-Motion-Control-and-Motor-Interfacing \
        Ch4-Pulse-Width-Modulation \
        Ch5-Ultrasonic-Sensor \
        Ch6-Analog-to-Digital-Converter \
        Ch7-Line-Following-Bot; do \
        ./node_modules/.bin/slidev build "$module/slides.md" \
            --base "/$module/" --out "../dist/$module"; \
    done

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY --from=build /app/index.html /usr/share/nginx/html/index.html

EXPOSE 80
