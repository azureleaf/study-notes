# 通信プロトコルを制覇する

## 通信プロトコルって何？


## これを勉強するとなんの役に立つの？

- エンジニア
- ネットワーク機器の役割を理解

実際、全てを理解する必要はなさそう。自分が開発で関与する部分の前後（フロントエンジニアならHTTPとIP）だけ理解していれば問題ない。たぶん。

## TCP/IP Model vs OSI Model

|#| OSI |#| TCP/IP |
|:---:|:---:|:---:|:---:|
|7| Application |4| Application |
|6| Presentation | 4| Application |
|5| Session |4| Application |
|4| Transport |3| Transport |
|3| Network |2| Internet |
|2| Data Link |1| Network Interface |
|1| Physical |1| Network Interface |

## OSI Model

|#| Layer | Role |
|:---:|:---:|:---:|
|7| Application | アプリケーション毎の規定 | 
|6| Presentation | 文字コードなどの表現の規定 |
|5| Session | 通信の確立、維持、終了までのセッションの規定 | 
|4| Transport | 「セグメント」の転送の信頼性のための規定。 | 
|3| Network | 「パケット」をネットワーク間で通信する方法の規定。 | 
|2| Data Link | 「フレーム」を宛先MACアドレスなどに基づいて送る規定 | 
|1| Physical | 「ビット」の列を電気信号に変換する規定 | 


- 送信側の時は、OSI７層目から出発して１層目に行く。受信側では、逆に１層目から７層目に向かってデータが加工されていく。
- ７層目に入る前の生データは「ペイロード」と呼ばれる。層を下るたびにL7 Header, L6 Header, L5 Header...のようにヘッダが追加されていく。


## TCP/IP Model

|#| TCP/IP Layer | Protocol |
|:---:|:---:|:---:|
|4| Application | HTTP, FTP, SMTP, SSHなど。
|3| Transport | TCP, UDP。エラー訂正や再送の制御など |
|2| Internet | IPがここででてくる。ルーティングなど。ルータが活躍する時のデータはこれ |
|1| Network Interface | PPP, Ethernetが重要。電気的な接続。 |

## HTTP

- ブラウザでURLを入力した時、リンクをクリックしたとき、「送信」「ダウンロード」などのボタンを押した時、その裏では普通HTTPのデータのやり取りがされている。AxiosはHTTPを簡単にやるための仕組み。
- HTTPを使わずによく使われている技術として「Web Socket」「Socket.io」がある。

### HTTP Request

### HTTP Response


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