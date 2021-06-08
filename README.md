# typescript-assignment

Requirement: 

实现一个 APIPOST localhost:3000/api/register该 API 会验证如下条件：

Username 是否符合要求：
- 只能以英文字母或下划线开头
- 只能包含英文字母，下划线或数字
Password 是否符合要求：
- 长度在 6 位以上
- 不能含有 3 位以上的连续数字
- 必须有大写字母，小写字母或数字中的两项

1. 不需要实现数据库操作，涉及到数据库的操作可以mock
2. 使用express 框架
3. 尽量提供类型定义


curl commands for testing:


- curl --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "testUser",
    "password": "11a11a11a11"
}'

- curl --request GET 'localhost:3000/users' \ 
--header 'Content-Type: application/json'  

- curl --request DELETE "localhost:3000/users/testUser" \                              
--header 'Content-Type: application/json'

- curl --request GET "localhost:3000/users/testUser" \                               
--header 'Content-Type: application/json'
