# ネットワーク基礎の基礎

## 通信プロトコルって何？

- 通信するときのデータの仕様のお約束
- 複数の段階に分け、それぞれの段階の出口と入口のデータ形式を決めておくことで、様々なプロトコルを組み合わせることができる。

## これを勉強するとなんの役に立つの？

- HTTP 通信の背景がわかる
- ネットワーク機器の役割を理解しやすい。ネットワークエンジニアなら必須。
- 他のエンジニアと話しててもナメられない
- 実際、全てを理解する必要はなさそう。自分が開発で関与する部分の前後（フロントエンジニアなら HTTP, TCP, IP）だけ理解していればたぶん問題ない。

## TCP/IP Model vs OSI Model

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

## OSI Model

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

## TCP/IP Model

| #   | TCP/IP Layer      | Protocol Examples          | PDU: Protocol Data Unit                                                                        | Device         |
| --- | ----------------- | -------------------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| 4   | Application       | HTTP, FTP, SMTP, POP3, SSH | HTTP Header + Data                                                                             |                |
| 3   | Transport         | TCP, UDP                   | Segment = TCP Header <br> + HTTP Header <br> + Data                                            | Router         |
| 2   | Internet          | IP                         | Packet = IP Header <br> + TCP Header <br> + HTTP Header <br> + Data                            | Swtich, Bridge |
| 1   | Network Interface | Ethernet, PPP, ARP         | Frame = Ethernet Header <br> + IP Header <br> + TCP Header <br> + Data <br> + Ethernet Trailer | Hub, Cable     |

- 一番大切なのが TCP と IP なので、この名前になった
- Network Interface Layer を、OSI 第二層のように別名 Data Link Layer ということもあるらしい
- Internet 層の「Packet」は Datagram と呼ぶこともある。両者の違いはサイトによってばらばらで、明確でない。
- 上の表だと、単一のファイルにヘッダが続々と足されていくようなイメージだが、実際にはバラバラに分割される。一つ上からやってきたものは単なるひとかたまりのペイロードとして認識され、中がどうなっているのかは下層のプロトコルは意識することなく加工していく
- ペイロード（上層のヘッダ＋上層時点でのペイロード）はカプセル化しているので、下の階層では中は解読できない（なぜ？）
- 各層でどのプロトコルを使うかは、実際上はほぼ決まっている。例えば第四層で HTTP、POP3、SMTP などを使う時、第三層ではほぼ間違いなく TCP を使う。UDP はあまりに適当なので、リアルタイム性が必要なプロトコル以外では使わない。

## 4. Application Layer (TCP/IP)

### HTTP

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

#### Method

- POST
- GET
- PUT
- DELETE
- 他にも多数

#### POST vs PUT

### Structure of Request & Response

| Request                                                       |                                    | Response                                                            |
| ------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| `GET /book/list.html HTTP/1.1`                                | Start Line                         | `HTTP/1.1 200 OK`                                                   |
| `HOST: www.mylibrary.com`<br>`User-Agent: Mozilla/5.0`<br>... | Request Headers / Response Headers | `Server: Apache`<br>`Content-Type: text/html; charset=utf-8`<br>... |
|                                                               | (empty line)                       |                                                                     |
| `bookId=123&author=Jane+Austen`                               | Request Body                       | `<HTML><HEAD>`<br>...                                               |

### Important HTTP Status Code

- `200 OK` ウェブサイトがきちんと表示されるとき
- `301 Moved Permanently` 「３０１リダイレクト」と呼ばれるもの。検索エンジンの評価を引き継げる。
- `302 Moved Temporarily` 一時的な移動。Google ボットはサイト評価を移動しない
- `401 Unauthorized`　認証をそもそもしてないとき、認証に失敗したときなど
- `403 Forbidden`　管理者以外アクセス禁止の場所の場合
- `404 Not Found`
- `500 Internal Server Error`　サーバーの内部エラー。バグなどが原因
- `503 Service Unavailable`　サーバーのメンテナンスや、過負荷など

### Port Number

### SMTP & POP3

- いずれもメールを取り扱うために広く使われている
- SMTP は「メールの送信」に使われる。
  - クライアントから、クライアント側のメールサーバ A への送信
  - メールサーバ A から、受け取り手がわのメールサーバ B への送信
- POP3 は「自分宛てのメールが到着したかの確認、そして受信」に使われる
- それぞれ担当するのは SMTP サーバ、POP3 サーバ、と呼ばれる。ただし実際は１つの物理サーバが２つのサーバを兼任するケースが多い。

### FTP

### Telnet & SSH

