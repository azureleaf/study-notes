# Meet Docker

## ToC

- [Meet Docker](#meet-docker)
  - [ToC](#toc)
- [Commands](#commands)
  - [Process](#process)
  - [Info](#info)
  - [Container](#container)
  - [Docker Hub](#docker-hub)
  - [Network](#network)
  - [Docker Compose](#docker-compose)
- [Terminology](#terminology)
  - [Docker Compose](#docker-compose-1)
  - [Tag](#tag)
  - [Docker Network](#docker-network)
  - [MISC](#misc)
- [Docker におけるデータ共有](#docker-%e3%81%ab%e3%81%8a%e3%81%91%e3%82%8b%e3%83%87%e3%83%bc%e3%82%bf%e5%85%b1%e6%9c%89)
    - [Volume](#volume)
    - [Bind Mount](#bind-mount)
    - [tmpfs](#tmpfs)
- [Dockerfile](#dockerfile)
- [Run MySQL container](#run-mysql-container)

# Commands

## Process

- `systemctl start docker`
- `service start docker`
  - Same as `systemctl`
- `systemctl status docker`

## Info

- `docker –version`
- `docker info`
- `docker ps`
  - show RUNNING containers
- `docker ps -a`
  - show RUNNING & EXITED containers
- `docker inspect my-container`
- `docker images`

## Container

- **`docker pull ubuntu:xenial`**
- `docker create —name my-ubuntu-ontainer -it ubuntu /bin/bash`
- **`docker run -itd ubuntu`**
  - `docker pull ubuntu` + `docker create my-ubuntu-container` + `docker start my-ubuntu-container`
  - `-i` interactive. Get the standard input of the container
  - `-t` tty. Assign TTY (TeleTYpewriter)
  - `-d`
- `docker start fe6e270a1c9c`
  - Start with container ID
- `docker start my-ubuntu-container`
  - Start with container name
- `docker restart my-ubuntu-container`
- `docker stop my-ubuntu-container`
- `docker pause my-ubuntu-container`
- `docker unpause my-ubuntu-container`
- 2 ways to access to the running Container
  - `docker attach my-ubuntu-container`
  - `docker exec -it my-ubuntu-container bash`
  - `exit` inside the container: getting out of the container without terminating it
- `docker kill fe6e270a1c9c`
- `docker commit my-ubuntu-container my-ubuntu-image:mytag`
  - Create the image from the container
  - NOT RECOMMENDED, because image contents can't be recorded
  - You should create image from Dockerfile
- `docker rm my-ubuntu-container`
- `docker rm -f my-ubuntu-container`
- `docker rmi`
- `docker build -t docker-whale .`
  - Build image based on the Dockerfile
  - Do this at the directorey with Dockerfile
  - `docker-whale`: Name of the image to be created
  - `.`: Build Context
- `docker build —no-cache -t docker-whale`
  - May need this on re-building from the Dockerfile
- `docker run --name some-nginx -d -p 8080:80 nginx`
- `docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5.7`
- `docker run --name some-wordpress -e WORDPRESS_DB_PASSWORD=my-secret-pw --link some-mysql:mysql -d -p 8080:80 wordpress`

## Docker Hub

- `docker login`
- `docker push`
- `docker tag`

## Network

- `docker network ls`
- `docker network create apline-net`
- `docker network inspect alpine-net`
- `docker network connect alpine-net alpine4`
- `docker network disconnect alpine-net alpine4`

## Docker Compose


- docker-compose ps
  - List Containers
- docker-compose images
  - List images
- docker-compose build
  - Build Service Image
- docker-compose restart
- docker-compose run
  - （※-d オプションでバックグランドで起動）
- docker-compose up
- docker-compose exec
- docker-compose logs
- docker-compose stop
- docker-compose rm
  - docker-compose.yml にかかれているコンテナを削除
- docker-compose down
  - コンテナを停止＆削除

# Terminology

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

# Docker Compose 

- 複数のコマンドを
- 利点
  - dockerのコンテナをどのようにネットワークに接続するのか長々と設定コマンドを打たずに済む
- docker-compose.yml

## Docker Compose vs K8s

- どちらも複数のコンテナ間での通信を設定する
- Docker Composeは単一ホスト上での複数コンテナ
- K8sは複数ホスト上での複数コンテナ

## Docker Swarm vs Docker Compose

## Tag

- Tag is the version of a image
- `latest` or `1.14-perl` in `nginx:1.14-perl` `nginx:latest` are tags
- When you don't specify the tag, it will be set as `latest` by default

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

## MISC

- Hyper-V
- Virtual Machine
- Hypervisor
- VirtualBox
  - VM を作る
- Vagrant
  - VirtualBox の設定を自動化してくれるツール
- VMWare
  - VirtualBox みたいなもん
  - VirtualBox が主流なので、あまり見ない気がする

# Docker におけるデータ共有

- ホスト側とコンテナ内部とでデータを共有しないといけない場面は多々ある
- 実現する方法は３つある

### Volume

- `docker volume create

### Bind Mount

### tmpfs

# Dockerfile

# Run MySQL container

1. Create `docker-compose.yml`

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

1. `docker-compose up -d`
   - Start the container
1. `docker-compose ps`
   - Check if the container is up
1. `mysql -uroot -p -h 127.0.0.1 --port 13306`
   - Connect to MySQL container

# Kubernetes

## Terminology

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