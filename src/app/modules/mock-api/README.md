# MockApiModule
This package provides a module that can be added to your angular module to intercept API calls and return mocked in-memory responses.

Simply add the following references:
```
import { MockApiModule, IMockInterceptorData } from '@chapichapi/ngx.mock-api';
```

Create your mock api:
```
const mockApi : IMockInterceptorData[] = [
  {
    url: '/api/contacts',
    httpVerb: "GET",
    data: [
      {
        firstName: 'John',
        surname: 'Foooooo'
      }
    ]
  }
]
```

And then add the MockApiModule to your module `imports`:
```
MockApiModule.forRoot(mockApi)
```

You can also pass an flag in to enable the interceptor only for certain environments:


```
MockApiModule.forRoot(mockApi, environment.mock)
```

You can also simulate an api response delay by passing in a third argument:

```
MockApiModule.forRoot(mockApi, environment.mock, 2000)
```
