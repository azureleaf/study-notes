# bash

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
- ls
- ls *.txt
- ls vue*
- `ls -a | grep app`
- `sudo apt update`
- `sudo apt upgrade`

## ★★
- touch hello.txt

## ★

- rsync
  - conditional copying / mirroring 
  - ファイルのバックアップなどに活躍する
- mkdir -p hello/src
  - 階層を一気につくる

## bashとは

- CUI
- 非常に
- bashは「強く打つ」という意味

## Config

いずれもhome dir (~)に置く

- .bashrc
- .bash_profile


## bashのなかま

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