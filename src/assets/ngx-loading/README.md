# NgxLoading
This package provides a module that can be added to your angular module to intercept API calls and display a loading spinner on the page.

Simply add the following references:

```ts
import { LoadingModule } from '@chapichapi/ngx.loading';
```

And then in the imports section:

```ts
LoadingModule.forRoot()
```

You can turn off the interceptor if you don't want http calls to automatically show the loader by specifying:

```ts
LoadingModule.forRoot(false)
```

Then place the loader component inside your app's HTML:

```html
<chapichapi-loader></chapichapi-loader>
```

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Code scaffolding

Run `ng generate component component-name --project ngx-loading` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngx-loading`.
> Note: Don't forget to add `--project ngx-loading` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ngx-loading` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-loading`, go to the dist folder `cd dist/ngx-loading` and run `npm publish`.

## Running unit tests

Run `ng test ngx-loading` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
