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
  - [User & User Group of Linux](#user--user-group-of-linux)
    - [How to see `ls -l mydir` results](#how-to-see-ls--l-mydir-results)
    - [`chmod`](#chmod)
    - [`chown`](#chown)
  - [Shell types](#shell-types)
  - [bash とは](#bash-とは)
  - [Config](#config)
    - [.bashrc](#bashrc)
    - [.bash_profile](#bash_profile)
    - [Order of config file to be read on login shell](#order-of-config-file-to-be-read-on-login-shell)
  - [bash のなかまたち](#bash-のなかまたち)
  - [Setup fish](#setup-fish)
    - [misc](#misc-1)
- [Text Processing](#text-processing)
  - [`echo`](#echo)
  - [`cat`](#cat)
  - [`jq`](#jq)
  - [`awk`](#awk)
  - [Mutual Exclusion](#mutual-exclusion)
  - [Automaton](#automaton)
  - [`service` command](#service-command)
  - [File permission](#file-permission)
  - [User Group](#user-group)
    - [Primary Group vs Secondary Group](#primary-group-vs-secondary-group)
    - [bash](#bash)
    - [UID vs GID](#uid-vs-gid)
    - [ref.](#ref)
  - [chmod: ls -l](#chmod-ls--l)
    - [rwx](#rwx)
    - [`drwxr-xr-x`](#drwxr-xr-x)
  - [chmod: permission](#chmod-permission)
    - [Specify all the actions](#specify-all-the-actions)
    - [Specify one action](#specify-one-action)
  - [chmod: Use with find command](#chmod-use-with-find-command)
    - [Syntax](#syntax)
    - [Samples](#samples)
  - [chown](#chown-1)
  - [`xargs`](#xargs)

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
- ctrl + Shift + drag / drop
  - Create link to the file

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

```sh
ls -a | grep app
whereis python3
which python3

# Create the "link" (alias?) of the file.
# By creating the link, `cat d01` show the identical result with `cat test/data01.dat` 
ln test/data100.dat d01

stat Gemfile
stat -c %s Gemfile # file size
du -sh my_dir # directory size (du: Disk Usage)
du -h -d1 my_dir # show only the top-level directory
du -d1 | sort -n -r | head -n 6 # sort

# word count
wc hello.txt
```

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





## User & User Group of Linux

- An user can belong to multiple groups
- UPG: User private group (for Ubuntu, CentOS)
- Primary group
- Secondary group
- `/etc/passwd`
- `/etc/group`

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
  - user, group, others の順
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
  - `=`は set の意味
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

# Text Processing

## `echo`


## `cat`

## `jq`

- Text-format the JSON
- `$ echo '{"items":[{"item_id":1,"name":"すてきな雑貨","price":2500},{"item_id":2,"name":"格好いい置物","price":4500}]}' | jq '.items[].name'`
  - "すてきな雑貨"
  - "格好いい置物"`

## `awk`

```bash
# Show all the lines in the file
awk '{print}' employee.txt

# show the 1st & 4th columns only for every line
awk '{print $1,$4}' employee.txt 

# pattern matching: show the whole line with the keyword "manager"
awk '/manager/ {print}' employee.txt 

```



## Mutual Exclusion

>>>


## Automaton

>>>

## `service` command

- Used to start / stop / check services
- Then: wrapper for `/etc/init.d`, `initctl`
- Now:  wrapper for `/etc/init.d`, `initctl`, `systemctl`

>>>

## File permission

- chmod: Change mode (about permission)
- chown: Change owner
- chgrp: Change group

https://qiita.com/t-a-run/items/239ed690ece7a011804a


>>>

## User Group

### Primary Group vs Secondary Group

- Primary group (aka Login group)
  - Each user can belong to single primary group only
- Secondary Group (aka Supplementary Group)

### bash

- `$ groups`
- `$ groups john`

### UID vs GID

### ref.

- https://www.networkworld.com/article/3409781/mastering-user-groups-on-linux.html

>>>

## chmod: ls -l

### rwx

- `r` or `4`: readable
- `w` or `2`: writable
- `x` or `1`: executable
- Therefore `drwxr-xr-x` is equivalent to `755`

### `drwxr-xr-x`

1. `d`: this is a dir
2. `rwx`: **owner** can read, write, execute
3. `r-x`: **group** can read, execute
4. `r-x`: **others** can read, execute

>>>

## chmod: permission

### Specify all the actions

- `chmod 775 /var/www`
  - rwx (owner), rwx (group), rx (others)
- `chmod 664 /var/www`
  - rw (owner), rw (group), r (others)
- `chmod -R 775 /var`
  - Change for all the files in the dir **Recursively **
- `chmod 2775 /var/www`
  - Here "2" digit is for `setgid` (set group ID)


### Specify one action

- `u` User (owner)
- `g` Group
- `o` Other
- `a` All (user, group, other)
- `chmod g+x /var/www`
  - Add permission
- `chmod ugo-wx /var/www`
  - Revoke permission

>>>

## chmod: Use with find command

Find command takes "action" to execute the commands

### Syntax

- `{} +`

### Samples

- `find . -type f -exec chmod 600 {} +`
- `find . -type f | xargs chmod 600`
- `find /var/www -type d -exec sudo chmod 2775 {} \;`
- `find /var/www -type f -exec sudo chmod 0664 {} \;`



>>>

## chown

- `chown john /var/www`
- `chown john -R var`: All the files in the dir
- `chown john:staff /var/www`: Owner is john, group is staff

>>>

## `xargs`

- 
