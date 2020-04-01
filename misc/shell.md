# shell

## ToC

- [shell](#shell)
  - [ToC](#toc)
  - [Repository](#repository)
  - [MISC](#misc)
  - [Files](#files)
  - [Archive](#archive)
  - [Text](#text)
  - [curl](#curl)
  - [wget](#wget)
  - [grep](#grep)
  - [Permission](#permission)
    - [How to see `ls -l mydir` results](#how-to-see-ls--l-mydir-results)
    - [`chmod`](#chmod)
    - [`chown`](#chown)
  - [Shell types](#shell-types)
  - [bash とは](#bash-%e3%81%a8%e3%81%af)
  - [Config](#config)
    - [.bashrc](#bashrc)
    - [.bash_profile](#bashprofile)
    - [Order of config file to be read on login shell](#order-of-config-file-to-be-read-on-login-shell)
  - [bash のなかまたち](#bash-%e3%81%ae%e3%81%aa%e3%81%8b%e3%81%be%e3%81%9f%e3%81%a1)
  - [Setup fish](#setup-fish)
    - [misc](#misc-1)

## Repository

- `sudo apt update`
- `sudo apt upgrade`
- `sudo apt purge blahblah`
- `sudo apt remove blahblah`
- `sudo apt autoremove`
- `grep ^ /etc/apt/sources.list /etc/apt/sources.list.d/*`
  - list packages
- `sudo apt-key list`
  - Last 8 Digits in the HEX numbers will be the key number for each package
- `sudo apt-key del 86E50310`
- `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
  - Add public key

## MISC

- ctrl + C
  - 現在実行中のコマンドを強制終了する
- `sudo su`
  - You can't do even `cd` in some dir, so you need this
- rsync
  - conditional copying / mirroring
  - ファイルのバックアップなどに活躍する
- ps
- top
- `pulseaudio -k && sudo alsa force-reload`
  - Ubuntu で音が出なくなった時の対処

## Files

- cd
- mv hello.txt ../src
- mv old.txt new.txt
- cp old.txt ../
- rm
- mkdir src
- rmdir
- `rm -rf node_modules`
  - `-f` is very dangerous; you can break your OS easily
- `rm -v !("hello.txt")`
  - Remove all files but hello.txt
- `rm -rf !(triangle|fractal)`
  - Remove all but specified files/directories
- ls
- `ls *.txt`
- `ls vue*`
- `ls -a`
  - show hidden files as well
- `ls -a | grep app`
- `whereis python3`
- `which python3`

## Archive

- `tar -zxvf yourfile.tar.gz`
  - eXtract, Verbose, Filename,
- `sudo tar -xzf jetbrains-toolbox-1.13.4801.tar.gz -C /opt`
  - "C"hange directory: set destination to decompress

## Text

- `touch hello.txt`
- `echo "hello" >> log.txt`
  - Append
- `echo "hello" > log.txt`
  - Overwrite

## curl

## wget

## grep

## Permission

- `chmod` stands for "Change Mode"
- `chown` stands for "Change Owner"

### How to see `ls -l mydir` results

- This command lists files with permission info
- `-rw-r--r-- 1 root root 209 Mar 30 17:41 printcap`
  - `-`
    - `-` for a file
    - `d` for a directory
  - `rw-`
    - Read, Write, Execute for the owner
  - `r--`
    - Read, Write, Execute for the group
  - `r--`
    - Read, Write, Execute for everybody else
  - `1`
    - number of links inside the dir
  - `root`
    - owner of the file / directory
  - `root`
    - group of the file / directory
  - `209`
    - size: bytes
  - `Mar 30 17:41`
    - last modification
  - `printcap`
    - file name

### `chmod`

- permission の指定方法は２つ
  - by numbers
  - by letters
- By Letters
  - `r`: Read
  - `w`: Write
  - `x`: Execute
  - `u`: User
  - `g`: Group
  - `o`: Others
  - `a`: All
- By Numbers
  - 4 points: read
  - 2 points: write
  - 1 points: execute
  - この和によって権限を実現する。おもしろい。
  - user, group, othersの順
  - 7: rwx
  - 6: rw
  - 5: rx
  - 4: r
  - 3: wx
  - 2: w
  - 1: x
- `chmod +x script.sh`
- `chmod -x script.sh`
- `chmod u+x script.sh`
- `chmod ugo-x script.sh`
  - これは`a`と同じだと思われる
- `chmod a-x script.sh`
- `chmod o-x script.sh`
- `chmod 750 script.sh`
- `chmod a=xwr,g-x,o-xw script.sh`
  - `=`はsetの意味
  - `+`や`-`が現状からの権限の差分しか指定できないのに対して、`=`はフルに設定するんだと思う
- `chmod -R 644 important-files/`
  - ディレクトリに対してやる場合
  - `-R`: recursive

### `chown`

## Shell types

All the shells are text-based.

- login shell
  - When you type username & password on the console, you're using login shell
  - When you use SSH on your computer, you're using login shell
- non-login shell
- interactive shell
  - いわゆる terminal や console はこれに該当する
- non-interactive shell

## bash とは

- CUI
- 非常に
- bash は「強く打つ」という意味

## Config

### .bashrc

- Executed for interactive non-login shell
- Will be read when you start new console
- Do `source ~/.bashrc` after change

### .bash_profile

- Executed for login shell
- Will be read when you login
- Setting per user

### Order of config file to be read on login shell

/etc/profile 以外は、省略可

1. /etc/profile
1. ~/.bash_profile
1. ~/.bash_login

- Will be ignored when ./bash_profile exists

1. ~/.profile

- Will be ignored when ./bash_profile exists

1. ~/.bashrc

- You need to `source ~/.bashrc` after change

1. ~/.bash_logout

## bash のなかまたち

- zsh
  - 次期 Mac のデフォルトになるという噂
  - oh-my-zsh
- fish
  - 一番高機能っぽい
  - oh-my-fish
- Command Prompt (cmd.exe)
  - Windows
  - bash とのコマンドの互換性はほとんどない（Windows のだめなところ）： `ls`じゃなくて`dir`とか
  - WSL を使ったらいいんじゃないか？
- powershell
  - Windows
  - cmd 向けコマンドに加えて、bash 系の機能も結構使える
  - ただ、なんだか起動が遅い

## Setup fish

1. `sudo apt install fish`
1. `chsh -s /usr/bin/fish`

### misc

- `echo $SHELL`
  - show curernt LOGIN shell
- `chsh -s /bin/bash`
  - recover to bash
- Config fish by GUI
  1. `fish_config`
  1. `fish_update_completions`
- Create config file
  1. `mkdir -p ~/.config/fish`
  1. `vim ~/.config/fish/config.fish`
