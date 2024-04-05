# mduash

> 根据日常 Node.js 开发整理的一些需求，以便后续搭建脚手架

## 使用示例

### JWT

-   sign & verify

```js
import { JWT } from 'mduash'

const Jwt = new JWT('your-secret-key', '1h') // 盐值和有效期

// 要签发的数据
const payload = {
    username: 'user1',
    id: 1
}

// 签发 JWT
const token = Jwt.sign(payload)
console.log(token) // 输出签发的JWT字符串

// 要验证的 JWT 字符串
const tokenToVerify = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

// 验证 JWT
const verified = Jwt.verify(tokenToVerify)
console.log(verified) // 输出验证结果，如果是有效的 JWT，将返回解码后的数据
```

### MResponse

-   success & error

```js
import { MResponse } from 'mduash'

// 使用 MResponse 类
const response = new MResponse({
    defaultSuccessText: '操作成功',
    defaultErrorText: '操作失败'
})

// 返回成功响应
const successResponse = response.success({ data: '这里是数据' }, '数据获取成功')
console.log(successResponse) // {code: 0, msg: '数据获取成功', data: '这里是数据'}

// 返回失败响应
const errorResponse = response.error(new MError(1001, '未授权访问'))
console.log(errorResponse) // {code: 1001, msg: '未授权访问', data: null}
```

-   MResponse.getPageParams

```js
import { MResponse } from 'mduash'

// 获取分页参数（0是第一页）
const pageParams = MResponse.getPageParams({ pageSize: 10, pageIndex: 0 })
console.log(pageParams) // {limit: 10, offset: 0, order: {limit: 10, offset: 0}, getPageResult: Function... }

// 假设有以下数据和数据总数
const list = [{ id: 1 }, { id: 2 }, { id: 3 }]
const count = 30

// 使用 getPageResult 方法获取分页结果
const pageResult = pageParams.getPageResult(list, count)
console.log(pageResult) // {list: [...], count: 30, pageCount: 1, hasNext: false, hasPrev: false}
```

### MError

-   MError & MError.withMsg

```js
import { MError } from 'mduash'

const error = new MError(404, 'Not Found', 'NotFoundError')
console.log(error.code) // => 404
console.log(error.msg) // => 'Not Found'
console.log(error.name) // => 'NotFoundError'

const error = new MError(400, 'Bad Request', 'BadRequestError')
const newError = error.withMsg('Invalid input data')
console.log(newError.msg) // => 'BadRequestError:Invalid input data'
```

-   generatorMError

```js
import { generatorMError } from 'mduash'

const error = generatorMError(500, 'Internal Server Error')
console.log(error.code) // => 500
console.log(error.msg) // => 'Internal Server Error'
console.log(error.name) // => 'MError'
```

### Is

-   Is.isEmpty

```js
import { Is } from 'mduash'

// 检查字符串是否为空
const isEmptyString = Is.isEmpty(' ')
console.log(isEmptyString) // 输出：true

// 检查数组是否为空
const isEmptyArray = Is.isEmpty([])
console.log(isEmptyArray) // 输出：true

// 检查对象是否为空
const isEmptyObject = Is.isEmpty({})
console.log(isEmptyObject) // 输出：true
```

### Gen

-   guid

```js
import { Is } from 'mduash'

// 检查字符串是否为空
const isEmptyString = Is.isEmpty(' ')
console.log(isEmptyString) // 输出：true

// 检查数组是否为空
const isEmptyArray = Is.isEmpty([])
console.log(isEmptyArray) // 输出：true

// 检查对象是否为空
const isEmptyObject = Is.isEmpty({})
console.log(isEmptyObject) // 输出：true
```

### Validate

-   validateParam

```js
import { Validate } from 'mduash'

// 验证邮箱地址
const isValidEmail = Validate.validateParam('example@example.com', 'email')
console.log(isValidEmail) // 输出：true

// 验证电话号码
const isValidPhone = Validate.validateParam('13812345678', 'phone')
console.log(isValidPhone) // 输出：true
```
