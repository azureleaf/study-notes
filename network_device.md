# Network Device

## ToC
1. [MISC](#MISC)
1. [ONU](#ONU)
1. [MODEM](#MODEM)
1. [Layer 2 Switch](#switch2)
1. [Layer 3 Switch](#Layer%203%20Switch)
1. [Router](#Router)
1. [Wireless LAN](#Wireless%20LAN)

## MISC

### Network Types

- WAN
  - IP-VPN
  - WAE: Widearea Ethernet
- LAN

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

「WiFi ルータ」として売ってるものは、Router + L3 Switch + Wireless AP の全てを担っている？？？

### VoIP 


## ONU

- 

## MODEM

- 

## "hub"はなにを指すのか

- 要するに、ポートがたくさんあると Hub と呼ばれてる気がする
- Repeater Hub のことを指すことが多い。なお、Repeater と Repeater Hub は別物
- しかし"Switching Hub"も Hub とついている以上は Hub と呼ばれることもあるだろう

## Repeater 

- 信号が劣化する前に補正する
- 信号を「増幅」するわけではない
- 現在では、ハブがリピータの役割を果たす
- CSMA/CD 方式を採用
- OSI の Physical Layer しか見ない

## Repeater Hub

- 複数のポートを持っている Repeater

### CSMA/CD

- 通信ケーブルにデータを流すためのルールである
- CS: Carrier Sense
- MA: Multiple Access
- CD: Collision Detection
  - 複数の装置が同時に送信を開始してしまった場合は、双方のデータが使えなくなる。それを検知したら再送することになる

## Bridge

- ２つの異なるネットワークのハブ同士を接続する
- Collision Domain を小さくできるのが利点
- データの MAC アドレスを確認し、ブリッジの反対側のネットワーク宛でなかったら向こう側にはそのデータを流さない
  - つまり、Bridge は内部でネットワーク毎の MAC アドレスの一覧（MAC Address Table）を学習する必要がある
- Repeater が OSI 物理層しか見ないのにたいして、Bridge は Data Link Layer の情報も活用する

## Layer 2 Switch <a id="switch2" name="switch2"></a>

- 信号を中継する
- 多数のイーサネットポートを持っている
- ここでいう Layer 2 とは、OSI モデルの第二層（データリンク層）である。
- 信号が来たら、それがどの宛先なのかを判断し、そのデバイスのみに送出する。

### 利点

-
- VLAN 分割が可能

### 欠点

- 宛先を判別する作業などに一定の時間がかかるので、その分は遅くなる

### VLAN

- 一つの物理的なネットワークを、複数の論理的ネットワークに分割する技術
- 利点

  -
  - Enhanced Security
  - Broadcast による帯域消費を最小限にできる

- Trunk Link
  - １本のケーブルに複数の VLAN Frame を流す
  - VLAN を実現するのに欠かせない機能
- VLAN 越え通信
  -
- Static VLAN / Port VLAN
- Dynamic VLAN

### Switch vs Bridge

- 共通点
  - どちらもフレームを解析
  - どちらも OSI Data Link Layer
  - どちらも MAC Address Table を保持
- 相違点
  - Bridge はソフトウェア処理
  - Switch はハードウェア（ASIC）処理。したがって高速

## Layer 3 Switch

- OSI Model の第三層（）
- Layer 2 Switch の機能に加えて、IP による宛先判別ができる

## Router

- OSI の第三層（Network Layer）
- Connects LANs (switch) and WANs (internet)
- ルータがないと、１つの外部回線に１台しか接続できない
- １つのネットワークにルータ機能が ON の機器が複数あると問題が起きる
- Routing Table
-

* Default Route
  - 既定の動作では、Routing Table に一致する宛先がない場合にはｓのパケットは破棄される
  - Default Route を設定すると、宛先不明パケットは全てそこに送られる

### 小規模拠点におけるルーターの機能

- Routing
- Firewall
- VPN
- NAT / NAPT
- Packet Filtering

### 特殊な Router

- Core Router
- Edge Router
- Access Router
- Multi-protocol Router

### Static Routing

### Dynamic Routing

- "1 hop"
- Algorithm
  - Distance Vector Algorithm: RIP Protocol
  - Link State Algorithm： OSPF Protocol
  - Path Vector Algorithm

### Router vs L3 Switch?

routing できる点では共通だが、違いを抑える

- L3 Switch がハードウェア的に routing。その分高速
- Router はソフトウェア的に routing する。Ethernet 以外の回線や、様々なプロトコルに対応できる

## Wireless Access Point

- 多くの無線ルータは、Router + Wireless Access Point を兼務。AP モード（AP としての機能に専念）と RT モード（両者の役割）の切替ができる。

## Range Extender / WiFi Booster / WiFi Extender （中継器）

- WiFi の動作範囲を拡大する



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

### Wireless LAN device

### Wireless LAN Security Protocols

- WPA
- WPA2:
- WEP: もう使っちゃだめ。暗号化はするが脆弱

### Wireless LAN Security Technology

- MAC Address Filtering
  - まあまあ意味ある
  - 脆弱性：　 Wireless LAN カードの盗難、MAC Address の偽装
- ## SSID
- IEEE802.1X

### Wireless LAN MISC

- Ekahau Site Survey: AP の電波強度を可視化するツール
- Mesh WiFi
- AOSS