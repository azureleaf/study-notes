# Meet Docker

## ToC

- [Meet Docker](#meet-docker)
  - [ToC](#toc)
  - [Commands: Process](#commands-process)
  - [Commands: info](#commands-info)
  - [Commands: MISC](#commands-misc)
  - [Commands: Docker Hub](#commands-docker-hub)
  - [Commands: docker-composer](#commands-docker-composer)
  - [Docker Process](#docker-process)
  - [Terminology](#terminology)
    - [★★★](#%e2%98%85%e2%98%85%e2%98%85)
    - [★](#%e2%98%85)
  - [Dockerfile](#dockerfile)
  - [Run MySQL container](#run-mysql-container)

## Commands: Process

- `sudo systemctl start docker`
- `sudo service start docker`
  - Same as `systemctl`

## Commands: info

- `docker –version`
- `docker info`
- `docker ps`
  - show RUNNING containers
- `docker ps -a`
  - show RUNNING & EXITED containers
- `docker inspect my-container`
- `docker images`


## Commands: MISC

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
- `docker attach my-ubuntu-container`
  - Access to the running container (A)
- `docker exec -it my-ubuntu-container bash`
  - Access to the running container (B)
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
- `docker run --name some-nginx -d -p 8080:80 nginx`
- `docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:5.7`
- `docker run --name some-wordpress -e WORDPRESS_DB_PASSWORD=my-secret-pw --link some-mysql:mysql -d -p 8080:80 wordpress`

## Commands: Docker Hub

- `docker login`
- `docker push`
- `docker tag`

## Commands: docker-composer

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

## Docker Process

- `systemctl start docker`
- `systemctl status docker`

## Data Persistence

3 Methods

- 

## Terminology

### ★★★

- Kubernetes (k8s)
- Docker Swarm
- Dockerfile
- docker-compose.yml
- Image
  - Snapshot of the Docker VM at the specific time point
  - You can't modify image
- Container
  - Instance of Image
- Dockerhub
  - Place to share images
- Tag
  - Version of the image
  - `latest` or `1.14-perl` in `nginx:1.14-perl` `nginx:latest` are tags
  - When you don't specify the tag, it will be set as `latest` by default
- Docker Engine

### ★

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

## Dockerfile

## Run MySQL container

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
