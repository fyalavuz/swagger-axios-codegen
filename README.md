# swagger-axios-codegen-es6
A swagger client uses axios and es6

￼[![NpmVersion](https://img.shields.io/npm/v/swagger-axios-codegen.svg)](https://www.npmjs.com/package/swagger-axios-codegen)
￼[![npm](https://img.shields.io/npm/dm/swagger-axios-codegen.svg)](https://www.npmjs.com/package/swagger-axios-codegen)
[![Build Status](https://dev.azure.com/manweill/swagger-axios-codegen/_apis/build/status/Manweill.swagger-axios-codegen?branchName=master)](https://dev.azure.com/manweill/swagger-axios-codegen/_build/latest?definitionId=1&branchName=master)
[![open issues](https://img.shields.io/github/issues-raw/manweill/swagger-axios-codegen.svg)](https://img.shields.io/github/issues-raw/manweill/swagger-axios-codegen.svg)

require node > v8.0.0

it will always resolve `axios.response.data` or reject `axios.error` with Promise

support other similar to `axios` library, for example [Fly.js](https://github.com/wendux/fly), required setting `ISwaggerOptions.useCustomerRequestInstance = true`

## [Example](./example)

## [ChangeLog](./CHANGELOG.md)

## Get Started

```
  yarn add swagger-axios-codegen
```

```js

export interface ISwaggerOptions {
  serviceNameSuffix?: string
  enumNamePrefix?: string
  methodNameMode?: 'operationId' | 'path'
  outputDir?: string
  fileName?: string
  remoteUrl?: string
  source?: any
  useStaticMethod?: boolean | undefined
  useCustomerRequestInstance?: boolean | undefined
  include?: Array<string | IInclude>
  format?: (s: string) => string
}

const defaultOptions: ISwaggerOptions = {
  serviceNameSuffix: 'Service',
  enumNamePrefix: 'Enum',
  methodNameMode: 'operationId',
  outputDir: './service',
  fileName: 'index.ts',
  useStaticMethod: true,
  useCustomerRequestInstance: false,
  include: []
}

```

### use local swagger api json

```js 

const { codegen } = require('swagger-axios-codegen')
codegen({
  methodNameMode: 'operationId',
  source:require('./swagger.json')
})


```

### use remote swagger api json
```js 

const { codegen } = require('swagger-axios-codegen')
codegen({
  methodNameMode: 'operationId',
  remoteUrl:'You remote Url'
})


```

### use static method

```js
codegen({
    methodNameMode: 'operationId',
    remoteUrl: 'http://localhost:22742/swagger/v1/swagger.json',
    outputDir: '.',
    useStaticMethod:true
});

```

before


```js

import { UserService } from './service'
const userService = new UserService()
await userService.GetAll();

```

after

```js

import { UserService } from './service'

await UserService.GetAll();

```


### use custom axios.instance

Create a service/index.js than export your generated service file with custom axios instance

```js
//services/index.js
import axios from 'axios'
import { ProductService } from './generated/Product'

const getAxiosInstance = serviceKey => {
  return axios.create({
    baseURL: process.env[`API_END_POINT_${serviceKey}`],
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
  });
};

ProductService.axios = getAxiosInstance('PRODUCT');

export { ProductService };


```

### use other library

```js
import YourLib from '<Your lib>'
import { serviceOptions } from './service'

serviceOptions.axios = YourLib

```

### filter service and method 

```js

let include = [
  'Products', // tagName
  'Estimates',//tagName
  { 'User': ['history'] }
]
codegen({
  methodNameMode: 'path',
  source: require('../swagger.json'),
  outputDir: './swagger/services',
  include
})

```

Welcome PRs and commit issue

⭐⭐⭐⭐⭐
