# Natural Language Processing: 自然言語処理

## Library

## Terminology

- BERT
- seq2seq
- word2vec

- 単語分割
- 文書分類
- 機械翻訳
- Syntactic Analysis 構文解析
- 自動要約
- 音声認識
- 意味解析
- 情報抽出
- 情報検索
- 辞書構築
- 著者推定
- 質問応答
- Corpus
  - Structured set of text
- Morpheme 形態素
- Co-occurence 共起
- Syntax
- Thesaurus
- Reference Resolution 照応解析
  - 代名詞や指示語の判別
- Word
- Syllable
- Mora 1 拍
- TF-IDF
  - Scale of feature
  - product of TF & IDF
  - The word with high TF (appears frequently), and high IDF (highly specific term) is good as feature
- TF: Time of Frequency
  - Occurence of the word / Number of all words
- IDF: Inverse Document Frequency
  - When the word is specific is characteristic, IDF is large = DF is small General words which appear in many docs won't be useful to get feature of the doc
- BOW: Bag of Words
  - Count the occurence in the doc Ignores the location of occurence
- Token Pattern of BOW
- One Hot Vector of BOW
  - Check if the certain word appeared or not
  - Ignores how often it appeared; only 1 (appeared) or 0 (not)
- Co-occurence Matrix
  - To make it dense, you can use: SVD, word2vec, GloVe
- Distributional Semantics
- LSA: Latent Semantic Analysis LSI: Latent Semantic Indexing
- Document-word Matrix
  - Row: Each Word
  - Col: A Document
  - Value: Weight calculated by occurence of the words in the doc (such as TF-IDF)
- GloVe: Global Vectors
- Count-based model in NLP
  - e.g. GloVe
- Predictive model in NLP
  - e.g. Word2Vec

## 文章を分割する手法

- Ngram
  - Cut the text by fixed number of characters
  - ほん　じつ　はせ　いて　んな　り
- Unigram
- Bigram
- Trigram
- Moerpheme Analysis Find meaning partition by dictionary & grammar
