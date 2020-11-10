
# Gaming

>>>

## Data format used for server-client comm.

- Returns HTML
- Returns JSON

>>>

## MISC

- DAU: Daily Active Users
- Communication Protocol
- HTTP
- Concurrent Access (同時アクセス数)
  - like 10k - 100k, for example

>>>

## Maintenance

- 定期メンテナンス
- 緊急メンテナンス
- 無停止メンテナンス

>>>

## Frequent Fault: Data Inconsistency

- Happens due to the many concurrent accesses to the DB

### Solution

- Lock the DB
  - However, the range of lock must be minimum, or other users will suffer from slow performance

>>>

## Frequent Fault: High Load to the server

### Solution

- Don't forget to use INDEX on the DB
- Integrate multiple SELECT queries into one

>>>

## Frequent Fault: DB size gets enormous

### Solution

- Don't save the unnecessary logs