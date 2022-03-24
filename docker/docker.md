# Docker

# ToC

- [Docker](#docker)
- [ToC](#toc)
- [Docker Basics (with Rails)](#docker-basics-with-rails)
  - [1. Dockerfile](#1-dockerfile)
    - [Parser directives](#parser-directives)
  - [2. docker-compose.yml](#2-docker-composeyml)
  - [3. entrypoint.sh](#3-entrypointsh)
  - [4. Gemfile](#4-gemfile)
  - [5. Gemfile.lock](#5-gemfilelock)
- [Docker Command](#docker-command)
- [Docker Compose Commands](#docker-compose-commands)
- [Topics](#topics)
  - [Docker Network](#docker-network)
  - [Sharing Data between host & containers](#sharing-data-between-host--containers)
  - [Kubernetes](#kubernetes)
  - [Docker vs Docker Compose](#docker-vs-docker-compose)
  - [Docker on the Cloud](#docker-on-the-cloud)

# Docker Basics (with Rails)

## 1. Dockerfile

Sample 1

```dockerfile
# syntax=docker/dockerfile:1
FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]
```

Sample 2

```dockerfile
FROM ruby:2.7.5
RUN apt-get update -qq &&\
    apt-get install -y build-essential nodejs\
    postgresql-client curl
    apt-transport-https wget
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn
RUN mkdir /app
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY . /app
```


Instruction Keywords:

```dockerfile
FROM

ENV

LABEL

RUN

# $cd equivalent
WORKDIR

# Can be a sequence of relative dir changes: /users/john/documents
WORKDIR /users
RUN touch .config
WORKDIR john
WORKDIR documents
RUN touch changelog.txt

# Can resolve ENV vars
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME

# COPY VS ADD:
# ADD can use remote URL & .tar extraction, while COPY can't.
# You should use COPY bacause ADD may increase imagesize.
# You can use $curl/wget/tar command with COPY
COPY
ADD

VOLUME

ENTRYPOINT

EXPOSE

# CMD appears only once in a Dockerfile
CMD
ARG

# DEPRECATED
MAINTAINER

USER
ONBUILD
STOPSIGNAL
HEALTHCHECK
SHELL
```

### Parser directives

Comment-like directives change behavior of the Dockerfile.

There're 2 directives: "syntax" and "escape".

A parser directive can appear only once for the type.

```dockerfile
# syntax=docker/dockerfile:1
# syntax=docker.io/docker/dockerfile:1
```

"escape" define which character is used as escape characters in the Dockerfile

```dockerfile
# escape=\
# escape=`
```

## 2. docker-compose.yml

Example 1:

```yml
version: "3"

services:
  db:
    image: mysql:5.7.27
    restart: always
    ports:
      - "13306:3306"
    volumes:
      - ./.data/db:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_USER: test
      MYSQL_PASSWORD: test
```

Example 2:

```yml
version: '3'
services:
  db: # container name
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: root
    ports:
      - "3306:3306"
    volumes:
      - ./tmp/db:/var/lib/mysql

  web: # container name
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
```

## 3. entrypoint.sh


```sh

#!/bin/bash

# Immediately exit if any command being run exits with a non-zero exit code
set -e

# Terminate the Rails process if existed
rm -f /myapp/tmp/pids/server.pid

# Run the CMD content in the Dockerfile
exec "$@"
```

## 4. Gemfile


## 5. Gemfile.lock


# Docker Command

```sh
docker build -t myimage:1.0 . # -t: tag, .: current dir

#
# Image
#
docker image ls
docker image rm alpine:3.4
docker tag # Tag is the version of a image. Tag will be `latest` by default when omitted

# Remote registry
docker pull alpine
docker pull myimage:1.0
docker pull ubuntu:xenial
docker tag myimage:1.0 myrepo/ myimage:2.0 # retag
docker push myrepo/myimage:2.0

docker container run --name web -p 5000:80 alpine:3.9

# "run" looks for local image first, if not found, pull it.
docker run hello-world
docker run alpine
docker run alpine ls -l # run "ls -l" after container creation
docker run alpine /bin/sh
docker run my_img # foreground (attached by default)
docker run my_img -d # detached
docker run -it alpine /bin/sh # -t: TTY
docker run -itd ubuntu # -i: interactive. This pull, create, start the container
docker run --name some-nginx -d -p 8080:80 nginx
docker run --name some-nginx -d -p 8080:80 nginx
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5.7
docker run --name some-wordpress -e WORDPRESS_DB_PASSWORD=my-secret-pw --link some-mysql:mysql -d -p 8080:80 wordpress

docker attach
docker attach my-ubuntu-container
docker exec -it my-ubuntu-container bash
exit # inside the container: getting out of the container without terminating it

docker stop web # SIGTERM
docker kill web # SIGKILL
docker kill fe6e270a1c9c
docker pause
docker unpause
docker start fe6e270a1c9c # with container ID
docker start my-ubuntu-container # with container name
docker restart
docker stop

docker network ls
docker network ls
docker network create apline-net
docker network inspect alpine-net
docker network connect alpine-net alpine4
docker network disconnect alpine-net alpine4


docker container ls # running
docker container ls --all # running && stopped

docker container rm -f $(docker ps -aq) # running && stopped

docker container logs --tail 100 web

docker ps # running
docker ps -a
docker ps -aq

docker app

docker builder
docker build .
docker build -f /path/to/a/Dockerfile .
docker build -t docker-whale . # Build image based on the Dockerfile. `docker-whale`: Name of the image to be created. `.`: Build Context
docker build —no-cache -t docker-whale
docker buildx
docker create
docker create —name my-ubuntu-ontainer -it ubuntu /bin/bash
docker rm # Remove container
docker rm -f my-ubuntu-container
docker rmi # Remove images

#
# INFO
#
docker images
docker diff
docker info
docker inspect
docker logs
docker stats
docker ps
docker ps -a # Running & Exited
docker version

#
# REMOTE
#
docker pull
docker push
docker login
docker logout

docker import
docker export


docker container

docker volume
docker volume create
⭐ docker volume ls


#
# MISC
#
docker checkpoint
docker commit
docker commit my-ubuntu-container my-ubuntu-image:mytag # Create the image from the container. NOT RECOMMENDED, create create image from Dockerfile instead.
docker compose
docker config
docker context
docker cp
docker events
docker history
docker engine
docker load
docker rename
docker save
docker search

docker tag
docker top
docker update
docker wait # Get exit code of the container when it stops
docker plugin
docker port
docker manifest
docker network
docker plugin
docker secret
docker service
docker stack
docker swarm
docker system
docker trust

#
# Bash
#
docker --version
docker -v
systemctl start docker
service start docker
systemctl status docker
```

# Docker Compose Commands

- 複数のコマンドを
- 利点
  - dockerのコンテナをどのようにネットワークに接続するのか長々と設定コマンドを打たずに済む
- docker-compose.yml

Docker Compose vs K8s

- どちらも複数のコンテナ間での通信を設定する
- Docker Composeは単一ホスト上での複数コンテナ
- K8sは複数ホスト上での複数コンテナ

Docker Swarm vs Docker Compose


```sh
docker-compose pull
docker-compose push

docker-compose port


docker-compose config

docker-compose build
docker-compose create
docker-compose start
docker-compose restart
docker-compose stop
docker-compose kill
docker-compose pause
docker-compose unpause
⭐ docker-compose up
docker-compose up
docker-compose up -d # --detach
docker-compose up --build
docker-compose up --scale # formerly: docker-compose scale
⭐ docker-compose down # Remove containers, networks
docker-compose down --rmi all # Remove images as well
docker-compose down --rmi local # Remove images as well
docker-compose down --v # Remove volumes as well
docker-compose rm # remove stopped containers

#
# STAT
#
docker-compose events
docker-compose ps
docker-compose top # running processes
docker-compose help
docker-compose images
docker-compose logs
docker-compose logs --follow

docker-compose exec # Allocate a TTY
docker-compose exec web bin/rails c
docker-compose exec web sh

docker-compose run
docker-compose run web rails webpacker:install
docker-compose run --rm web bin/rails db:setup
docker-compose run --rm web bundle exec rspec
docker-compose run --rm web bundle update
docker-compose run web rails new . --force --no-deps --database=mysql



```

# Topics

- Cluster
- Node
- Pod
- Label
- Replica Set
- Service
- Secret
- Namespace
- Annotation
- kubectl
- Deployment
- Hyper-V
- Virtual Machine
- Hypervisor
- VirtualBox
- VMWare:
- Vagrant: Automate configuration of VirtualBox
- External Port
- Internal Port
- Docker Client
- Docker daemon
- Docker の環境
  - Container > Docker Engine > Host OS > Hardware
- Kubernetes (k8s)
- Dockerfile
- Image
  - Snapshot of the Docker VM at the specific time point
  - You can't modify image
- To get images
  - Download from Docker Hub
  - Build from Dockerfile
  - Commit from the container: Not recommended, because `docker history` can't be used for such images
- Container
  - Instance of Image
- Dockerhub
  - Place to share images
- Docker Engine
- Docker Machine

## Docker Network

- 複数のコンテナ間で通信するためのネットワーク
- Bridge Network
  - Default
- Host Network
- Overlay Network
- Macvlan Network
- None Network
- User-defined Brdge Network
- Third-party Network Plugin


## Sharing Data between host & containers

- ホスト側とコンテナ内部とでデータを共有しないといけない場面は多々ある
- 実現する方法は３つある
  - Bind Mount
  - tmpfs

## Kubernetes

## Docker vs Docker Compose

## Docker on the Cloud

Kubernetes

- AWS ECS/EKS
- Azure AKS
- GCP Kubernetes Engine
- Alibaba Cloud: Container Service