- 別のコンピュータにログインするためのしくみ
- Telnet が平文なのに対して、SSH は暗号化され安全
- Windows は RDP という、リモートデスクトップのための独自のプロトコルを持つ。

## 3. Transport Layer (TCP/IP)

### TCP vs UDP

| TCP        | UDP                   |
| ---------- | --------------------- |
| 信頼度優先 | 速度優先              |
| WWW, Mail  | VoIP Phone, Streaming |
| 1 対 1     | 1 対多                |

### TCP Header

重要そうなやつだけ。

- 送信元のポート番号
- 送信先のポート番号
- シーケンス番号：　このデータが何バイト目なのか
- 確認応答番号：
- Control flag： それぞれ 1 ビット。
  - URG
  - ACK
  - PSH
  - RST
  - SYN
  - FIN

### UDP Header

- 送信元のポート番号
- 送信先のポート番号
- データ長
- Checksum

### TCP のしくみ

- 確認応答が来なければ

## 2. Internet Layer (TCP/IP)

### IP Address (IPv4)

8bit ずつ４つで区切る

| IPv4 IP Address | 192            | 168            | 15       | 10       |
| --------------- | -------------- | -------------- | -------- | -------- |
| Subnet Mask     | 255            | 255            | 0        | 0        |
|                 | ネットワーク部 | ネットワーク部 | ホスト部 | ホスト部 |

- ネットワーク部は、同一のネットワーク内部なら不変。ホスト部はデバイス毎に異なる。

- 上記はネットワーク部とホスト部の長さはネットワークにより異なる場合がある。その境界を示すのがサブネットマスク

#### IPv4 Header

- Version:
- Header length: 20 bytes
- Priority and Type of Service – specifies how the datagram should be handled. The first 3 bits are the priority bits.
  Total length – the length of the entire packet (header + data). The minimum length is 20 bytes, and the maximum is 65,535 bytes.
- Identification:
- Flags:
-

### IP Address (IPv6)

- `2001:2df6:1ee9:050f:0000:0000:0000:0019/64`
- `2001:2df6:1ee9:050f::::0019/64`
- 上記の両者は同じ意味。連続するゼロ４つは省略記法があるということ（ただし省略は１つながりのみ）
- IPv6 もやはりネットワーク部とホスト部があり、ネットワーク部の長さは末端の数（上記では 64）で表される

#### IPv6 Header

### IPv4 vs IPv6

| IPv4 IP Address |               | IPv6 IP Address   |
| --------------- | ------------- | ----------------- |
| 32 bit (4 byte) | Length        | 128 bit (16 byte) |
| Decimal         | Number System | Hexadecimal       |
| no              | Multicast     | yes               |

#### Private Address

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

### DNS: Domain Name System

- Get the

## 1. Network Interface Layer (TCP/IP)

### Ethernet

- RJ-45
- CAT 6
- CAT 5

### PPP

ダイアルアップ接続や ADSL。

## Network Device

### ONU / MODEM

### "hub"

- 普通Repeaterのことか？
- しかし"Switching Hub"もハブと呼ばれていることがある気がする

### Repeater 

- **今では使われていない**
- Regenerate the signal before it became too weak or too corrupted
- However repeater doesn't amplify the signal
- CSMA/CD方式を採用
- OSIのPhysical Layerしか見ない

#### CSMA/CD
- 通信ケーブルにデータを流すためのルールである
- CS: Carrier Sense
- MA: Multiple Access
- CD: Collision Detection
    - 複数の装置が同時に送信を開始してしまった場合は、双方のデータが使えなくなる。それを検知したら再送することになる

### Bridge

- ２つの異なるネットワークのハブ同士を接続する
- Collision Domainを小さくできるのが利点
- データのMACアドレスを確認し、ブリッジの反対側のネットワーク宛でなかったら向こう側にはそのデータを流さない
    - つまり、Bridgeは内部でネットワーク毎のMACアドレスの一覧（MAC Address Table）を学習する必要がある
- RepeaterがOSI物理層しか見ないのにたいして、BridgeはData Link Layerの情報も活用する

### Layer 2 Switch

- 信号を中継する
- 多数のイーサネットポートを持っている
- ここでいう Layer 2 とは、OSI モデルの第二層（データリンク層）である。
- 信号が来たら、それがどの宛先なのかを判断し、そのデバイスのみに送出する。

#### 利点
- 
- VLAN分割が可能

#### 欠点
- 宛先を判別する作業などに一定の時間がかかるので、その分は遅くなる

#### VLAN

- 一つの物理的なネットワークを、複数の論理的ネットワークに分割する技術
- 利点
    - 
    - Enhanced Security
    - Broadcastによる帯域消費を最小限にできる

