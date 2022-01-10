# Api

## 接口调用

默认通过 HTTP 状态码返回状态，业务层处理异常则可通过自定义 CODE 方式实现。

### 接口状态

- 200 访问成功
- 401 参数错误
- 403 鉴权失败
- 500 内部错误

### 业务状态

```js
{
  // 业务异常
  error: boolean;
  error_code: 200100 | 200200 | 200300;
  error_message: string;

  // 正常调用
  data: Object;
}
```

## OAuth

OAuth 认证相关接口，目前只实现 Github 认证。

### GET: /oauth

参数

- callbackUrl 如：http://127.0.0.1:7001

返回

```js
{
  data: {
    githubOAuthUrl: 'https://github.com/login/oauth/authorize?client_id=04675579503deb3524e5&redirect_uri=http://127.0.0.1:7001/oauth/github?callbackUrl=http://127.0.0.1:7001'
  }
}
```

### GET: /oauth/github

> 通过 Github OAuth 认证后，将在此请求 github 接口查询用户信息并存储到 User 表，之后用 User 信息返回 jwt token.

参数

- code
- callbackUrl

返回（302 跳转）

- http://127.0.0.1:7001?token=${token}


## User [WIP]

用户相关接口，完善中，兼容 v1 接口

### GET: /v2/user/show/:loginname

参数

- loginname

返回

```js
{
  data: {
    type: 'github',
    user: {},
    token: '${jwt_tokne}'
  }
}
```

## Auth [WIP]

认证接口，主要实现登录、注册等功能

### POST: /v2/auth/signin

### POST: /v2/auth/signup

