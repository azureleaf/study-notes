# Golang

## ToC

- [Golang](#golang)
  - [ToC](#toc)
  - [Install to WSL](#install-to-wsl)
  - [Install VS Code extension](#install-vs-code-extension)

## Install to WSL

```sh
# Update the file name to the latest Go version
curl -O -J https://golang.org/dl/go1.15.6.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.15.6.linux-amd64.tar.gz
vim ~/.bashrc
export PATH=$PATH:/usr/local/go/bin # add this line
source ~/.bashrc
go --version
```

## Install VS Code extension

- 
