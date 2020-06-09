# MockApi
This package provides a module that can be added to your angular module to intercept API calls and return mocked in-memory responses.

Simply add the following references:

```typescript
import { MockApiModule, IMockInterceptorData } from '@chapichapi/ngx-mock-api';
```

Create your mock api:

```typescript
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

```typescript
MockApiModule.forRoot(mockApi)
```

You can also pass an flag in to enable the interceptor only for certain environments:

```typescript
MockApiModule.forRoot(mockApi, environment.mock)
```

You can also simulate an api response delay by passing in a third argument:

```typescript
MockApiModule.forRoot(mockApi, environment.mock, 2000)
```

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Code scaffolding

Run `ng generate component component-name --project mock-api` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project mock-api`.
> Note: Don't forget to add `--project mock-api` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build mock-api` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build mock-api`, go to the dist folder `cd dist/mock-api` and run `npm publish`.

## Running unit tests

Run `ng test mock-api` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
