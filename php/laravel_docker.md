# Laravel + Docker

# ToC


# Outline

1. Write `docker-compose.yml`
   - PHP container
   - Nginx container
   - MySQL container
   - Docker network
2. Write `Dockerfile` for PHP container
   - Install Composer
3. Write config files
   - `local.ini` to config PHP
   - `default.conf` to config Nginx
   - `my.cnf` to config MySQL
4. Edit `.env`
5. Run containers with `docker-compose up`
6. Work inside the containers
   - Create tables in MySQL
   - Create Laravel project with composer

# Prerequisite

- `docker`
- `docker-compose`

# docker-compose.yml

```yml
version: '3'

services:
  php:
    container_name: php
    build: ./docker/php
    volumes:
    - ./server:/var/www

  nginx:
    image: nginx
    container_name: nginx
    ports:
    - 80:80
    volumes:
    - ./server:/var/www
    - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
    - php

  db:
    image: mysql:5.7
    container_name: db-host
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: database
      MYSQL_USER: docker
      MYSQL_PASSWORD: docker
      TZ: 'Asia/Tokyo'
    command: mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
    volumes:
    - ./docker/db/data:/var/lib/mysql
    - ./docker/db/my.cnf:/etc/mysql/conf.d/my.cnf
    - ./docker/db/sql:/docker-entrypoint-initdb.d
    ports:
    - 3306:3306
```

# Dockerfile

#

# .env