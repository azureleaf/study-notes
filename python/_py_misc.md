# Python Miscallaneous


## Famous libs

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

### ML


### Web

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
- `myvenv\Scripts\activate.bat`  (Windows)
- `exit`
- Ctrl + D


## `pip`

- `pip install -r requirements.txt`
- `pip freeze > requirements.txt`