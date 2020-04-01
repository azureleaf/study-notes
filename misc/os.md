# Operation System


## ToC

- [Operation System](#operation-system)
  - [ToC](#toc)
  - [Kernel Achitecture](#kernel-achitecture)
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


## Kernel Achitecture

1. Shell
1. System Call
  - Request the service from the OS kernel
  
1. Kernel
  - Core programs of the OS
  - Offer the same environment on the various hardwares
1. Hardware


- Shell is the interface to run the kernel program
- 


## Process & Thread

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