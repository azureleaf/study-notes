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
df.head(5)
df.tail(3)
df.index
df.columns
df.to_numpy()
df.describe()
df.columns.values # Show headers only
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

## File I/O

```py
df.read_csv('foo.csv', encoding="shift-jis")
df.to_csv('bar.csv')

```

## Grouping

```py
# Create a df
df = pd.DataFrame({'A': ['foo', 'bar', 'foo', 'bar',
                         'foo', 'bar', 'foo', 'foo'],
                   'B': ['one', 'one', 'two', 'three',
                         'two', 'two', 'one', 'three']})

# Grouping
# By default, NaN is ignored as the group value
grouped = df.groupby('A')
grouped_double = df.groupby(['A', 'B'])

# Iteration within groups
for name, group in grouped:
  print(name)
  print(group)

# Specify the group by value
grouped.get_group('bar')

# New group
grouped_b = grouped["B"]

# Aggregation
grouped.aggregate(np.sum)


# 
df2 = pd.DataFrame({'X': ['B', 'B', 'A', 'A'], 'Y': [1, 2, 3, 4]})
df2.groupby(['X']).sum()

```

## Multiple Index

```py
import pandas as pd

matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
df = pd.DataFrame(matrix)
new_columns = [("japan", "tokyo"), ("japan", "osaka"), ("china", "beijing"), ("china", "shanghai")]
df.columns=pd.MultiIndex.from_tuples(new_columns)

df[("japan", "osaka")][1] # 6

```
