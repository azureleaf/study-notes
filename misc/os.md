# Operation System


# ToC

- [Operation System](#operation-system)
- [ToC](#toc)
- [MISC](#misc)
- [Kernel](#kernel)
  - [Kernel Architecture](#kernel-architecture)
  - [Linux Kernel](#linux-kernel)
  - [Kernel Version](#kernel-version)
- [Unix-like Family](#unix-like-family)
  - [Linux Desktop](#linux-desktop)
- [Process & Thread](#process--thread)
  - [Memory](#memory)
    - [MMU: Memory Management Unit](#mmu-memory-management-unit)
  - [Register](#register)
    - [32 bit vs 64 bit](#32-bit-vs-64-bit)
    - [Register vs Cache](#register-vs-cache)
  - [System Call](#system-call)
  - [実行様式](#%e5%ae%9f%e8%a1%8c%e6%a7%98%e5%bc%8f)
  - [実行制御](#%e5%ae%9f%e8%a1%8c%e5%88%b6%e5%be%a1)
    - [Services offered by System Call](#services-offered-by-system-call)
- [Packet Filtering](#packet-filtering)
    - [五大装置](#%e4%ba%94%e5%a4%a7%e8%a3%85%e7%bd%ae)
  - [HDD vs SSD](#hdd-vs-ssd)
  - [CPU](#cpu)
    - [Package](#package)
    - [Bus Inteface](#bus-inteface)
    - [Cache Memory](#cache-memory)
    - [Control Unit](#control-unit)
    - [Processing Unit](#processing-unit)
    - [Pin](#pin)
  - [GPU](#gpu)
  - [FPGA](#fpga)
  - [ARM Processor](#arm-processor)
  - [TPU: Tensor Processing Unit](#tpu-tensor-processing-unit)
  - [ASIC: Application-Specific Integration Circuit](#asic-application-specific-integration-circuit)
  - [UEFI vs BIOS](#uefi-vs-bios)

# MISC

- POSIX
  - ソフトウェアの異なるOS間での移植性を確保するため、OSのAPIの仕様を定めたもの
- ALU: arithmetic logic unit


# Kernel

## Kernel Architecture

1. Shell
1. System Call
  - Request the service from the OS kernel
  
1. Kernel
  - Core programs of the OS
  - Offer the same environment on the various hardwares
1. Hardware


- Shell is the interface to run the kernel program


## Linux Kernel

- Versions 
  - Ubuntu 18.04で見たらversion5.3

## Kernel Version

# Unix-like Family

- Linux
  - Debian
    - Ubuntu
      - Linux Mint
      - Kubuntu
      - Lubuntu
      - Xubuntu
      - Ubuntu MATE
      - Elementary OS
      - KDE Neon
    - Kali Linux
  - Fedora
    - RHEL
    - CentOS
  - Arch
    - Manjaro
  - Android
  - Chromium OS
- FreeBSD
- MacOS

## Linux Desktop

- Gnome
- KDE
- Xfce
- Unity

# Process & Thread

- Process
  - 一つのアプリケーション
  - メモリ上に置いたデータに対して演算する（CPUから直接HDDを読み込むことはない...のか？）
- Multitask
  - 実行する複数のアプリケーションを超短時間で切り替えまくることで、同時に動いてるように見せること


## Memory

- 役割
  - Remember keyboard input
  - Remember data sent from the network
  - Remember data got from HDD, flash drive
  - Remember text to be shown on the screen

### MMU: Memory Management Unit

- 役割
  - プロセスごとの物理メモリ領域を確保
  - 確保した物理メモリについて仮想アドレスを用意
    - 一つのプロセスが使う物理メモリは連続していなくてもいい
  - 以降、仮想アドレスと物理アドレスの間のmappingを行う
  - このmapping情報自体も"Page Table"としてメモリ上に記憶される
  - あるプロセスが使っているメモリ領域は、他のプロセスが使わないようにする
- 32 bit CPUでは、4GBまでのメモリしか使えない理由
  - 1つのアドレスについて、１byteが割り当てられる
  - ２の32乗は4294967296だが、これは4GB強しかないので


## Register

### 32 bit vs 64 bit

- OSのビット数は、CPUのレジスタの容量である
- 16bitは2の16乗で65536
- 64bitだと18446744073709551616で2000京くらい
- ちなみにx86は32bit CPUだが、これはインテルの最初の32 bit CPUが「80386」という名前だったことに由来

### Register vs Cache

- どちらもCPUの上にある
- Registerはキャッシュよりもずっと速く、小さい

## System Call


## 実行様式


## 実行制御

- 排他制御
- セマフォ
- 

### Services offered by System Call
- Process creation and management
- Main mamory management
- File system
- Device I/O
- Protection
- Networking


# Packet Filtering

- 一定の基準に従ってパケットを検査し、不可のパケットは破棄して通さない
- BPF: Berkely Packet Filter
- Netfilter



### 五大装置

- 制御装置
- 演算装置
- 入力装置
- 記憶装置
- 出力装置

## HDD vs SSD



## CPU

### Package
- CPUの基盤

### Bus Inteface
- コンピューティングにおける「バス」とは、装置間の伝送路のこと
- 以下のように機能によって３つに分類される
    - Address Bus
        - メモリ内部の物理アドレスを指定するためのバス
        - データの流れは常に一方向
    - Data Bus
        - データの伝送のためのバス
    - Control Bus
- バスの物理的な位置によってCPU内部を結ぶ「内部バス」、CPUとメモリを結ぶ「外部バス」に区別することもある


### Cache Memory

### Control Unit
- Fetch Unit
- Register
- Decoder

### Processing Unit

### Pin

## GPU

## FPGA

## ARM Processor

## TPU: Tensor Processing Unit
- Machine Learning
- Googleが開発

## ASIC: Application-Specific Integration Circuit

## UEFI vs BIOS

- BIOSと組み合わせて使うのがMBR
- MBRではpartition tableの幅が32bit分しかないので、$2^(32) * 512 = 2199023255552$ バイトまでしか分けられないので