FROM node:lts

WORKDIR /srv

COPY . .

ENTRYPOINT ["tail", "-f", "/dev/null"]