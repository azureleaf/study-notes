# Windows Subsystem for Linux

## Refs

- https://www.atmarkit.co.jp/ait/articles/1903/18/news031.html


## Installation History

1. To install WSL-2, Activate the VM feature on your computer BIOS
1. Open Control Panel > `Turn Windows features on and off`
2. Tick `Windows Subsystem for Linux`
3. Reboot
4. Open Microsoft Store
5. Install `Ubuntu` (Better choose the Ubuntu app without LTS notations!)
6. Open `Ubuntu`
7. Set username & PW (Totally irrelevant to Windows username / PW)

## Set up WSL + VS Code + Git

- Troubleshooting: All the files marked as "modified"
- Solution:

```sh
git config core.autocrlf true
git config core.filemode false
```

- If the solution above is rejected by `operation not permitted` error, `vim .git/config` and change these values directly

### How this works

- Newlines
  - Windows: newline `CRLF`
  - Linux + Mac OS 10 (and newer): `LF`
  - Class Mac OS (to Mac OS 9, 2001): `CR`
- Behavoir of Git for Windows:
  - `core.autocrlf true`: Convert `LF` to `CRLF` on checkout, convert `CRLF` to `LF` on commit
  - `core.autocrlf input`: Convert `CRLF` to `LF` on commit
  - `core.autocrlf false` (default) do nothing
- `git config core.filemode false` disables the detection on file permission alternation.
  - Because file permission of the file edited in Linux can be different from that of Windows.


## Set up on VS Code + Python env

1. Install the necessary extensions in the VS Code
    - `Remote Development`
1. Open `cmd.exe`
2. `wsl`
3. `mv ~/repos/hello` Go to the repo dir
4. `code .`
    - This install the `VS Code Server` when it's the 1st run / when update is available
    - `WSL: Ubuntu` will be shown on the bottom-left of the VS Code
6. `sudo apt install python3-pip`
7. `pip3 install pipenv`
    - Don't install pipenv with `sudo apt install pipenv`! This brought the installation error on every `pipenv shell`
    - `sudo apt autoremove pipenv` to remove it.

### Ref on VS Code + WSL

- https://code.visualstudio.com/docs/remote/wsl

### Ref on VS code + Python

- I got the error msg of `Warning: Your Pipfile requires python_version 3.8, but you are using None (/bin/python).`
- Seemingly, I better go with Pyenv + Pipenv
- https://m2wasabi.hatenablog.com/entry/2019/10/22/193150
- https://qiita.com/npnpnp/items/29bdcc7985807d093620

## Command

On command prompt

```sh

wsl # Go into the WSL
wsl.exe -d Ubuntu # Specify the distro to start

wslconfig.exe /l # List the installed Linux distros

wsl -l -v # check if it's WSL 1 or 2
```

## Mounting

- `/mnt/c/Users/john/Documents`
  - Path to the Windows Doc folder (inside the WSL terminal)

## WSL + Docker

1. Ensure that WSL2 is activated in your Windows.
2. Install Docker Desktop for Windows.