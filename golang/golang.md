# Golang

## ToC

- [Golang](#golang)
  - [ToC](#toc)
  - [Installation](#installation)
    - [WSL](#wsl)
    - [VS Code extension](#vs-code-extension)
  - [Syntax](#syntax)

## Installation

### WSL

```sh
# Update the file name to the latest Go version
curl -O -J https://golang.org/dl/go1.15.6.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.15.6.linux-amd64.tar.gz
vim ~/.bashrc
export PATH=$PATH:/usr/local/go/bin # add this line
source ~/.bashrc
go --version
```

### VS Code extension


## Syntax

```go
package main

import "fmt"
import (
	"fmt"
	"math/rand"
)

func add(x, y int) int {
	return x + y
}
func swap(x, y string) (string, string) {
	return y, x
}

func main() {
}

fmt.Println("My favorite number is", rand.Intn(10))
fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
fmt.Println(add(42, 13))


a, b := 3, 4
var c, python, java bool
var c, python, java = true, false, "no!"
const (
	Big = 1 << 100
	Small = Big >> 99
)

float64(x*x + y*y)
uint(f)

const Pi = 3.14


//
// PACKAGES
//
math.pi
math.Sqrt(7)

rand.Intn(10) // math/rand
cmplx.Sqrt(-5 + 12i) // math/cmplx

```
