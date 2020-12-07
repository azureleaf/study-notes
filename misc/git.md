# Learn Git


## ToC
- [Learn Git](#learn-git)
  - [ToC](#toc)
  - [Config](#config)
  - [Local](#local)
  - [Remote](#remote)
  - [Branch](#branch)
  - [Clarification](#clarification)
    - [`git fetch` vs `git pull`](#git-fetch-vs-git-pull)
    - [`git merge` vs `git rebase`](#git-merge-vs-git-rebase)
    - [CLONE vs FORK](#clone-vs-fork)
    - [MERGE REQUEST vs PULL REQUEST](#merge-request-vs-pull-request)
  - [Git レポジトリの付替え](#git-レポジトリの付替え)
  - [Troubleshooting](#troubleshooting)
    - [Trouble: GitLab で２段階認証を設定したらそれ以降の Git 動作が失敗する](#trouble-gitlab-で２段階認証を設定したらそれ以降の-git-動作が失敗する)
    - [Trouble: Permission denied (publickey) @ GitLab](#trouble-permission-denied-publickey--gitlab)
  - [Good Tutorials](#good-tutorials)
  - [Git 管理すると何がいいの？](#git-管理すると何がいいの)
  - [Keywords](#keywords)
    - [Pull Request / Merge Request](#pull-request--merge-request)
    - [Subversion (svn)](#subversion-svn)
    - [GitHub / GitLab / BitBucket](#github--gitlab--bitbucket)
    - [SourceTree](#sourcetree)
    - [CI/CD: Continuous Integration + Continuous Deployment （もしくは Continuous Delivery）](#cicd-continuous-integration--continuous-deployment-もしくは-continuous-delivery)
  - [Naming Branch](#naming-branch)
  - [Commit Message Format](#commit-message-format)

## Config

```sh
git config --list
git config --global credential.helper 'cache --timeout 3600'
git config credential.helper store # remote に push/pull するときに、パスワードやメールアドレスを毎度打たずに済むよう記憶する
git config --global --unset credential.helper # Forget stored credentials # You need to run this command when you changed your password
git config --global user.name "John Doe" # Git をインストールした直後に設定
git config --global user.email johndoe@example.com # Git をインストールした直後に設定

# for WSL
git config core.autocrlf true
git config core.filemode false
```

## Local

```sh
git add -A
git add -u # Stages only Modified Files
git add . # Stages everything, without Deleted Files
git reset -- hello.txt # Unstage hello.txt
git reset HEAD # Unstage all the files
git reset --hard 1234abcdblahblahblah
git reset --soft HEAD^ # 最後のコミットを取り消すが、ファイル内容はそのまま
git reset --hard HEAD^ # 最後のコミットを取り消し、なおかつローカルのファイル内容も戻す
git init
git commit -m "debug: Solve DB access error"
git status
git mv # Git 管理されているファイルを移動したり、名前を変更したりするときには必ずこれらを使う # **エクスプローラ上などで勝手に変更してはいけない！**　そのファイルの変更履歴が反映されなくなってしまう。
git rm # そのファイルを削除し、なおかつ git の index からも外す
git log -n 3
git revert HEAD~3
git stash
git stash list
git switch` (new)
git restore` (new)
git checkout . # Revert changes to the index
git checkout HEAD -- MyFile.js # Reset the specified file(s) to `HEAD
git checkcout HEAD myfile.js # Restore delete file which is not committed yet

# Remove the untracked files.
# Because git stash / revert / reset etc. won't remove the newly generated files,
# you need this command
git clean -f  # for untracked files
git clean -fd # for untracked directories
```

## Remote

```sh
git push origin master
git push <remote> <branch>という構造
git pull origin master
git pull --all
git clone http://blahblah.git
git clone --bare https://username@bitbucket.org/exampleuser/OLD_REPOSITORY.git
git remote rename origin gitlab
git remote add origin https://username@your.bitbucket.domain:7999/yourproject/repo.git # 新しい remote を追加（例：GitHub に上げてたリポジトリを、GitLab にも上げられるようにするとか）
git config --get remote.origin.url # Show the remote branch URL
git branch --set-upstream-to myfork/master # Set the default remote. Default remote is used for git status comparison
```

## Branch

```sh
# create
git branch
git branch -r
git branch -a # --all
git branch NEW_BRANCH_NAME

# checkout
git checkout BRANCH_NAME

# delete
git push origin --delete MyBranch # Delete the remote branch. Note that it's "push"
git branch -d MyBranch # Delete the merged local branch
git branch -D MyBranch # Delete the unmerged local branch

# rename
git branch -m NEW_BRANCH_NAME # rename current branch
git branch -m OLD_BRANCH_NAME NEW_BRANCH_NAME # rename the branch which you're not on
```

## Clarification

### `git fetch` vs `git pull`

- `git fetch origin master`
  - Similar to `git pull`
  - Fetching the latest changes in the remote, however, unlike `git pull`, **this doesn't merge remote branch to local files**. Therefore this doesn't update the files in the local.
  - In the local, you have:
    - `master`: Local master branch. **Not** updated by `git fetch`
    - `origin/master`: Remote master branch. Updated by `git fetch`
  - `git pull` = `git fetch` + `git merge`
- `git fetch --all`

### `git merge` vs `git rebase`

- `git merge`
  - merge すると不具合が出る可能性があるので、いきなり master に merge してはいけない
  - master 側をブランチ側にまず merge し、不具合がないことを確かめてから

- `git rebase -i origin master`
  - Similar to `git merge`
  - `git rebase` keep the commits on the branch while `git merge` doesn't
  - Therefore, in most cases, you better use `git rebase`
- `git checkout features/visualization` then `git rebase master`
  - Merging "features/visualization" branch to "master"

### CLONE vs FORK

### MERGE REQUEST vs PULL REQUEST

## Git レポジトリの付替え

1. `cd existing_repo`
1. `git remote rename origin old-origin`
1. `git remote add origin git@gitlab.com:mydevelopgroup/helloworldproj.git`
1. `git push -u origin --all`
1. `git push -u origin --tags`

Upstream Branch を変更するため、以下のコマンドが必要になる可能性がある

- `git branch --set-upstream-to origin/master`
  - VS Code の左下などの数字は、ここで設定した remote branch を基準にしているっぽい
  - なので、remote が複数ある場合にはこれを設定する必要がある
  - `git status`ででてくる`Your branch is up to date with 'origin/master'.`も恐らくこれが基準

## Troubleshooting

### Trouble: GitLab で２段階認証を設定したらそれ以降の Git 動作が失敗する

1. GitLab 上で Access Token を生成し、これをどこかに保存しとく
1. git clone する
1. email / account を聞かれたら、いつもどおり GitLab のアカウントを記入
1. password を聞かれたら、GitLab アカウントのパスワードではなく、さっき生成した Access Token を入力する

### Trouble: Permission denied (publickey) @ GitLab

- Error message:

  ```
  git@gitlab.com: Permission denied (publickey).
  fatal: Could not read from remote repository.

  Please make sure you have the correct access rights
  and the repository exists.
  ```

- Solution: SSH キーを設定する@Ubuntu

1. `ls -l ~/.ssh/id_*.pub`
1. `ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"`
   - ここのメールアドレスは、GitLab の認証のやつにする
1. 保存名の変更（default のままで可）
1. passphrase の入力（空欄でも可能）
1. `sudo apt install xclip`
   - If you don't have it in your computer
1. `xclip -sel clip < ~/.ssh/id_rsa.pub`
1. GitLab のウェブサイト上で登録
   - Setting -> SSH Keys -> Key に貼り付け
1. `ssh -T git@gitlab.com`
   - `Welcome to GitLab!`と表示されていれば、成功している

## Good Tutorials

- [サルでもわかる](https://backlog.com/ja/git-tutorial/)
- [Atlassian](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)
- [Git Rebase vs Git Merge](http://www-creators.com/archives/1943)

## Git 管理すると何がいいの？

- バージョンを管理できる
- 他人との共同作業がやりやすくなる
- クラウドサービスや遠隔などへコードを送信できる

## Keywords

### Pull Request / Merge Request

- 「僕の作ったブランチをチェックして、master などに統合してくれ」という要望
- 新人エンジニアなどが、ベテランに依頼する。ベテランはコードをレビューし、問題がなければマージする
- GitHub では pull request, GitLab では Merge Request と呼ばれているが同じもの

### Subversion (svn)

- git と同じような古いツール。だが、今は多くの企業で git に取って代わられた

### GitHub / GitLab / BitBucket

- クラウド上にコードを保存するサービス
- 外部に公開するか、内部専用なのか選べる。

### SourceTree

- git の履歴などを可視化するツール
- CUI ではなく、GUI を使ったコミットやマージそのほかもできる
- Windows と Mac に対応（Linux には対応せず...）

### CI/CD: Continuous Integration + Continuous Deployment （もしくは Continuous Delivery）

- CI: push されたコードについて、自動でテストを行う機能。
- テストのし忘れなど防ぎ、コードの品質を保てる
- テストして問題があれば、merge されない
- 有名なツールは「Circle CI」「Jenkins」「GitLab」など
- Continuous Deployment では、テストで問題なければ本番環境へのデプロイも自動で行う

## Naming Branch

## Commit Message Format
