# ネットワーク基礎の基礎

# ToC

- [ネットワーク基礎の基礎](#ネットワーク基礎の基礎)
- [ToC](#toc)
- [MISC](#misc)
- [通信プロトコルって何？](#通信プロトコルって何)
- [これを勉強するとなんの役に立つの？](#これを勉強するとなんの役に立つの)
- [TCP/IP Model vs OSI Model](#tcpip-model-vs-osi-model)
- [OSI Model](#osi-model)
- [TCP/IP Model](#tcpip-model)
- [4. Application Layer (TCP/IP)](#4-application-layer-tcpip)
  - [HTTP](#http)
  - [Method](#method)
  - [POST vs PUT](#post-vs-put)
  - [Structure of Request & Response](#structure-of-request--response)
  - [Important HTTP Status Code](#important-http-status-code)
  - [Port Number](#port-number)
  - [SMTP & POP3](#smtp--pop3)
  - [FTP](#ftp)
  - [Telnet & SSH](#telnet--ssh)
- [3. Transport Layer (TCP/IP)](#3-transport-layer-tcpip)
  - [TCP vs UDP](#tcp-vs-udp)
  - [TCP Header](#tcp-header)
  - [UDP Header](#udp-header)
  - [TCP のしくみ](#tcp-のしくみ)
- [2. Internet Layer (TCP/IP)](#2-internet-layer-tcpip)
  - [IP Address (IPv4)](#ip-address-ipv4)
  - [IPv4 Header](#ipv4-header)
  - [IP Address (IPv6)](#ip-address-ipv6)
  - [IPv6 Header](#ipv6-header)
  - [IPv4 vs IPv6](#ipv4-vs-ipv6)
  - [Private Address](#private-address)
  - [DNS: Domain Name System](#dns-domain-name-system)
- [1. Network Interface Layer (TCP/IP)](#1-network-interface-layer-tcpip)
  - [Keywords](#keywords)
  - [宛先の把握](#宛先の把握)
  - [Data Link の種類](#data-link-の種類)
  - [Ethernet](#ethernet)
  - [PPP](#ppp)
- [Topics](#topics)
- [QoS: Quality of Service](#qos-quality-of-service)
  - [DiffServ (Differentiated Services)](#diffserv-differentiated-services)
  - [IntServ (Integrated Services)](#intserv-integrated-services)
  - [Best Effort](#best-effort)
- [Queueing](#queueing)
- [Delay 遅延](#delay-遅延)
  - [Processing Delay プロセス遅延](#processing-delay-プロセス遅延)
  - [Queueing Delay 輻輳遅延](#queueing-delay-輻輳遅延)
  - [Serialization Delay 伝送遅延](#serialization-delay-伝送遅延)
  - [Propagation Delay 伝搬遅延](#propagation-delay-伝搬遅延)
  - [Network: MISC](#network-misc)
  - [Xaas](#xaas)
  - [XaaS Comparison](#xaas-comparison)
  - [Latency vs Bandwidth](#latency-vs-bandwidth)
- [IP Addresses](#ip-addresses)
  - [DNS](#dns)
  - [IPv4](#ipv4)
  - [IP Addressing: Classful vs Classless](#ip-addressing-classful-vs-classless)
  - [IPv4: Reserved IP Addresses](#ipv4-reserved-ip-addresses)
  - [IPv6:](#ipv6)
  - [TCP / IP Model](#tcp--ip-model)
  - [OSI Model](#osi-model-1)
  - [Tools](#tools)
  - [Network Devices](#network-devices)
  - [LAN Topology](#lan-topology)
  - [LAN Access Control Methods](#lan-access-control-methods)
  - [WLAN](#wlan)
  - [Network Cables](#network-cables)
  - [TCP / IP](#tcp--ip)
  - [Cache](#cache)
- [VPN](#vpn)
  - [What's VPN?](#whats-vpn)
    - [Types](#types)
  - [VPN vs Leased Line](#vpn-vs-leased-line)
  - [Internet VPN technologies](#internet-vpn-technologies)
  - [Protocols](#protocols)

# MISC

- WSGI: Web Server Gateway Interface
- CGI: Common Gateway Interface
- Java Servelet

# 通信プロトコルって何？

- 通信するときのデータの仕様の規約、お約束のこと
- 複数の段階に分け、それぞれの段階の出口と入口のデータ形式を決めておく
- これにより、様々なプロトコルを組み合わせることができる。

# これを勉強するとなんの役に立つの？

- HTTP 通信の背景がわかる
- ネットワーク機器の役割を理解しやすい。ネットワークエンジニアなら必須。
- 他のエンジニアと話しててもナメられない
- 実際、全てを理解する必要はなさそう。自分が開発で関与する部分の前後（フロントエンジニアなら HTTP, TCP, IP）だけ理解していればたぶん問題ない。

# TCP/IP Model vs OSI Model

|  #  |     OSI      |  #  |      TCP/IP       |
| :-: | :----------: | :-: | :---------------: |
|  7  | Application  |  4  |    Application    |
|  6  | Presentation |  4  |    Application    |
|  5  |   Session    |  4  |    Application    |
|  4  |  Transport   |  3  |     Transport     |
|  3  |   Network    |  2  |     Internet      |
|  2  |  Data Link   |  1  | Network Interface |
|  1  |   Physical   |  1  | Network Interface |

- 知識としては OSI モデルの７層を覚えないといけないが、実務上は４層の TCP/IP で考えることが多いように見受けられる

# OSI Model

|  #  |    Layer     |                         Role                          |
| :-: | :----------: | :---------------------------------------------------: |
|  7  | Application  |               アプリケーション毎の規定                |
|  6  | Presentation |              文字コードなどの表現の規定               |
|  5  |   Session    |     通信の確立、維持、終了までのセッションの規定      |
|  4  |  Transport   |      「セグメント」の転送の信頼性のための規定。       |
|  3  |   Network    |  「パケット」をネットワーク間で通信する方法の規定。   |
|  2  |  Data Link   | 「フレーム」を宛先 MAC アドレスなどに基づいて送る規定 |
|  1  |   Physical   |        「ビット」の列を電気信号に変換する規定         |

- 送信側の時は、OSI ７層目から出発して１層目に行く。受信側では、逆に１層目から７層目に向かってデータが加工されていく。
- ７層目に入る前の生データは「ペイロード」と呼ばれる。層を下るたびに L7 Header, L6 Header, L5 Header...のようにヘッダが追加されていく。
- ヘッダには Text base と Binary Base の２種類がある
- ヘッダには制御情報が含まれる。制御だけを目的として、本体なしでヘッダだけを送ることもある

# TCP/IP Model

| #   | TCP/IP Layer      | Protocol Examples          | PDU: Protocol Data Unit                                                                            | Device         |
| --- | ----------------- | -------------------------- | -------------------------------------------------------------------------------------------------- | -------------- |
| 4   | Application       | HTTP, FTP, SMTP, POP3, SSH | HTTP Header + Data                                                                                 |                |
| 3   | Transport         | TCP, UDP                   | Segment = <br>TCP Header <br> + HTTP Header <br> + Data                                            | Router         |
| 2   | Internet          | IP                         | Packet = <br>IP Header <br> + TCP Header <br> + HTTP Header <br> + Data                            | Swtich, Bridge |
| 1   | Network Interface | Ethernet, PPP, ARP         | Frame = <br>Ethernet Header <br> + IP Header <br> + TCP Header <br> + Data <br> + Ethernet Trailer | Hub, Cable     |

- 一番大切なのが TCP と IP なので、この名前になった
- Network Interface Layer を、OSI 第二層のように別名 Data Link Layer ということもあるらしい
- Internet 層の「Packet」は Datagram と呼ぶこともある。両者の違いはサイトによってばらばらで、明確でない。
- 上の表だと、単一のファイルにヘッダが続々と足されていくようなイメージだが、実際にはバラバラに分割される。一つ上からやってきたものは単なるひとかたまりのペイロードとして認識され、中がどうなっているのかは下層のプロトコルは意識することなく加工していく
- ペイロード（上層のヘッダ＋上層時点でのペイロード）はカプセル化しているので、下の階層では中は解読できない（なぜ？）
- 各層でどのプロトコルを使うかは、実際上はほぼ決まっている。例えば第四層で HTTP、POP3、SMTP などを使う時、第三層ではほぼ間違いなく TCP を使う。UDP はあまりに適当なので、リアルタイム性が必要なプロトコル以外では使わない。

# 4. Application Layer (TCP/IP)

## HTTP

- HTTP は Stateless。以下の４つの流れは１回だけ行われ、またそれぞれの回（画像１取得のための回、CSS ファイル取得のための回、...）は独立しておりお互いに全く無関係。Stateless な HTTP だけだとまともなウェブサービスは成立しない（例えばページ移動してもショッピングカートの中身は維持したい）ので、セッションやクッキーなどの機能で状態を維持することになる。

  1. 通信の確立
  1. 要求
  1. 応答
  1. 通信の切断

- Cookie

- ブラウザで URL を入力した時、リンクをクリックしたとき、「送信」「ダウンロード」などのボタンを押した時、その裏では普通 HTTP のデータのやり取りがされている。Axios は HTTP を簡単にやるための仕組み。
  - Axios
  - XHR
  - Fetch API
- HTTP を使わずによく使われている技術として「Web Socket」「Socket io」がある。

|         |        HTTP        |   WebSocket   |
| :-----: | :----------------: | :-----------: |
| Duplex  |        Half        |     Full      |
| Message | Request & Response | Bidirectional |

## Method

- POST
- GET
- PUT
- DELETE
- 他にも多数

## POST vs PUT

## Structure of Request & Response

| Request                                                       |              | Response                                                            |
| ------------------------------------------------------------- | ------------ | ------------------------------------------------------------------- |
| `GET /book/list.html HTTP/1.1`                                | Start Line   | `HTTP/1.1 200 OK`                                                   |
| `HOST: www.mylibrary.com`<br>`User-Agent: Mozilla/5.0`<br>... | Headers      | `Server: Apache`<br>`Content-Type: text/html; charset=utf-8`<br>... |
|                                                               | (empty line) |                                                                     |
| `bookId=123&author=Jane+Austen`                               | Body         | `<HTML><HEAD>`<br>...                                               |

## Important HTTP Status Code

- `200 OK`
- `301 Moved Permanently`
    - Called "301 Redirection"
    - New website location can inherit the SEO history by the Google bot
- `302 Moved Temporarily`
    - Google bot will NOT recognize temporary location same as old one
- `401 Unauthorized`
    - Client isn't authenticated, or authorized
- `403 Forbidden`　管理者以外アクセス禁止の場所の場合
- `404 Not Found`
- `500 Internal Server Error`
    - サーバーの内部エラー。バグなどが原因
- `503 Service Unavailable`
    - Server is down due to maintenance, overload, etc.

## Port Number

## SMTP & POP3

- いずれもメールを取り扱うために広く使われている
- SMTP は「メールの送信」に使われる。
  - クライアントから、クライアント側のメールサーバ A への送信
  - メールサーバ A から、受け取り手がわのメールサーバ B への送信
- POP3 は「自分宛てのメールが到着したかの確認、そして受信」に使われる
- それぞれ担当するのは SMTP サーバ、POP3 サーバ、と呼ばれる。ただし実際は１つの物理サーバが２つのサーバを兼任するケースが多い。

## FTP

## Telnet & SSH

- 別のコンピュータにログインするためのしくみ
- Telnet が平文なのに対して、SSH は暗号化され安全
- Windows は RDP という、リモートデスクトップのための独自のプロトコルを持つ。

# 3. Transport Layer (TCP/IP)

## TCP vs UDP

| TCP        | UDP                   |
| ---------- | --------------------- |
| 信頼度優先 | 速度優先              |
| WWW, Mail  | VoIP Phone, Streaming |
| 1 対 1     | 1 対多                |

## TCP Header

重要そうなやつだけ。

- 送信元のポート番号
- 送信先のポート番号
- シーケンス番号：　このデータが何バイト目なのか
- 確認応答番号：
- Control flags: Every flag has one bit (0 or 1)
  - URG
  - ACK
  - PSH
  - RST
  - SYN
  - FIN

## UDP Header

- 送信元のポート番号
- 送信先のポート番号
- データ長
- Checksum

## TCP のしくみ

- 確認応答が来なければ

# 2. Internet Layer (TCP/IP)

## IP Address (IPv4)

8bit ずつ４つで区切る

| IPv4 IP Address | 192            | 168            | 15       | 10       |
| --------------- | -------------- | -------------- | -------- | -------- |
| Subnet Mask     | 255            | 255            | 0        | 0        |
|                 | ネットワーク部 | ネットワーク部 | ホスト部 | ホスト部 |

- ネットワーク部は、同一のネットワーク内部なら不変。ホスト部はデバイス毎に異なる。

- 上記はネットワーク部とホスト部の長さはネットワークにより異なる場合がある。その境界を示すのがサブネットマスク

## IPv4 Header

- Version:
- Header length: 20 bytes
- Priority and Type of Service – specifies how the datagram should be handled. The first 3 bits are the priority bits.
  Total length – the length of the entire packet (header + data). The minimum length is 20 bytes, and the maximum is 65,535 bytes.
- Identification:
- Flags:
-

## IP Address (IPv6)

- `2001:2df6:1ee9:050f:0000:0000:0000:0019/64`
- `2001:2df6:1ee9:050f::::0019/64`
- 上記の両者は同じ意味。連続するゼロ４つは省略記法があるということ（ただし省略は１つながりのみ）
- IPv6 もやはりネットワーク部とホスト部があり、ネットワーク部の長さは末端の数（上記では 64）で表される

## IPv6 Header

## IPv4 vs IPv6

| IPv4 IP Address |               | IPv6 IP Address   |
| --------------- | ------------- | ----------------- |
| 32 bit (4 byte) | Length        | 128 bit (16 byte) |
| Decimal         | Number System | Hexadecimal       |
| no              | Multicast     | yes               |

## Private Address

- Private Address は Global Address として使ってはいけない
- Private Address は、違うネットワークなら当然かぶっても OK
- 範囲としては以下の３種
  - `10.0.0.0` to `10.255.255.255`
  - `172.0.0.0` to `172.31.255.255`
  - `192.168.0.0` to `192.168.255.255`
- 同じネットワーク内からの接続は、同一の global address を共有している
- private address そのままではインターネット接続できないので、NAT や NAPT が必要になる

- NAT: Netowork Address Translation

  - グローバルアドレスを複数確保する
  - そのアドレスの数までなら、同時接続できる
  - 全てのグローバルアドレスが占有されていたら、空くまで待つ

- NAPT: Network Address Port Translation (aka "IP Masquerade")
  - Share single global address among network devices
  - Multiple devices can access to the internet at the same time
  - This mechanism is enabled by using **different port number** for each device

## DNS: Domain Name System

- Get the

# 1. Network Interface Layer (TCP/IP)

## Keywords

- NIC: Network Interface Card aka LAN Card / Network Adaptor
- Data Link

## 宛先の把握

- Network Interface Layer では、宛先の NIC の MAC Address に基づいて送る
- しかし、Internet Layer から下りてきたデータには IP しか載ってない
- IP と MAC Address を紐付ける処理が必要
  - IPv4 では ARP でこれを実現
  - IPv6 では、ICMPv6 の Neighbor Discovery 機能でこれを実現

## Data Link の種類

- Token Ring
- FDDI

## Ethernet

- Connector
  - RJ-45 Connector
- Cable
  - CAT 5 Cable
  - CAT 5e Cable
  - CAT 6 Cable
  - CAT 6a Cable
  - CAT 6e Cable
  - CAT 7 Cable
- Cable
  - UTP Cable
  - STP Cable
- Cable
  - 同軸ケーブル
  - ツイストペアケーブル

## PPP

ダイアルアップ接続や ADSL。

# Topics

- IP Address
  - Subnet Mask
  - IPv4 vs IPv6
- MAC Address
- Routing
  - Routing Table
  - NAT/NAPT
  - Static Routing
  - Dynamic Routing
  - RIP
  - OSPF
- UDP vs TCP
- Port
- Ethernet
  - PPP & PPPoE
- Shell Commands
  - ARP
  - ipconfig

# QoS: Quality of Service

- ネットワーク上のサービス品質のこと
- パケットの遅延やドロップにより損なわれる
- DiffServ, IntServ, Best Effort の３つあり

## DiffServ (Differentiated Services)

- 最も主流
-

## IntServ (Integrated Services)

## Best Effort

- QoS の default

# Queueing

# Delay 遅延

- Ping で表示される時間は RTT: Round-trip Time であり、以下の４つの遅延の合計値
- Burst Traffic: 定常的に存在せず、突如現れるトラフィックの急激な上昇。

## Processing Delay プロセス遅延

- 通信機器の入力インターフェースから、出力インターフェースの Queue に入るまでの時間
- 「出力インターフェースから出るまでの時間」ではない（つまり Queue の Priority による遅れはプロセス遅延ではない）

## Queueing Delay 輻輳遅延

- 出力インターフェースの Queue に入ってから、実際に出力処理されるまでの遅延
- 出力よりも速いペースで出力すべきデータが溜まっていくと、Queue は肥大化していく
-

## Serialization Delay 伝送遅延

- パケットの最初のビットが送出されてから、最後のビットが送出されるまでの時間
- 当然ながら、「パケットが大きいほど」「帯域幅が狭いほど」伝送遅延は大きくなる

## Propagation Delay 伝搬遅延

- 通信路（光ケーブルであれ、銅線であれ）の長さに起因する遅れ
- 通信装置の上で発生するものではない

## Network: MISC

- NFS: Network File System


>>>

## Xaas

- IaaS: Infrastructure
  - Similar to conventional hosting services, however you can customize hardwares flexibly
- PaaS: Platform
- SaaS: Software
- BaaS / mBaaS: Backend 

>>>

## XaaS Comparison

|                | On-Premises |          IaaS          |                      PaaS                       |                  SaaS                   |
| -------------- | :---------: | :--------------------: | :---------------------------------------------: | :-------------------------------------: |
| Application    |    user     |          user          |                      user                       |                provider                 |
| Data           |    user     |          user          |                      user                       |                provider                 |
| Runtime        |    user     |          user          |                    provider                     |                provider                 |
| Middleware     |    user     |          user          |                    provider                     |                provider                 |
| OS             |    user     |          user          |                    provider                     |                provider                 |
| Virtualization |    user     |        provider        |                    provider                     |                provider                 |
| Servers        |    user     |        provider        |                    provider                     |                provider                 |
| Storage        |    user     |        provider        |                    provider                     |                provider                 |
| Networking     |    user     |        provider        |                    provider                     |                provider                 |
| Examples:      |    user     | EC2, GCE, DigitalOcean | GAE, Beanstalk, Heroku, Azure, RedHat OpenShift | Google Apps, Salesforce, Dropbox, Slack |

## Latency vs Bandwidth

---

# IP Addresses

>>>

## DNS



>>>

## IPv4

- 4 Bytes = 32 Bits

>>>


## IP Addressing: Classful vs Classless

|         |         Network Address          |  Host Address  | First Octet |     Mask      | CIDR  |             Range             |
| :-----: | :------------------------------: | :------------: | :---------: | :-----------: | :---: | :---------------------------: |
| Class A |   1 Byte = "0" + 7 bits( 2^7)    | 3 Bytes (2^24) |  0xxxxxxx   |   255.0.0.0   |  /8   |   0.0.0.0 - 127.255.255.255   |
| Class B | 2 Bytes = "10" + 14 bits (2^14)  | 2 Bytes (2^16) |  10xxxxxx   |  255.255.0.0  |  /16  | 128.0.0.0 to 191.255.255.255  |
| Class C | 3 Bytes = "110" + 21 bits (2^21) |  1 Byte (2^8)  |  110xxxxx   | 255.255.255.0 |  /24  | 192.0.0.0 to 223.255.255.255  |
| Class D |                -                 |       -        |  1110xxxx   |       -       |   -   | 224.0.0.0 to 239.255.255.255  |
| Class E |                -                 |       -        |  1111xxxx   |       -       |   -   | 240.0.0.0 and 255.255.255.255 |

- Note that some special addresses such as `0.0.0.0`, `127.x.x.x` are reserved

>>>

## IPv4: Reserved IP Addresses

- 0.0.0.0/8
  - This network
- 0.0.0.0/32
- 127.0.0.0/8
  - Loop Back
- 169.254.0.0/16
  - Link Local
- 172.16.0.0/12
- 192.168.0.0/16
- 224.0.0.0/4 (224.0.0.0 to 224.0.0.255)
  - Multi Cast
- 240.0.0.0/4
  - Includes `255.255.255.255/32` which shows the all the hosts on the network


>>>


## IPv6:


>>>

## TCP / IP Model

>>>

## OSI Model

>>>

## Tools

- Wireshark
- Firebug (dead?)

>>>

## Network Devices

- DTE: Data Terminal Equipment
- DCE: Data Circuit Terminating Equipment
- Hub
- Repeater
- Bridge
- Router
- Switch

>>>

## LAN Topology

- Bass
- Star
- Ring

>>>

## LAN Access Control Methods

- CSMA/CD
- Token Passing

>>>

## WLAN

- 

>>>

## Network Cables

- 


>>>

## TCP / IP

>>>

## Cache



---

# VPN

>>>

## What's VPN?

- Safe

### Types
- Internet VPN
  - Cheap but not so safe as others
- IP-VPN
  - Closed network for the ISP and its users
  - No need for encryption, however expensive
- Entry VPN
- WAE: Wide Area Ethernet
  - Highly customizable, but expensive and narrow

>>>

## VPN vs Leased Line

- Leased Line (専用線) is physical

>>>

## Internet VPN technologies

- Tunneling
- 

## Protocols

- IPsec-VPN
- L2TP
- PPTP
- SSL-VPN

>>>