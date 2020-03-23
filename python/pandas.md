# Pandas

## Pandas vs Numpy vs Vanilla Python

- Data can be converted to each other

## Data Structure

- Series
    - Is dict-like
- df: DataFrame
- df2


## Key Expressions

```py
df.head()
df.tail(3)
df.index
df.columns
df.to_numpy()
df.describe()
df.T
df.sort_index(axis=1, ascending=False)
df.sort_values(by='B')
```


```py
df['A']
df[0:3]
df['20130102':'20130104']
df.loc[dates[0]]
df.loc[:, ['A', 'B']]
df.loc['20130102':'20130104', ['A', 'B']]
df.loc['20130102', ['A', 'B']]
df.loc[dates[0], 'A']
df.at[dates[0], 'A']
df.iloc[3]
df.iloc[3:5, 0:2]
df.iloc[[1, 2, 4], [0, 2]]
df.iloc[1:3, :]
df.iloc[:, 1:3]
df.iloc[1, 1]
df.iat[1, 1]

```

## Operations

```js
df.mean()
df.mean(1)

df.apply(np.cumsum)
df.apply(lambda x: x.max() - x.min())

```


## Output
```py
df.to_csv('foo.csv')

```