# 解析学

## Terminology: Calculus

- Riemann integral
- Lebesgue integral

## Terminology: Fourier Transform

- Wavelet Transform

## Terminology: Differential Equation

- Laplace Transform
- ODE: Ordinary DE 常微分方程式
- PDE: Partial DE 偏微分方程式

## Functional Analysis

## MISC

- Jensen の不等式
- Gibbs の不等式（離散値）
- Gibbs の不等式（連続値）
- Markov の不等式
- Chernov 限界
- Chebyshev の不等式
- Minkovsky の不等式
- Holder の不等式
- 相加平均
- 相乗平均
- 調和平均
- 三角不等式
- Cauchy–Schwarz inequality
- ガンマ関数
- ベータ関数

## ２次形式

- ２次の項からのみなる数式
  - x^2 + 3xy + y^2
- ２次形式は行列の積で表現することができる
  - x^T A x
- εδ 論法
  - 関数の極限
- εN 論法
  - 数列の極限

## 範囲

- 上界
- 下界

## 級数

- 有限級数
- 無限級数
- べき級数

## 収束

- 絶対収束
- 無限収束
- 収束半径
- Spectral Radius スペクトル半径 ρ 複素正方行列や線形位相空間上の有界線形作用素の固有値の絶対値の最小上界
- ダランベールの比判定法
  - 収束半径・収束可否の求め方
- コーシーアダマールの方法
  - 収束半径・収束可否の求め方

## 微積分

- 極限による微分
- ロピタルの定理
- 連鎖率
- 全微分
  - x を変化させてから y を変化させるのと、y を変化させてから x を変化させるのとで結果が異なる場合には全微分できない
- 陰関数
  - F (x,y) = 0 が陰関数
  - y = F (x)の形が陽関数
  - 陰関数定理
  - 陰関数の微分
- Euler 微分
- Lagrange 微分
- Lie 微分
- C^n 級微分可能性
- C^∞ 級微分可能性
- 重積分の順序
- 部分積分
- リーマン積分
- ルベーグ積分
- 変分
  - 値を最小とする最適な関数を求める方法。 解析力学とかで頻出
- 最速降下法
  - 適当な 2 点をボールが最も早く転がり抜ける曲線はどのような式（関数）で与えられるか
- 微分
  - 関数の極値を求める
  - 変数を変化させる
  - 極値で微分がゼロになる
- 変分
  - 汎関数の極値を求める
  - 関数形を変化させる
  - 極値で変分がゼロになる
- 解法
  - オイラー方程式を解く
  - 直接法で解く
- 近似
  - テイラー展開
  - ランダウ記号
  - 多変数関数のテイラー展開
  - マクローリン展開
  - スターリングの公式
  - 漸近展開
  - エッジワース展開
  - エルミート多項式
  - コーニッシュ・フィッシャー展開

## 微分方程式

- Types
  - 常微分方程式
  - 偏微分方程式
  - 線形微分方程式
    - 斉次方程式
    - 非斉次
  - 非線形微分方程式
  - 確率微分方程式
    - ランジュバン方程式
    - ブラック-ショールズ方程式
- 解法
  - 定数変化法
  - 差分方程式
  - ラプラス変換
  - グリーン関数を用いる
  - 重み付き残差法
    - 微分方程式の境界値問題の近似解法 - 有限要素法でつかう
- 解
  - 一般解
  - 特殊解
  - 特異解
- 有名な微分方程式
  - リッカチの微分方程式
  - ベルヌーイの微分方程式
  - オイラーの微分方程式
  - ベッセルの微分方程式
    - ベッセル関数
  - エルミートの微分方程式
  - ルジャンドルの微分方程式
  - チェビシェフの微分方程式
  - ラゲールの微分方程式
  - クレローの微分方程式
  - 完全微分方程式
  - ローレンツ方程式
    - カオス的振る舞い
    - 連立常微分方程式（時間微分）
- 条件
  - 初期条件
  - 境界条件
  - ディリクレ境界条件
    - 境界上の値を規定する
  - Neumann Boundary Condition ノイマン境界条件
    - 境界上の性質を規定する

## 複素関数

- ローラン展開
- 留数定理
- コーシーの積分定理
- オイラー公式
- 複素微分
- 複素積分

## 記号

- ≡
  - 定義
- :=
  - 代入、の意味もある
- ⊕
  - 直和
- <a, b>
  - 内積
- a・b
  - 内積
- ||
  - double bar 双柱
  - ノルムにつかう
  - KL 情報量につかう
- ⊙
  - 要素ごとの積 element-wise multiplication
- s.t. (such that)
  - ∃n ∈ Z s.t. p’ = np
    - p’ = np となるような 整数 n が存在する。
  - ∀ε > 0, ∃δ > 0, s. t. (０＜ | ｘ－ａ | ＜ δ ⇒ | ｆ（ｘ）－ｃ | ＜ ε)
    - 任意の ε ＞０ に対し、ある δ ＞０ が存在して ０＜ | ｘ－ａ | ＜ δ ⇒ | ｆ（ｘ）－ｃ | ＜ ε となるとする．
- ∃
  - exist

## numerical_analysis

- 線形方程式の解法
  - Direct Method 　直接法
    - 幅広い用途に対応可能だが、メモリ消費や速度で反復法より劣る
  - Iterative Method 　反復法
    - 並列計算に適する 収束するかどうかは問題、境界条件に左右される 前処理が重要
  - Stationary Iterative Method 　定常法
    - 遅い
  - Nonstationary Iterative Method 　非定常法 aka Krylov 部分空間法
  - Gauss の消去法
    - Direct Method
  - 完全 LU 分解
    - Direct Method
  - SOR: Successive Overrelaxation Method
    - Stationary Iterative Method
  - Gauss-Seidel Method
    - Stationary Iterative Method
  - Jacobi Method
    - Stationary Iterative Method
  - CG: Conjugate Gradient 共役勾配法
    - Nonstationary Iterative Method
  - BiCGSTAB: Bi-Conjugate Gradient Stabilized
    - Nonstationary Iterative Method
  - GMRES: Generalized Minimal Residual
    - Nonstationary Iterative Method
- 数値微分
  - 前進差分近似
  - 後退差分近似
  - 中心差分近似
- 数値積分
  - 台形法
  - シンプソン法
- 常微分方程式の数値解法
  - Euler 法
  - Runge-Kutta 法
  - RK2
  - RK4
- Problems for Numerical Analysis
  - 一次元熱伝導方程式
