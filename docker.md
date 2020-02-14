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
  - （※-dオプションでバックグランドで起動）
- docker-compose up	
- docker-compose exec
- docker-compose logs	
- docker-compose stop	
- docker-compose rm	
  - docker-compose.ymlにかかれているコンテナを削除
- docker-compose down
  - コンテナを停止＆削除

## Dockerを使うとどんないいことがあるの？



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
  - VMを作る
- Vagrant
  - VirtualBoxの設定を自動化してくれるツール
- VMWare
  - VirtualBoxみたいなもん
  - VirtualBoxが主流なので、あまり見ない気がする
