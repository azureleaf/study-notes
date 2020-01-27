# 通信プロトコルを制覇する

## 通信プロトコルって何？

## これを勉強するとなんの役に立つの？

- HTTP 通信の背景がわかる
- ネットワーク機器の役割を理解しやすい
- 他のエンジニアと話しててもナメられない

実際、全てを理解する必要はなさそう。自分が開発で関与する部分の前後（フロントエンジニアなら HTTP, TCP, IP）だけ理解していればたぶん問題ない。

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

## TCP/IP Model

| #   | TCP/IP Layer      | Protocol             | Protocol Data Unit                                                                             | Device         |
| --- | ----------------- | -------------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| 4   | Application       | HTTP, FTP, SMTP, SSH | HTTP Header + Data                                                                             |                |
| 3   | Transport         | TCP, UDP             | Segment = TCP Header <br> + HTTP Header <br> + Data                                            | Router         |
| 2   | Internet          | IP                   | Packet = IP Header <br> + TCP Header <br> + HTTP Header <br> + Data                            | Swtich, Bridge |
| 1   | Network Interface | PPP, Ethernet, ARP   | Frame = Ethernet Header <br> + IP Header <br> + TCP Header <br> + Data <br> + Ethernet Trailer | Hub, Cable     |

- 一番大切なのが TCP と IP なので、この名前になった
- Network Interface Layer を、OSI 第二層のように別名 Data Link Layer ということもあるらしい
- Internet 層の「Packet」は Datagram と呼ぶこともある。両者の違いはサイトによってばらばらで、明確でない。

## 4. Application Layer (TCP/IP)

### HTTP Header

- ブラウザで URL を入力した時、リンクをクリックしたとき、「送信」「ダウンロード」などのボタンを押した時、その裏では普通 HTTP のデータのやり取りがされている。Axios は HTTP を簡単にやるための仕組み。
  - Axios
  - XHR
  - Fetch API
- HTTP を使わずによく使われている技術として「Web Socket」「Socket io」がある。

|         |        HTTP        |   WebSocket   |
| :-----: | :----------------: | :-----------: |
| Duplex  |        Half        |     Full      |
| Message | Request & Response | Bidirectional |

### HTTP Request

### HTTP Response

### Port Number

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
