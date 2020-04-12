# MockApiModule
This package provides a module that can be added to your angular module to intercept API calls and return mocked in-memory responses.

Simply add the following references:
```
import { MockApiModule } from '@chapichapi/mock-api';
import { IMockInterceptorData } from '../../node_modules/@chapichapi/mock-api/IMockInterceptorData';
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
