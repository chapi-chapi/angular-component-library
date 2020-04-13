# LoadingModule
This package provides a module that can be added to your angular module to intercept API calls and display a loading spinner on the page.

Simply add the following references:
```
import { LoadingModule } from '@chapichapi/ngx.loading';;
```

And then in the imports section:
```
LoadingModule.forRoot()
```

You can turn off the interceptor if you don't want http calls to automatically show the loader by specifying:
```
LoadingModule.forRoot(false)
```

Then place the loader component inside your app's HTML:

```
<chapichapi-loader></chapichapi-loader>
```