- Trunk Link
    - １本のケーブルに複数のVLAN Frameを流す
    - VLANを実現するのに欠かせない機能
- VLAN越え通信
    - 
- Static VLAN / Port VLAN
- Dynamic VLAN

#### Switch vs Bridge
- 共通点
    - どちらもフレームを解析
    - どちらもOSI Data Link Layer
    - どちらもMAC Address Tableを保持
- 相違点
    - Bridgeはソフトウェア処理
    - Switchはハードウェア（ASIC）処理。したがって高速


### Layer 3 Switch

- OSI Model の第三層（）
- Layer 2 Switch の機能に加えて、IP による宛先判別ができる


### Router


- OSIの第三層（Network Layer）
- Connects LANs (switch) and WANs (internet)
- ルータがないと、１つの外部回線に１台しか接続できない
- １つのネットワークにルータ機能がONの機器が複数あると問題が起きる
- Routing Table
- 


- Default Route
    - 既定の動作では、Routing Tableに一致する宛先がない場合にはｓのパケットは破棄される
    - Default Routeを設定すると、宛先不明パケットは全てそこに送られる

#### 小規模拠点におけるルーターの機能
- Routing
- Firewall
- VPN
- NAT / NAPT
- Packet Filtering


#### 特殊なRouter
- Core Router
- Edge Router
- Access Router
- Multi-protocol Router
#### Static Routing
#### Dynamic Routing
- "1 hop"
- Algorithm
    - Distance Vector Algorithm: RIP Protocol
    - Link State Algorithm： OSPF Protocol
    - Path Vector Algorithm

### Router vs L3 Switch?

- どっちも routing できる
- L3 Switch がハードウェア的に routing。その分高速
- Router はソフトウェア的に routing する。Ethernet 以外の回線や、様々なプロトコルに対応できる

### Wireless Access Point

- 多くの無線ルータは、Router + Wireless Access Pointを兼務。APモード（APとしての機能に専念）とRTモード（両者の役割）の切替ができる。


### Range Extender / WiFi Booster / WiFi Extender （中継器）

- WiFiの動作範囲を拡大する

### Network Types

- WAN
  - IP-VPN
  - WAE: Widearea Ethernet

### 大規模ネットワークでの構成

1. Internet もしくは IP-VPN 　もしくは 広域イーサネット
1. Router
1. Firewall: ここで DMZ にも分岐する
1. L3 Switch
1. L2 Switch: LAN の数だけ複数ある。複数の L3 Switch に接続することもある。
1. LAN
1. Wireless Access Point や PC(Ethernet)

### 小規模ネットワークでの構成

1. Internet
1. MODEM or ONU
1. Router (Firewall, L3 Switch)
1. PCs (Ethernet) / VoIP Phone / Wireless AP

「WiFiルータ」として売ってるものは、Router + L3 Switch + Wireless APの全てを担っている？？？

## VoIP

## Wireless LAN

### Wireless LAN Network Types

- A. Infrastructure Mode
  - 一番普通。アクセスポイントにみんなが接続
- B. Ad Hoc Mode / Peer-to-peer Mode / IBSS (independent basic service set)
  - ゲーム機同士の接続とか。

### Wireless LAN Devices

- Wireless LAN Client
- Wireless LAN Controller
- Wireless LAN Access Point

### Wireless Networking Standards

- IEEE802.11b: 11 Mbps
- IEEE802.11a: 54 Mbps
- IEEE802.11g: 54 Mbps
- IEEE802.11n: 600 Mbps
- IEEE802.11ac (WiFi 5): 6.93 Gbps
- IEEE802.11ax (WiFi 6): 次世代規格

### Frequency

- 2.4 GHz
- 5 GHz

- Dual Band
- Triband

### CSMA/CA

- **１つのアクセスポイントにアクセスできるのは、１台だけ**

  -

- CS: Carrier Sense
- MA: Multiple Access
- CA: Collision Avoidance

### Areas

- Service Area
- Cover Area
- Coverage Area
- Coverage Hole

### Channel

### Wireless LAN Security Protocols

- WPA
- WPA2:
- WEP: もう使っちゃだめ。暗号化はするが脆弱

### Wireless LAN Security Technology

- MAC Address Filtering
  - まあまあ意味ある
  - 脆弱性：　 Wireless LAN カードの盗難、MAC Address の偽装
- SSID
  -
- IEEE802.1X

### Wireless LAN MISC

- Ekahau Site Survey: AP の電波強度を可視化するツール
- Mesh WiFi
- AOSS

## Topics

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
