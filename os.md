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
- [Windows](#windows)
  - [Windows NT Family](#windows-nt-family)
  - [Windows Family](#windows-family)
  - [MS-DOS Family](#ms-dos-family)
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
- [IPC: Interprocess Communication](#ipc-interprocess-communication)
  - [Shared Memory](#shared-memory)
  - [Semapho](#semapho)
  - [Mapped Memory](#mapped-memory)
  - [Pipe](#pipe)
  - [Unix Domain Socket](#unix-domain-socket)
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
- [RAID](#raid)
  - [RAID0](#raid0)
  - [RAID1](#raid1)
  - [RAID5](#raid5)
  - [RAID10](#raid10)
  - [RAID50](#raid50)

# MISC

- POSIX
  - ソフトウェアの異なる OS 間での移植性を確保するため、OS の API の仕様を定めたもの
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
  - Ubuntu 18.04 で見たら version5.3

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
  - OpenSUSE
  - Fedora
    - RHEL (not same as Red Hat Linux)
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

# Windows

- WSL
- Active Directory
- .NET Framework
- "Task"

## Windows NT Family

- Windows NT
- Windows 2000
- XP
- Vista
- 7
- 8
- 10

## Windows Family

- Windows 1.0
- 95
- 98
- 2000
- ME

## MS-DOS Family

# Process & Thread

- Process
  - 一つのアプリケーション
  - メモリ上に置いたデータに対して演算する（CPU から直接 HDD を読み込むことはない...のか？）
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
  - 以降、仮想アドレスと物理アドレスの間の mapping を行う
  - この mapping 情報自体も"Page Table"としてメモリ上に記憶される
  - あるプロセスが使っているメモリ領域は、他のプロセスが使わないようにする
- 32 bit CPU では、4GB までのメモリしか使えない理由
  - 1 つのアドレスについて、１ byte が割り当てられる
  - ２の 32 乗は 4294967296 だが、これは 4GB 強しかないので

## Register

### 32 bit vs 64 bit

- OS のビット数は、CPU のレジスタの容量である
- 16bit は 2 の 16 乗で 65536
- 64bit だと 18446744073709551616 で 2000 京くらい
- ちなみに x86 は 32bit CPU だが、これはインテルの最初の 32 bit CPU が「80386」という名前だったことに由来

### Register vs Cache

- どちらも CPU の上にある
- Register はキャッシュよりもずっと速く、小さい

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

# IPC: Interprocess Communication

## Shared Memory

## Semapho

## Mapped Memory

## Pipe

## Unix Domain Socket

- カーネル内部でしか使えないが、高速
- 2 種類ある
  - TCP 型：Stream
  - UDP 型：Datagram
- Server Process
- Client Process

# 五大装置

- 制御装置
- 演算装置
- 入力装置
- 記憶装置
- 出力装置

# HDD vs SSD

# CPU

## Package

- CPU の基盤

## Bus Inteface

- コンピューティングにおける「バス」とは、装置間の伝送路のこと
- 以下のように機能によって３つに分類される
  - Address Bus
    - メモリ内部の物理アドレスを指定するためのバス
    - データの流れは常に一方向
  - Data Bus
    - データの伝送のためのバス
  - Control Bus
- バスの物理的な位置によって CPU 内部を結ぶ「内部バス」、CPU とメモリを結ぶ「外部バス」に区別することもある

## Cache Memory

## Control Unit

- Fetch Unit
- Register
- Decoder

## Processing Unit

## Pin

# GPU

# FPGA

# ARM Processor

# TPU: Tensor Processing Unit

- Machine Learning
- Google が開発

# ASIC: Application-Specific Integration Circuit

# UEFI vs BIOS

- BIOS と組み合わせて使うのが MBR
- MBR では partition table の幅が 32bit 分しかないので、$2^(32) * 512 = 2199023255552$ バイトまでしか分けられないので

# RAID

- RAID: Redundant Alley of Inexpensive Disks

## RAID0

- More than 2 disks
- Each disk has different data
- Advantage: More I/O speed than single disk, because of the simultaneous access to the multiple disks
- No redundancy


## RAID1

- More than 2 disks
- Each disk has identical data
- Advantage: Redundancy
- Disadvantage: 

## RAID5

## RAID10

## RAID50
