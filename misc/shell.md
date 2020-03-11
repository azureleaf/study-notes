# shell

## ★★★

- cd
- mv hello.txt ../src
- mv old.txt new.txt
- cp old.txt ../
- rm 
- mkdir src
- rmdir
- rm -rf node_modules
  - `-f`コマンドはとても危険。Linuxの内部ファイルも簡単に削除されてしまう。なので、間違いがないよう実行前によく確認する
- `rm -v !("hello.txt")`
  - Remove all files but hello.txt
- ls
- ls *.txt
- ls vue*
- `ls -a`
  - show hidden files as well
- `ls -a | grep app`
- `sudo apt update`
- `sudo apt upgrade`
- ctrl + C
  - 現在実行中のコマンドを強制終了する

## ★★
- touch hello.txt

## ★

- rsync
  - conditional copying / mirroring 
  - ファイルのバックアップなどに活躍する
- mkdir -p hello/src
  - 階層を一気につくる
- ps
- top





## Shell types

All the shells are text-based.

- login shell
  - When you type username & password on the console, you're using login shell
  - When you use SSH on your computer, you're using login shell
- non-login shell
- interactive shell
  - いわゆるterminalやconsoleはこれに該当する
- non-interactive shell


## bashとは

- CUI
- 非常に
- bashは「強く打つ」という意味

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

/etc/profile以外は、省略可

1. /etc/profile
1. ~/.bash_profile 
1. ~/.bash_login 
  - Will be ignored when ./bash_profile exists
1. ~/.profile 
  - Will be ignored when ./bash_profile exists
1. ~/.bashrc 
  - You need to `source ~/.bashrc` after change

1. ~/.bash_logout 


## bashのなかまたち

- zsh
  - 次期Macのデフォルトになるという噂
  - oh-my-zsh
- fish
  - 一番高機能っぽい
  - oh-my-fish
- Command Prompt (cmd.exe)
  - Windows
  - bashとのコマンドの互換性はほとんどない（Windowsのだめなところ）： `ls`じゃなくて`dir`とか
  - WSLを使ったらいいんじゃないか？
- powershell
  - Windows
  - cmd向けコマンドに加えて、bash系の機能も結構使える
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
