# Machine Learning (General)

- [Machine Learning (General)](#machine-learning-general)
- [Concepts](#concepts)
- [Activation Function](#activation-function)
- [Application Fields of ML](#application-fields-of-ml)
- [Autoencdoder](#autoencdoder)
- [Classification](#classification)
- [CNN](#cnn)
- [Boltzmann Machine](#boltzmann-machine)
- [Gradient Descent](#gradient-descent)
  - [Gradient Descent](#gradient-descent-1)
  - [SGD (Stochastic Gradient Descent)](#sgd-stochastic-gradient-descent)
- [Kalman Filter](#kalman-filter)
  - [non-linar kalman filter](#non-linar-kalman-filter)
- [Normalization](#normalization)
- [Over-fitting](#over-fitting)
- [Regression](#regression)
- [Regularization](#regularization)
- [Reinforcement Learning](#reinforcement-learning)
- [RNN](#rnn)
- [Reinforcement Learning](#reinforcement-learning-1)
- [Supervised vs Unsupervised](#supervised-vs-unsupervised)

# Concepts


- Swarm Intelligence
- ACO: Ant Colony Optimization
- Genetic Algorithm

- スパース同定
  - 膨大なビッグデータを解析して大量のデータに埋もれて見えにくくなってしまう有為な情報を抽出したり、法則性を導き出したりする計算手法
- 非線形力学同定

- Black box vs White box
  - 深層学習などの AI 手法では内在する物理法則の解析的記述とは関係のない関数の組み合わせでシステムの入出力を表現する中身の構造自体が意味を持たないブラックボックスとなるが、物理法則の解析的記述と連動する状態変数による構造に意味を持たせた表現をホワイトボックスと呼ぶ



- Clustering

- Regression
- Overfitting
- Adversary
- Attention
- Convolution
- Loss Function
- Backpropagation
- Normalization
- Curse of dimensionality
- Regularization

Layers of NN

- Input Layer
- Internal Layer / Hidden Layer
- Output Layer
  - シグモイドユニット
  - ソフトマックスユニット

Variables

x: Predictor Var. (予測変数)

- aka Explanatory Var. 説明変数

y: Response Var. (応答変数)

- aka Outcome Var 結果変数
- aka Target Var. 目的変数

# Activation Function

活性化関数

- 階段関数: 				今はほとんど用いられない
- Sigmoid 				あまり用いられない
- 双曲線正接関数(tanh)				あまり用いられない
- ハード双曲線正接関数 				あまり用いられない
- Rectified Linear function (正規化線形関数): Unit with rectifier is called ReLU (rectified linear unit)
	- Leaky ReLU
	- PReLU: parametric ReLU
	- ソフトプラス関数
	- maxout関数
- Softmax

# Application Fields of ML

- スパムメールフィルタ
- 広告
- ニュース推薦
- 異常検知
- 異常予測
- 手書き文字認識
- 顔認識
- 物体認識
- 自動運転
- 類似画像生成
- 画像切り抜き
- 音声認識
- 音声模写
- 翻訳

# Autoencdoder

- PCA: Primary Component Analysis
- PCA on 平坦な部分空間
- PCA on 多様体

- Hourglass-type Neural Network
- Autoencoder
- Encoder
- Decoder
- 次元削減 PCA, Autoencoder,
- SpAE: Sparse Autoencoder
- Reconstruction Error
- Kullback-Leibler Divergence 2 つの分布の間の近さを測る
- Distributed Representation
- スパース化された誤差逆伝播法
- Deep Autoencoder
- Greedy Layer-wise Training
- SAE: Stacked Autoencoder
- Pre-training
- 勾配消失問題
- プラトー
- DAE: Denising Autoencoder
- masking noise
- CAE: Contractive Autoencoder

# Classification

- Binary Classification
- Multi-class Classification


# CNN

- CNN: Convolutional Neural Network
- LeNet
- Fully Connected
- MNIST
- Convolutional Layer
- Filter
- Unshared Convolution
- Feature Map
- Factorizing Convolution
- Stride
- padding
- zero pading
- valid padding
- same padding
- full padding
- Pooling Layer
- Pooling
- Max Pooling
- Average Pooling
- Lp Pooling
- Stochastic Pooling
- LCN layer: Local Contrast Normalization Layer
- LRN Layer: Local Response Normalization Layer
- VGG
- Transfer Learning
- Deconvolution / Transposed Convolution
- Unpooling
- ILSVRC
- GoogLeNet
- Inception module
- RNN: Recurrent Neural Network
- RTRL: Real-Time Recurrent Learning
- Unroll
- BPTT: Backpropagation through time
- EBPTT: Epoch Wise BPTT
- gate
- LSTM: Long Short-Term Memory
- Memory Cell
- Peephole
- GRU: Gated Recurrent Unit
- Seq2Seq
- Neural Conversation Model

# Boltzmann Machine

- Boltzmann Machine
- Graphical Model
- Generatative Distribution
- Directed Graphical Model / Beyesian Network
- Belief Propagation
- Undirected Graphical Model / Markov Random Field
- Local Markov Property
- pairwise Markov Property
- Clique
- Hammersley クリフォードの定理
- Pairwise Markov Random Field
- Gibbs Boltzmann Distribution
- 分配関数
- Hidden Variable / Latent Variable
- Visible Variable
- Positive Phase
- Negative Pahse
- Learning Equation
- ヘルダーの不等式
- 勾配上昇法による反復求解法
- Combination Explosion
- MCMC: Markov Chain Monte Carlo Method
- Stochastic Process
- Homogenous Markov Chain
- Transition Probability
- Google Matrix
- Transition Probability Matrix
- Invariant Distribution / Equilibrium Distribution
- 詳細釣り合いの条件

# Gradient Descent

勾配降下法

## Gradient Descent

		ニューラルネットワークの学習である、損失関数の最小化である
			しかし、実用上は式が複雑すぎて解くことができない。
			このため、近似する
				しかし、実際にはニュートンラフソン法自体は深層学習ではほとんど用いられない
				途中で登場するヘッシアン逆行列の計算がとてつもなく計算コストがかかるので
			最小化問題：
				最小点では、すべての点において微分がゼロとなることを利用する
					このような点を臨界点という
		手法
			Newton Raphson Method
	勾配降下法
		損失関数の一階微分の情報だけを用いる

Disadvantages of Gradient Descent:

学習率が不適切で収束しない
  学習率が大きすぎる
  学習率が小さすぎる
  深い谷での振動
  プラトーでの停止
    勾配が消失してしまうため更新も止まる
  絶壁での反射
    学習率を一定ではなく、時間依存にするという工夫
      極小値に近づくにつれて、学習率も小さくしていく
      凸誤差関数上のSGDについて、収束を保証するηの条件が存在する
Local Minimumに陥りGlobal Minimumに達しない
  しかし、真の最小値をみつけなくても深層学習ではなんとかなってしまうらしい
    理由は謎
ニューラルネットワークには対称性があるので、無駄な探索をしてしまう

## SGD (Stochastic Gradient Descent)

確率的勾配降下法　

臨界点にトラップされてしまうことを防ぐため、ランダムな要素を取り入れる
ミニバッチ学習で充分である
  学習時間をepochという単位ごとに考える
  なぜミニバッチを使うのか？
    単純に計算量を減らすため
    特に、サンプル数が多くなると似たようなサンプルが多くなり飽和するので。
  ミニバッチは容易に並列化できるので、GPGPUがある場合にはそちらを使うべきである
    "General Purpose Computing on Graphics Processing Unit"
各時刻のミニバッチに一つのサンプルしか含まない場合をSGDという

# Kalman Filter

		Kalman Filter	複数の不確実な情報から、より正確な情報を推定する
- linear kalman filter
- non-linear Kalman filter


## non-linar kalman filter
		EKF: extended Kalman Filter	拡張カルマンフィルタ ロボットの自己位置推定によく使われてる
		unscented Kalman Filter 	無香カルマンフィルタ
		ensemble Kalman Filter
		Particle Filter, aka SMC: Sequential Monte Carlo
			SIR: Sampling Importance Resampling
				The bootstrap filter
				Sequential importance sampling
				“direct version” algorithm
		センサフュージョン	複数種類のセンサを組み合わせること
		Madgwick Filter
		カルマンスムーザー
		Odometry

時系列データと紛らわしいデータ
		時系列データ
		マーク付き点過程データ
		棒グラフ
		ヒストグラム

変動要因

- 傾向変動
- 循環変動
- 季節変動

others

- Skip-Gram model
- Continuous Bag-of-Word model (CBOW)
- 不規則変動
- cosine 類似度:  2つのベクトルがどれくらい同じ方向を向いているか調べる  ていうか、ただの内積の変形  ベクトル化した2つの文書間の類似度の指標とできる
- MA (moving average model) 移動平均法
- 将来予測の単純な手法
- 指数平滑法	現在に近いデータほど重要視し、過去に遡るほど重要度を落とす加重平均法を行う
- トレンド	時系列データの原因１
- 周期性	時系列データの原因２
- ホワイトノイズ	時系列データの原因３


library

- gensim
- GloVe
- Morphological Analysis
- TextRank
- LSA: latent semantic analysis, 潜在意味解析
- Doc2Vec
- MeCab
- Holt Winters
- extractive method
- ARMA(AR+MA) models
- SARIMAXモデル
- graph base method
- TextRank
- feature base method
- topic base method
- Box-Jenkins法
- abstractive method
- encoder-decoder model
- AR: Autoregressive models
- by ROUGE-N
- by BLEU
- 線形ガウス状態空間モデル（動的線形モデル）:  Appliable only to 線形ガウス data

# Normalization

正規化: Don't confuse with Regularization!

重み減衰



早期終了　early stopping



重み共有



データ拡張　data augmentation



bagging法（ensemble methodの一種）



ドロップアウト



深層表現のスパース化

- Batch Normalization
- Dropout

# Over-fitting

Error:

- Generalization Error (汎化誤差)
- Training Error (訓練誤差):

# Regression

  - Linear Regression
  - Non-linear Regression



# Regularization



Purpose: Prevent over-fitting



# Reinforcement Learning

Q学習 :			最適行動価値関数
Deep Q Learning: DQN: 			最適行動価値関数をCNNで近似する
RRL 再帰型強化学習:			最適化に遺伝的アルゴリズムを使っている例をみた

# RNN

RNN: Recurrent Neural Network	隠れ層に戻り値がある Recurrentは再帰的という意味である 一つ前の時間の値を使うが、その値は２つ前の時間の値の影響を含んでおり、さらにその値は３つ前の・・・なので再帰的  長時間データに対して勾配が消失する 長時間データに対して演算量が爆発する

時系列データ	動画、音声、文章など

Bidirectional RNN

RNN Encoder Decoder	RNNにSequence-to-Sequenceモデルを取り入れたもの
  入力も出力もシークエンスになっているモデル
  時系列データのように前後のつながりが意味があるとき、それを活かす

Attention 注意機構モデル

- Hard Attention
- Soft Attention

MemNN: Memory Networks
  記憶した知識から質問にふさわしい情報を取り出し、回答を生成するモデル。
  技術
    Temporal Encoding
      「記憶の知識の時刻と、質問時の時刻の差」の情報を組み込む
    Random Noise
      記憶の系列に 10% の確率で 0 ベクトルを挿入して時刻をずらすことで、Temporal Encoding が特定の訓練データに過適合するのを防ぐ。
    Position Encoding
    Linear Start
    勾配の切り詰め
  MemN2N
  end-to-endである
  2015
LSTM: Long Short-Term Memory
  性質
    CEC
    入力ゲート
    出力ゲート
    忘却ゲート
  利点
    RNNの長時間データの問題を解決した
GRU: gated recurrent unit
  性質
    リセットゲート
    更新ゲート
  利点
    LSTMよりも計算量が小さい
Boltzmann Machine
  DBM
  RBM: Restricted Boltzmann Machine
生成モデル
  教師データを学習し、それと同じような画像を生成する。
    GAN: Generative Adversarial Network
      Generator：生成器
        教師データのような画像を生成する
      Discriminator：識別器
        画像が教師データなのか、Generatorが作った偽物か見破る
    DCGAN: Deep Convolutional GAN
    VAE: Variational Autoencoder
misc for DL
  AutoEncoder
    訓練データなし
    次元削減
      エンコーダ
        入力データを低次元のzへ圧縮
      デコーダ
        入力データをzから復元
  DeCAF
  MENNDL
  GEMM: General Matrix Multiplication
  Concept network
    enhance efficiency of Reinforcement Learning
    conducted by the startup “Bonsai”
  Capsule networks, ( CapsNet)
    2017
  no-free-lunch theorem、NFLT
  逆誤差伝播法
    1986
    三層構造にした
      利点
        中間層の結合荷重を変えられる（パーセプトロンからの進歩）
      欠点
        層をどんどん増やしていくと、勾配消失
        過学習
  事前学習法
    autoencoder
        パーセプトロンの初期値を、オートエンコーダで予測する（事前学習）
        これにより、勾配消失が起こりにくくなる
      stacked autoencoder
      variational autoencoder
        従来のautoencoderは決定論的
        variational autoencoderは確率論的
      adversarial autoencoder
    RBM:Restricted Boltzmann Machine
      最終目標
        最尤推定
      Deep Boltzmann Machine
        RBMを多層にしたもの



# Reinforcement Learning

- Reinforcement Learning
- Q-learning
- SARSA (State–action–reward–state–action )
  - Markov Decision Process

# Supervised vs Unsupervised

Supervised Learning

- Classification (分類)
- Regression

Semi-supvervised Learning: Some are labeled, others are not.

Unsupervised Learning
