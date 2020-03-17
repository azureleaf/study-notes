# Network Device

## Reference

- ネットワーク超入門講座 第４版, 三上信男, Softbank Creative

## ToC

1. [MISC](#MISC)
1. [ONU and MODEM](#ONU%20and%20MODEM)
1. [Layer 2 Switch](#switch2)
1. [Layer 3 Switch](#switch3)
1. [Router](#Router)
1. [Wireless LAN](#Wireless%20LAN)

## MISC

### Network Types

- WAN
  - IP-VPN
  - WAE: Widearea Ethernet
- LAN

### Devices Configuration at the Large network

1. Internet / IP-VPN / 広域イーサネット
1. Router
1. Firewall
   - ここで DMZ にも分岐する
1. L3 Switch
1. L2 Switch
   - Every LAN has a L2 Switch; relations between L3 Switch & L2 Switch is One-to-Many
   - Sometimes a L2 Switch connect to multiple L3 Switches; Many-to-Many
1. LAN
1. Wireless Access Point / PC via Ethernet

### Devices Configuration at the Small network

1. Internet
1. MODEM or ONU
1. Router (Firewall, L3 Switch)
1. PCs (Ethernet) / VoIP Phone / Wireless AP

「WiFi ルータ」として売ってるものは、Router + L3 Switch + Wireless AP の全てを担っている？？？

### VoIP

## ONU and MODEM

## What does "hub" refer to?

- Some devices are called "hub" just because they have many ports
  - Repeater Hub (In most cases, hub refers to Repeater hub)
  - Switching hub
  - Router ?

## Repeater

- 信号が劣化する前に補正する
- 信号を「増幅」するわけではない
- 現在では、ハブがリピータの役割を果たす
- Use CSMA/CD method
- OSI の Physical Layer しか見ない

### Repeater Hub

- 複数のポートを持っている Repeater
- In many context in Japan, when somebody says "hub" it refers to a repeater hub

### CSMA/CD

- Repeater hub uses CSMA/CD method
- CSMA/CD is the rule to send the data into the cable
- CS: Carrier Sense
  - All the devices on the cable always check if the cable isn't used by others
- MA: Multiple Access
  - As long as you can
- CD: Collision Detection
  - when the multiple devices send the data at the same time, data from both ones will be discarded
  - When such collision is detected, both devices try to resend the data

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
- 利点
  - VLAN 分割が可能
- 欠点
  - 宛先を判別する作業などに一定の時間がかかるので、その分は遅くなる

### VLAN

- Separate single physical network into multiple logical network
- 利点
  - Enhanced Security
  - Broadcast による帯域消費を最小限にできる
- Trunk Link
  - １本のケーブルに複数の VLAN Frame を流す
  - VLAN を実現するのに欠かせない機能
- VLAN 越え通信
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

## Layer 3 Switch <a id="switch3"></a>

- OSI Model の第三層（）
- Layer 2 Switch の機能に加えて、IP による宛先判別ができる

## Router

- OSI の第三層（Network Layer）
- Connects LANs (switch) and WANs (internet)
- ルータがないと、１つの外部回線に１台しか接続できない
- １つのネットワークにルータ機能が ON の機器が複数あると問題が起きる
  - Is this "Rogue DHCP Server"???
- Routing Table
- Default Route
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

### Band

- Dual Band
- Triband

### CSMA/CA

- １つのアクセスポイントにアクセスできるのは、１台だけ
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
- WPA2
- WEP
  - DO NOT USE THIS
  - This is old and fragile encryption

### Wireless LAN Security Technology

- MAC Address Filtering
  - まあまあ意味ある
  - 脆弱性：　 Wireless LAN カードの盗難、MAC Address の偽装
- SSID
- IEEE802.1X

### Wireless LAN MISC

- Ekahau Site Survey: AP の電波強度を可視化するツール
- Mesh WiFi
- AOSS
