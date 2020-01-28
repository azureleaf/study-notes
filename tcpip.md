# 通信プロトコルを制覇する

## 通信プロトコルって何？
- 通信するときのデータの仕様のお約束
- 複数の段階に分け、それぞれの段階の出口と入口のデータ形式を決めておくことで、様々なプロトコルを組み合わせることができる。

## これを勉強するとなんの役に立つの？

- HTTP通信の背景がわかる。
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
- ヘッダにはText baseとBinary Baseの２種類がある
- ヘッダには制御情報が含まれる。制御だけを目的として、本体なしでヘッダだけを送ることもある

## TCP/IP Model

| #   | TCP/IP Layer      | Protocol             | PDU: Protocol Data Unit                                                                          | Device         |
| --- | ----------------- | -------------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| 4   | Application       | HTTP, FTP, SMTP, POP3, SSH | HTTP Header + Data                                                                             |                |
| 3   | Transport         | TCP, UDP             | Segment = TCP Header <br> + HTTP Header <br> + Data                                            | Router         |
| 2   | Internet          | IP                   | Packet = IP Header <br> + TCP Header <br> + HTTP Header <br> + Data                            | Swtich, Bridge |
| 1   | Network Interface | Ethernet, PPP, ARP   | Frame = Ethernet Header <br> + IP Header <br> + TCP Header <br> + Data <br> + Ethernet Trailer | Hub, Cable     |

- 一番大切なのが TCP と IP なので、この名前になった
- Network Interface Layer を、OSI 第二層のように別名 Data Link Layer ということもあるらしい
- Internet 層の「Packet」は Datagram と呼ぶこともある。両者の違いはサイトによってばらばらで、明確でない。
- 上の表だと、単一のファイルにヘッダが続々と足されていくようなイメージだが、実際にはバラバラに分割される。一つ上からやってきたものは単なるひとかたまりのペイロードとして認識され、中がどうなっているのかは下層のプロトコルは意識することなく加工していく
- ペイロード（上層のヘッダ＋上層時点でのペイロード）はカプセル化しているので、下の階層では中は解読できない（なぜ？）
- 各層でどのプロトコルを使うかは、実際上はほぼ決まっている。例えば第四層でHTTP、POP3、SMTPなどを使う時、第三層ではほぼ間違いなくTCPを使う。UDPはあまりに適当なので、リアルタイム性が必要なプロトコル以外では使わない。

## 4. Application Layer (TCP/IP)

### HTTP

- HTTPはStateless。以下の４つの流れは１回だけ行われ、またそれぞれの回（画像１取得のための回、CSSファイル取得のための回、...）は独立しておりお互いに全く無関係。StatelessなHTTPだけだとまともなウェブサービスは成立しない（例えばページ移動してもショッピングカートの中身は維持したい）ので、セッションやクッキーなどの機能で状態を維持する。
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

POST vs PUT

### Structure of Request & Response

|Request| |Response|
|--|--|--|
| `GET /book/list.html HTTP/1.1` | Start Line | `HTTP/1.1 200 OK` |
| `HOST: www.mylibrary.com`<br>`User-Agent: Mozilla/5.0`<br>...| Request Headers / Response Headers | `Server: Apache`<br>`Content-Type: text/html; charset=utf-8`<br>... |
|| (empty line) |  |
| `bookId=123&author=Jane+Austen` | Request Body | `<HTML><HEAD>`<br>... |

### Port Number

### SMTP & POP3

- いずれもメールを取り扱うために広く使われている
- SMTPは「メールの送信」に使われる。
    - クライアントから、クライアント側のメールサーバAへの送信
    - メールサーバAから、受け取り手がわのメールサーバBへの送信
- POP3は「自分宛てのメールが到着したかの確認、そして受信」に使われる
- それぞれ担当するのはSMTPサーバ、POP3サーバ、と呼ばれる。ただし実際は１つの物理サーバが２つのサーバを兼任するケースが多い。

### FTP


### Telnet & SSH

- 別のコンピュータにログインするためのしくみ
- Telnetが平文なのに対して、SSHは暗号化され安全
- WindowsはRDPという、リモートデスクトップのための独自のプロトコルを持つ。



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

### IP Header

### IP Address

- Subnet Mask 

- IPv4 vs IPv6


### VLAN

## 1. Network Interface Layer (TCP/IP)

### Ethernet

### PPP

ダイアルアップ接続やADSL。

### 

## Network Device

### Network Types
- WAN
  - IP-VPN
  - WAE: Widearea Ethernet

### 大規模ネットワークでの構成

1. Internet もしくは IP-VPN　もしくは 広域イーサネット
1. Router
1. Firewall: ここで DMZ にも分岐する
1. L3 Switch
1. L2 Switch: LAN の数だけ複数ある。複数のL3 Switchに接続することもある。
1. LAN
1. Wireless Access Point や PC

### 小規模ネットワークでの構成

1. Internet
1. MODEM or ONU
1. Router (Firewall, L3 Switch)
1. PCs or VoIP Phone

## Topics

- IP Address
  - Subnet Mask
  - IPv4 vs IPv6
- MAC Address
- Hardwares
  - Router
  - Repeater Hub
  - Bridge
  - Switching Hub
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
