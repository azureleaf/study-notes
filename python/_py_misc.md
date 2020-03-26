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

## `venv`

- `python3 -m venv /path/to/new/virtual/environment`
- `source myvenv/bin/activate` (Unix / MacOS)
- `myvenv\Scripts\activate.bat` (Windows)
- `exit`
- Ctrl + D

## `pipenv`

### `Pipfile`

- Equivalent to `package.json`
- You can register shorthands for commands:

```
[scripts]
start = "python main.py runserver"
test = "python -m unittest discover -v"
format = "autopep8 -ivr ."
lint = "flake8 --show-source ."
```
### `Pipfile.lock`

- Equivalent to `package-lock.json`

### Commands

- `pipenv --python 3`
  - Initialize with Python 3, generate `Pipfile`
- `pip3 install pipenv`
- `pipenv install numpy`
- `pipenv install --dev autopep8 flake8`
- `pipenv install`
  - Install from `Pipfile`
- `pipenv install --dev`
- `pipenv install numpy==1.14`
- `pipenv install -r ./requirements.txt`
- `pipenv shell`
  - Activate virtualenv
- `exit`
  - Deactivate virtual env
- `pipenv --rm`
  - Remove the virtual environemnt
- `pipenv --venv`
  - Return where the pipenv virtual environment is saved
- `pipenv update`
  - Update all the packages
- `pipenv graph`
  - Show dependencies of packages

## `pip`

- `pip install -r requirements.txt`
- `pip freeze > requirements.txt`
