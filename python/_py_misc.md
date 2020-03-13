# Python Miscallaneous

## Famous Libraries

### ML

- Scikit-learn
- virtualenv
- TensorFlow
  - ちなみに javascript 版もあり
- Keras
  - Wrapper for TensorFlow, NTLK, Theano
- PyTorch
- OpenCV
- （名前は見かけるが死んでしまったライブラリ達）
  - Caffe2：かなりメジャーだったが、開発停止
  - Chainer: 日本製（Preferred Networks)だったが開発停止

### ML::NLP

- MeCab
  - For Japanese language
- NLTK
- TextBlob
- Stanford CoreNLP
- spaCy
- genSim

### Data Manipulation & Visualization

- Pandas
  - Dataframes
  - Good at data visualization as well
- Numpy
- Matplotlib
- seaborn
  - wrapper of matplotlib
- (Local installation) `sudo apt install python3-tk`
  - Required to show Matplotlib plot result

### Utitities

- urllib
- Selenium
- BeautifulSoup
- Django
- Flask

## Python3 vs Python 2

- Just use python 3

## Python installation

- Options:
  - Direct
  - Anaconda
  - Docker

## Virtual Environment Options

- venv
  - python3 built-in
  - can't switch the Python interpreter
  - formerly "pyvenv"; now pyvenv is deprecated
- virtualenv
  - Can switch Python interpreter
  - Can switch package
- pyenv-virtualenv
- pew
- conda
- pipenv
  - This is like pip + venv
  - Can switch package
  - Can install packages
- pyenv
  - Can switch python interpreter

### Venv

- `python3 -m venv /path/to/new/virtual/environment`
- `source myvenv/bin/activate` (Unix / MacOS)
- `myvenv\Scripts\activate.bat` (Windows)
- `exit`
- Ctrl + D

## `pip`

- `pip install -r requirements.txt`
- `pip freeze > requirements.txt`
