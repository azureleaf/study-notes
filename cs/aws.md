
# AWS

---

# ToC

- [AWS](#aws)
- [ToC](#toc)
- [Products](#products)
  - [Region & AZ](#region--az)
  - [Create Instance](#create-instance)
  - [Products 1: Compute](#products-1-compute)
  - [AWS: EC2 vs Lightsail](#aws-ec2-vs-lightsail)
  - [Compute: Why use Elastic Beanstalk?](#compute-why-use-elastic-beanstalk)
  - [Compute: Notes on Elastic Beanstalk](#compute-notes-on-elastic-beanstalk)
  - [Products 2: Containers](#products-2-containers)
  - [AWS: Why use Fargate?](#aws-why-use-fargate)
  - [Products 3: Storage](#products-3-storage)
  - [S3 vs EFS vs EBS](#s3-vs-efs-vs-ebs)
    - [EFS](#efs)
    - [EBS](#ebs)
    - [S3](#s3)
  - [Products 4: Database](#products-4-database)
  - [ElastiCache](#elasticache)
    - [Engine](#engine)
    - [Purpose](#purpose)
  - [Products 5: Security, Identity & Compliance](#products-5-security-identity--compliance)
  - [Products 6: Cryptography & PKI](#products-6-cryptography--pki)
  - [Products 7: Machine Learning](#products-7-machine-learning)
  - [Products 8: Management & Governance](#products-8-management--governance)
  - [Why need ELB?](#why-need-elb)
  - [Types of ELB](#types-of-elb)
  - [Products 9: Developer Tools](#products-9-developer-tools)
  - [Products 10: Migration & Transfer](#products-10-migration--transfer)
  - [Products 11: Networking & Contents Delivery](#products-11-networking--contents-delivery)
  - [Products 12: Media Services](#products-12-media-services)
- [VPC](#vpc)
  - [AWS VPC: Features](#aws-vpc-features)
  - [AWS VPC: Keywords](#aws-vpc-keywords)
  - [AWS VPC Gateways](#aws-vpc-gateways)
  - [VPC: Route table is associated with...](#vpc-route-table-is-associated-with)
  - [VPC: Route Table](#vpc-route-table)
  - [VPC: Route Table Configs](#vpc-route-table-configs)
  - [AWS Products: MISC](#aws-products-misc)
  - [AWS: Account](#aws-account)
- [EC2](#ec2)
  - [Set up EC2: 1/2 Set up the key pair](#set-up-ec2-12-set-up-the-key-pair)
    - [Ref](#ref)
  - [Set up EC2: 2/2 Create the instance](#set-up-ec2-22-create-the-instance)
  - [EC2: Amazon Linux](#ec2-amazon-linux)
    - [Types](#types)
  - [EC2: AMI](#ec2-ami)
    - [Create](#create)
  - [EC2 Instance Types: Category](#ec2-instance-types-category)
  - [EC2: Instance Types](#ec2-instance-types)
  - [EC2: Connect to instance](#ec2-connect-to-instance)
  - [AWS VPC: Config Example 1](#aws-vpc-config-example-1)
  - [AWS VPC: Config Example 2](#aws-vpc-config-example-2)
- [Deploy Laravel to AWS](#deploy-laravel-to-aws)
  - [Use Elastic Beanstalk?](#use-elastic-beanstalk)
  - [Procedure w/ Elastic Beanstalk](#procedure-w-elastic-beanstalk)
    - [Ref](#ref-1)
  - [Procedure w/o Elastic Beanstalk](#procedure-wo-elastic-beanstalk)
  - [AWS + Laravel: References](#aws--laravel-references)
  - [AWS + Laravel: Overview](#aws--laravel-overview)
  - [MISC](#misc)
    - [What's phpMyAdmin?](#whats-phpmyadmin)
  - [Step 1/4 Set up the EC2 instance](#step-14-set-up-the-ec2-instance)
  - [Step 2/4 Set up the LAMP](#step-24-set-up-the-lamp)
  - [Step 3/4 Set up the RDS](#step-34-set-up-the-rds)
  - [Step 4/4 Ste up the Laravel App](#step-44-ste-up-the-laravel-app)
  - [masataka: Laravel + AWS Setup Procedure Overview](#masataka-laravel--aws-setup-procedure-overview)
  - [Installations of LAMP](#installations-of-lamp)
  - [masataka: configure file permissions on AWS](#masataka-configure-file-permissions-on-aws)
  - [atto: Laravel + AWS](#atto-laravel--aws)
  - [nakm: Laravel + AWS](#nakm-laravel--aws)
  - [Set up PHP](#set-up-php)
  - [Set up Apache](#set-up-apache)
  - [Set up Postgres](#set-up-postgres)
  - [Naka: Set up example](#naka-set-up-example)
    - [Ref](#ref-2)
    - [Set up procedure](#set-up-procedure)
  - [Naka: Overview](#naka-overview)
  - [Naka: Access Flow](#naka-access-flow)
    - [Redundant web server to the identical MySQL / Redis](#redundant-web-server-to-the-identical-mysql--redis)
    - [Re](#re)
  - [Naka: Subnets vs Subnet Group](#naka-subnets-vs-subnet-group)
  - [Naka: この構成でRedisはなんの役割をしているか？](#naka-この構成でredisはなんの役割をしているか)
  - [Naka: この構成でSecurityはどのように機能しているか？](#naka-この構成でsecurityはどのように機能しているか)
  - [Naka: この構成でもしWebサーバが落ちたらどうなるか？](#naka-この構成でもしwebサーバが落ちたらどうなるか)
  - [Naka: Security Group](#naka-security-group)
    - [w/o LB](#wo-lb)
    - [w/ LB](#w-lb)
- [RDS](#rds)
  - [RDS](#rds-1)
- [Cloudfront](#cloudfront)
  - [w/o CloudFront](#wo-cloudfront)
  - [w/ CloudFront (then)](#w-cloudfront-then)
  - [w/ CloudFront (modern)](#w-cloudfront-modern)
  - [System Config Example](#system-config-example)

---

# Products

>>>

## Region & AZ

- Region:
  - __ap-northeast-1__ is for Tokyo
- AZ: Availability Zone
  - A region has multiple AZ, that is, data centers
  - A service can ber deployed to multiple AZs for redundancy
  - Comm between multiple regions: High latency
  - COmm between AZs inside the same region: Low latency
- For high availability:
  - Multi-AZs with Active-Passive / Active-Active

>>>

## Create Instance

1. Choose AMI
2. Choose an instance type
3. Configure the instance details
4. Add tags
5. Set up Security group
6. Start

>>>

## Products 1: Compute

- **EC2**: Elastic Compute Cloud
- Lightsail
  - Servers + Storage + DB + Networking. Cheap
- **Lambda**
  - Run the code triggered by the events
- Elastic Beanstalk
  - PaaS for PHP, Node, Python, Docker... etc.
- CodeStar
  - CD (Continuous Delivery) tool: quick build & deployment

>>>

## AWS: EC2 vs Lightsail

Lightsail is a good option for small websites, test / dev env, WordPress blog

- Lightsail is cheaper
  - Lightsail has monthly fixed cost, while EC2 cost is calc by usage
- Lightsail is all-in-one while EC2 is computing only
  - Storage, snapshot, LB, firewall, DNS, networking
  - With server snapshot functionality, you can duplicate the server easily
  - LAMP / MEAN/ Node.js env is pre-configured
  - Easy to host the website (incl. WordPress)
- EC2 is more customizable
  - Lightsail is highly pre-configured, and it can't be changed
  - Lightsail service can't be linked to other AWS services with ease
  - Lightsail can't be scaled according to the requests

>>>

## Compute: Why use Elastic Beanstalk?

- Automatically configure the programming language-specific env
  - e.g. PHP, Laravel, etc.
- Automatically configure the necessary AWS services:
  - EC2 Instance
  - Auto Scaling Group
  - Load Balancer
  - CloudWatch

>>>

## Compute: Notes on Elastic Beanstalk

- EC2 instance which is related to EB can't be stopped, seemingly
- EB service can't be halted; it must be terminated not to consume AWS resources.

>>>

## Products 2: Containers

- ECS: Elastic Container Service
- EKS: Elastic Kubernetes Service
- Fargate
  - Compute Engine for ECS / EKS
- ECR: Elastic Container Registry
  - Store of the Docker images

>>>

## AWS: Why use Fargate?

1. Build the container image 
2. Deploy EC2 instances (Fargate does this instead of you!)
3. Define memory resources
4. Isolate apps with VMs (Fargate does this instead of you!)
5. Run app

>>>

## Products 3: Storage

- **S3**: Simple Store Service
  - Cheap
- **EBS**: Elastic Block Store
  - Virtual hard disks
- EFS: Elastic File System


>>>

## S3 vs EFS vs EBS

### EFS

- EFS is NFS (Network File System)
- OSからマウントできる。S3はHTTPS経由でアクセス
- EC2にマウントできる（EBSと同じ）
- **複数のAZにまたがる大量のEC2 Instance**から同時にアクセス可
- **expensive**

### EBS

- EBS is Block Storage
- Mountable to EC2 (Same as EFS)
- **single AZ, single EC2 instance**
  - A EC2 instance can mount multiple EBSs, tho

### S3

- Object Storage
- Multi-AZ
- **cheap**

>>>

## Products 4: Database

- **RDS**: Relational Database Service
- DynamoDB
- ElastiCache
- RedShift
- AWS Aurora: RDB compatible with MySQL / PostgreSQL

>>>

## ElastiCache

### Engine
- Redis
- Memcached

### Purpose

- Data which will be accessed frequently
- Data which won't be updated frequently
- **session**, **DB cache**, etc.

>>>

## Products 5: Security, Identity & Compliance

- IAM: Identy & Access Management

>>>

## Products 6: Cryptography & PKI

>>>

## Products 7: Machine Learning

- SageMaker

>>>

## Products 8: Management & Governance

- **ELB**: Elastic Load Balancing
  - Application LB
  - Network LB
  - Classic LB
- **Auto Scaling**
- **CloudFormation**
  - Describe the AWS system config in JSON; sort of IaC?
- Systems Manager
  - incl. Parameters Store
- **CloudWatch**
- CloudTrail
  - Monitor the AWS Account activity
- (DataDog)
  - DataDog is provided by DataDog corp, not by AWS
  - Offer the console for the AWS monitoring services

>>>

## Why need ELB?

- ELB distributes the load to multiple servers
  - Smaller load to each server, higher usability
- ELB puts the server into a maintenance mode without stopping the entire service
  - Fault tolerent
- ELB monitors the health of the servers
- ELB manages the security group
  - You can get SSL certificate
- ELB scales according to traffic amount

>>>

## Types of ELB

- Application Load Balancer
  - High-spec
  - Layer 7: distribute HTTP / HTTPS
  - Can deal with container / micro-services
- Network Load Balancer
  - Millions of requests per sec
  - Layer 4: distribute TCP / UDP / TLS traffics
- Classic Load Balancer
  - Layer 7 & Layer 4


>>>

## Products 9: Developer Tools

>>>

## Products 10: Migration & Transfer

>>>

## Products 11: Networking & Contents Delivery

- CloudFront
  - CDN service: Static / dynamic contents will be delivered from the nearest server to the user
  - high speed delivery with cache: streaming is possible
- App Mesh
- Amazon Route 53
  - DNS service

>>>

## Products 12: Media Services

---

# VPC

>>>

## AWS VPC: Features

- VPC: Virtual Private Cloud
  - selection of your own IP address range
  - creation of subnets
  - configuration of route tables and network gateways
- Major combination
  - EBS (for permanet storage)
  - EC2 (for server software)
  - VPC (for network)
- A VPC can have multiple AZs

>>>

## AWS VPC: Keywords

- Subnet
  - Public Subnet
  - Private Subnet
- Route table
  - Define possible connections among internet / subnets
- Router
- VPC Peering
- Endpoints for S3
- Elastic IP
  - Reachable IPv4 address from the internet
  - After you get the Elastic IP, you must assign it to your EC2 instance
- Security Group
  - Firewall for each instance

>>>

## AWS VPC Gateways

- Virtual Private Gateway
  - GW between the private network (such as on-premise server) & VPC
- IGW: Internet Gateway
  - GW between the internet & VPC
  - Without this, instances can't have the global IP
- NGW: NAT gateway: Network Address Translation
  - GW between the internet & private subnet
  - Enable instances in the private subnet connect to internet / other AWS services
  - Disable the internet establish the connection to the instances
- API Gateway
- AWS Direct Connect

>>>

## VPC: Route table is associated with...

Routing table can be associated with various entities.

1. Subnet Route Table
1. Gateway Route Table
2. Local Gateway Route Table

>>>

## VPC: Route Table 



>>>

## VPC: Route Table Configs

- Destination
- Target


>>>

## AWS Products: MISC

- AWS Athena
- Search S3 storage with queries
- AWS Glue
- Amazon SNS: Simple Notification Service
- Amazon SQS: Simple Query Service
- AWS Snowball

>>>

## AWS: Account

- IAM: Identity and Access Management
- Root Acount
- IAM User

---

# EC2

>>>

## Set up EC2: 1/2 Set up the key pair

1. Create the key pair on the AWS console for OpenSSH
   - https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair
   - You can't connect to EC2 without local private key
2. Download the private key
   - On Ubuntu, you should put the `.pem` file to `~/.ssh` dir
3. Change the file permission
   - `chmod 400 my-key-pair.pem`

### Ref

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html#create-a-base-security-group
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html

>>>

## Set up EC2: 2/2 Create the instance

1. Choose AMI
2. Choose instance type
3. Choose security group
   - In the inbound rules, allow access from `anywhere` with `HTTP` & `HTTPS`
4. Choose key pair
5. Launch
6. Connect with SSH
   - `ssh -i /path/my-key-pair.pem ec2-user@my-instance-IPv6-address`

>>>

## EC2: Amazon Linux

- Linux server OS of AWS
- Amazon Linux uses `yum` like Cent OS instead of `apt`

### Types

- Amazon Linux
- Amazon Linux 2
  - available as AMI

>>>

## EC2: AMI

- Amazon Machine Image provides the info required to launch an instance:
  - EBS snapshot(s)
  - Link to AWS account
  - Block device mapping which specifies the volumes to attach to the instance on launch

### Create

1. Create AMI
2. Register AMI
3. Launch AMI

>>>

## EC2 Instance Types: Category

- General Purpose: A, T, M
- Compute Optimized: C
- Memory Optimized: R, X, High Memory, z1d
- Accelerated Computing: P, Inf, G, F
- Storage Optimized: I, D, H

>>>

## EC2: Instance Types

- **t2.micro** is available for free tier
- Every instance can be Linux or Windows
- nano < micro < small < medium < large < xlarge < 2xlarge

>>>

## EC2: Connect to instance

- **SSH Client**
- EC2 Instance Connect
- AWS Systems Manager Session Manager
- PuTTY (Windows)

>>>

## AWS VPC: Config Example 1

- Internet -(IGW)- VPC > AZ (has Subnets)
  - IGW > Public Subnet > t2.micro Instance
  - IGW > Public Subnet > NGW > Private Subnet > DB

>>>

## AWS VPC: Config Example 2

- Internet - (ELB)
  - EC2 1 in AZ 1 -> RDS 1 -> RDS 2 (replicate of RDS 1)
  - EC2 2 in AZ 2 -> RDS 1 -> RDS 2 (replicate of RDS 1)

---

# Deploy Laravel to AWS

>>>

## Use Elastic Beanstalk?

- A. Use AWS Beanstalk
  - Beanstalk -> My Code
- B. Deploy the Laravel on the  EC2 directly
  - Install LAMP, Composer manually with SSH
  - Host Infra -> OS -> Application Server -> HTTP Server -> My Code

>>>

## Procedure w/ Elastic Beanstalk

1. Launch Elastic Beanstalk env
1. Bundle Laravel app into .zip
1. Upload & deploy .zip on EB console
1. Configure doc root path
1. Add DB Instance
1. Configure `/database.php`
1. Bundle & Deploy again

### Ref

- https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/php-laravel-tutorial.html
- https://dev.classmethod.jp/articles/elastic-beanstalk-laravel-deploy/

>>>

## Procedure w/o Elastic Beanstalk

1. Create EC2 instance
2. Connect to EC2 with SSH
3. Install Apache, PHP, Postgres with `yum`
4. Start Apache, then configure file privileges
    - `sudo service httpd`
5. Install Composer
6. Git clone the Laravel project, and install dependencies
7. Configure MySQL & `.env`
8. Run file seeding

>>>

## AWS + Laravel: References

- [AWS EC2 Doc: LAMP](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)
- [Qiita: LaravelをAWSのEC2へデプロイする手順](https://qiita.com/masataka715/items/6e46f1f5e53bdff6cd3d)
  - **This tutorial doesn't use RDS???**
- [Qiita: AWSのEC2を立ち上げてLaravelのログイン機能を動かすまで](https://qiita.com/atto/items/e1effd28c212c3829cb0)
- [Qiita: laravelをAWS EC2にデプロイする](https://qiita.com/nakm/items/0bcc6564538a0604b2ce)
- [Qiita: AWSでウェブアプリケーション環境構築](https://qiita.com/minato-naka/items/ddb5f5301f9f590cdcbf)
- https://varunver.wordpress.com/2016/06/03/centos-7-install-php-and-postgres/
  - install PHP, Postgres

>>>

## AWS + Laravel: Overview

1. Set up the EC2 Instance
   1. with Amazon Linux AMI (not Linux 2)
2. Set up LAMP: [AWS EC2 Doc: LAMP](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)
   1. `yum install` dependencies
   2. Allow TCP access to the instance on the EC2 console
   3. Create the new user group, and let it access to `\var\www`
   4. `mysql_secure_installation`
   5. Install `phpMyAdmin`
   6. Change Apache document root to `/var/www/html`
3. Set up the RDS
   1. Create the subnet in the same VPC with EC2
   2. Create the route table
   3. Create the security group
   4. Choose engine
4. Set up the Laravle App
   1. Laravel: Install composer, `git clone`
   2. Laravel: Key generation, set `.env`
   3. Laravel: Migration & Seeding

>>>

## MISC

### What's phpMyAdmin?

- Deal with MySQL DB
- Manipulation of the data with GUI
- Importing the data from CSV

>>>

## Step 1/4 Set up the EC2 instance

>>>

## Step 2/4 Set up the LAMP

>>>

## Step 3/4 Set up the RDS


>>>

## Step 4/4 Ste up the Laravel App

```sh



```

>>>

## masataka: Laravel + AWS Setup Procedure Overview

1. SSH connect to EC2
2. Install PHP, Apache, MySQL
3. Configure permission of Apache
4. Install Composer
5. git clone existing Laravel project from GitHub
6. Configure
   1. Apache: `http.conf`
   2. File permission for `var/www`
   3. `php artisan key:generate`
   4. Laravel: `.env`
   5. MySQL: Add user
7. Migration & seeding

## Installations of LAMP


## masataka: configure file permissions on AWS

1. Add the user `ec2-user` to `apache` user group
2. Let the `apache` group own the `var/www`
2. Let the `apache` group write to the `var/www`

>>>

## atto: Laravel + AWS


1. Create EC2 Instance
2. SSH connect
3. Intall LAMP & `phpmyadmin`
4. Set up Apache
   1. `httpd.conf`
   2. `custom.conf`
   3. `php.ini`
5. File permissions
   1. Create `www` group, and let the `ec2-user` belong to it
   2. Let the `www` group own the `var/www`
6. Install PHP, composer
7. Create Laravel proj
8. Configure `custom.conf`
   1. Change Apache root
   2. Activate `.htaccess`
9. 

>>>

## nakm: Laravel + AWS


1. Configure connection to RDS
   1. How?
2. SSH connect to EC2 instance
3. Install PHP
4. Install MySQL
5. Install Apache
6. Configure `.env`

>>>

## Set up PHP

- `sudo yum install php -y`


>>>

## Set up Apache

```sh
# install
sudo yum install -y httpd24

# start httpd
# http daemon runs in the backgroud of web server,
# and waits for incoming server requests
sudo service httpd start

# Add "apache" supplemental group to the user "ec2-user"
# -a "appends" anyone to a supplemental groups
# -G add supplemental groups
sudo usermod -a -G apache ec2-user

#
sudo chown -R ec2-user:apache /var/www

# 
sudo chmod 2775 /var/www

find /var/www -type d -exec sudo chmod 2775 {} \;

find /var/www -type f -exec sudo chmod 0664 {} \;
```

>>>

## Set up Postgres

- `sudo yum install postgresql-server postgresql-contrib`
- `sudo yum install php-pgsql`: Connector of PHP & Postgres

>>>

## Naka: Set up example

### Ref

- Qiita AWSでウェブアプリケーション環境構築 https://qiita.com/minato-naka/items/ddb5f5301f9f590cdcbf

### Set up procedure

1. EC2
   1. VPC, IGW
   3. Subnet, Route Table
   4. EC2 instance, Security Group (for EC2)
   5. Apache
2. RDS
   1. php, git, composer
   2. Configure Apache
   3. Private subnet & Subnet group
   4. Security Group (for DB)
   5. MySQL
   6. Laravel
3. LB
   1. Set up a redundant server 
   2. ALB
4. ElastiCache Redis
5. Jump Server

>>>

## Naka: Overview

- **IGW** (Entrance to VPC)
  - **ALB**
    - us-east-2a AZ 
      - Public Subnet (routing table A)
        - **Web Server Instance 1** (sec group: laravel-sg-web)
      - Private Subnet (routing table B)
        - **RDS MySQL Instance 1** (sec group: laravel-sg-rds)
        - **Redis ElastiCache**
    - us-east-2b AZ 
      - Public Subnet (routing table C)
        - **Web Server Instance 2** (sec group: laravel-sg-web)
      - Private Subnet (routing table D)
        - **RDS MySQL Instance 2** (sec group: laravel-sg-rds)

>>>

## Naka: Access Flow

### Redundant web server to the identical MySQL / Redis

- IGW -> ALB -> Web Server 1 -> MySQL 1 / Redis
- IGW -> ALB -> Web Server 2 -> MySQL 1 / Redis

### Re

>>>

## Naka: Subnets vs Subnet Group

- https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/SubnetGroups.html

>>>

## Naka: この構成でRedisはなんの役割をしているか？

>>>

## Naka: この構成でSecurityはどのように機能しているか？

>>>

## Naka: この構成でもしWebサーバが落ちたらどうなるか？

>>>

## Naka: Security Group

### w/o LB
 
`laravel-sg-web` allows:

- SSH access from **my IP**
- HTTP access from **my IP**

This configuration works, however by-passing the access with LB is more secure

### w/ LB

`laravel-sg-web` allows:

- HTTP access from **ALB security group**
  - As you can see here, to specify the acceptable access source, you can use security group instead of IP

>>>


---

# RDS

>>>

## RDS

- 

---

# Cloudfront

>>>

## w/o CloudFront

- Internet -> ELB -> EC2 -> RDS

>>>

## w/ CloudFront (then)

- Route 1: Internet -> ELB -> EC2 -> RDS
- Route 2: Internet -> CF -> S3

>>>

## w/ CloudFront (modern)

- `CF -> ELB (ALB) -> EC2 (Apache) -> RDS (MySQL)`
- For static contents: CF returns the contents from the cache
- For dynamic contents: CF do nothing, EC2 & RDS returns the contents

>>>

## System Config Example

- App
  - CloudFront -> S3 -> ALB -> Apache PHP Servers
- Storage
  - RDS MySQL
  - ElastiCache (Redis): セッション保存用
  - EFS (NFS: Network File Systemの一種)
- Management
  - CloudWatch
  - Lambda