## Steps to create an Angular library with Angular-Material theming

* create a multi-project workspace with an app and a library
```
ng new nyomio-frontend-components-parent
cd nyomio-frontend-components-parent
ng generate library nyomio-frontend-components
```
* create `public-api.ts`, which should export Angular modules, services and any other class. Note
that you don't have to export Angular components, only modules.
```
/*
 * Public API Surface of nyomio-ng-components
 */

export * from './lib/nyomio-ng-components.module';
export * from './lib/error/ui-error-service';
export * from './lib/entity-editor/entity-editor.service';
export * from './lib/entity-editor/entity-editor.model';
export * from './lib/entity-editor/entity-editor.store';
```
* use peerDependencies to define dependencies in `nyomio-frontend-components/package.json`
* setup material theming
  * create `nyomio-frontend-components/src/lib/nyomio-frontent-components-theme.scss` and include
  components which needed to be themed
    ```
    @import 'revision-date-time-picker/revision-date-time-picker-theme';

    @mixin nyomio-frontent-components-theme($theme, $config:null) {
      @include revision-date-time-picker-theme($theme);
    }
    ```
  * the `theme.scss` of you application has to include the library theme
    ```
    @import..
    @include nyomio-ng-components-theme($theme)
    ```
  * add `scss-bundle` to include theme scss files in the build
    * create nyomio-frontend-components/scss-bundle.config.json
      ```
      {
        "entry": "./projects/nyomio-ng-components/src/lib/src/nyomio-ng-components-theme.scss",
        "dest": "./dist/nyomio-ng-components/nyomio-ng-components-theme.scss",
        "includePaths": ["projects/shared-styles"]
      }
      ```
    * create a build command by adding this line to **parent** package.json
      ```
      "scripts": {
      ...
      "build:nyomio-frontend-components": "ng build nyomio-frontend-components && scss-bundle -c projects/nyomio-frontend-components/scss-bundle.config.json",
      ...
      }
      ``` 
* build and publish you library. Note that `ng build nyomio-frontend-components` isn't enough, it
wouldn't include additional theme scss files.
```
npm run build:nyomio-frontend-components 
cd dist/nyomio-frontend-components
npm publish // at first, you need to login using npm login
```

## Other
* fix import problems when using momentjs: enable esModuleInterop in **parent** tsconfig.json
```
"compilerOptions": {
  ...
  
  "esModuleInterop": true
}
```


## References
* https://angular.io/guide/creating-libraries
* https://material.angular.io/guide/theming-your-components
