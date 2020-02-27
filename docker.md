# Meet Docker

## commands (docker)

- docker –version
- docker pull ubuntu
- docker run -it- d ubuntu
- docker ps
  - show RUNNING containers
- docker ps -a
  - show RUNNING & EXITED containers
- docker exec -it fe6e270a1c9c bash
  - Access to the running container
- docker stop fe6e270a1c9c
- docker kill fe6e270a1c9c
- docker commit
- docker login
- docker push
- docker images
- docker rm
- docker rmi
- docker build

## commands (docker-composer)

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

## Docker を使うとどんないいことがあるの？

## 用語集

### 超重要

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

### 周辺知識

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
