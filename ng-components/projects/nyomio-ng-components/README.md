# NyomioNgComponents

Angular components like table, form, map.

## Getting started
* `npm install --save nyomio-ng-components`
* import `NyomioNgComponentsModule` in your app's `app.module.ts`
* setup themes by editing your app's theme.scss 
  ```
  @import '~nyomio-ng-components/nyomio-ng-components-theme';
  ...
  $theme: mat-light-theme($primary, $accent, $warn);
  @include nyomio-ng-components-theme($theme);
  ```

## Code scaffolding

* `ng generate nyomio-ng-components:entity-editor --name EntityName`

Run `ng generate component component-name --project nyomio-ng-components` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project nyomio-ng-components`.
> Note: Don't forget to add `--project nyomio-ng-components` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `npm run build:nyomio-ng-components` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with, go to the dist folder `cd dist/nyomio-ng-components` and run `npm publish`.

## Running unit tests

Run `ng test nyomio-ng-components` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
