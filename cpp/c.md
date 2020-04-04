# Clang Outline

# ToC

# Pointer

- `printf()`では`%p`
- `&`でアドレス、`*`で実体

```c
int i;
printf("%p", &i);
printf("%p", *&i);
```

- `int *p, *q, *r;` vs `int* p q r`

## 直接参照と間接参照

## 配列とポインタ

```c
int array[5];
int *p;

p = array;
// p = &array[0]と同義
```

## 関数ポインタ

- `void (*funcPtr)();`

## ポインタの足し算引き算

## ポインタのポインタ

```c
int a;
int *p;
p = &a;
int **pp;
pp = &p;
```

# 文字列

- `strlen`
- `strcpy`
- `strncpy`
- `strcat`
- `strncat`
- `strcmp`
- `strchr`
- `strstr`

## Escape

# 関数

## 引数

- 実引数
- 仮引数
- 引数をポインタにすべき場合
  - 関数の外部にある値を変更したい場合。その変数がグローバルでなくてもいける
  - 配列を引数にわたしたい場合

# 変数系

## `typedef`

- 既存の型に別名を与える
- 長い型名を扱いやすくするのが目的かと思われる。ポインタ、unsigned、構造体などが含まれる型名など
- `_t`をつけるのが typedef で定義した型の慣習

## `struct`

- 関数定義のできないクラス
  - 関連のある変数をまとめられるのが利点
- underscore で命名する慣習
- 定義の書式３通り
  - 構造体宣言時も変数宣言時も`struct`を記述
  - `typedef struct {}`で構造を定義し、変数宣言時は`struct`を省略
  - `typedef struct {} person_t`で構造を定義ししかも変数宣言も済ます
- 構造体の初期化
- 構造体のコピーや代入

## `union`

# 演算

## ビット論理積

## ビット論理和

## ビット排他的論理和

## ビット反転

## 左シフト演算

## 右シフト演算

# メソッド

## `sizeof`

# 制御文

## `if`

## `for`

## `switch`

## `while`

## `do while`

## 無限ループ

- while で
- for で
