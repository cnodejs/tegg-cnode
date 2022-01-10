# Api

## OAuth

OAuth 认证相关接口，目前只实现 Github 认证。

### GET: /oauth

参数

- callbackUrl 如：http://127.0.0.1:7001

返回

```json
{
  "data": {
    "githubOAuthUrl": "https://github.com/login/oauth/authorize?client_id=04675579503deb3524e5&redirect_uri=http://127.0.0.1:7001/oauth/github?callbackUrl=http://127.0.0.1:7001"
  }
}
```

### GET: /oauth/github

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

```json
{
  "data": {
    "user": {

    }
  }
}
```

## Auth [WIP]

认证接口，主要实现登录、注册等功能

### POST: /v2/auth/signin

### POST: /v2/auth/signup

