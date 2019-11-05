# NyomApp

The nyom microservices framework is an opinionated framework. It aims to provide a way to do all general things in a specific way.

Nyom-app is the Angular frontend app inside the Nyomio Framework Demo. It aims to demo all the opinionated parts of the 
framework that are related to the frontend.

There are a lot of little things that makes an app easy to use and easy to develop.

## Parts of the nyomio frontend worth mentioning

### Akita state management
[Akita](https://github.com/datorama/akita) aims to make the uni-directional frontend state management 
(mostly known as Flux and Redux) easy and fun to use. Nyomio frontend uses Akita extensively.

As a rule of thumb, all meaningful (**_TODO_**: needs definition) action performed by the user, or caused by data coming from the server
 must be reflected in a state change.
 
**Router state**: The router state is the state that is represented by the full URL path and parameters given to the browser's address bar.
**_TODO_**: we need some kind of a soft rule on what to put in the router state.

### Error handling
For error handling Akita's built-in error state should be used. `ErrorComponent` makes it easy to add error feedback on a page.
Just add
```html
<app-error [assignedQuery]="myQuery" [assignedService]="myService"></app-error>
```
to a page, and set [assignedQuery] and [assignedService] to the respective Akita query and store. 
The service must extend `UiErrorService`.

Also, in your http queries, if you would like errors to be shown, just add
```angular2
.pipe(handleHttpError(this.store))
```
before the subscribe call.

### Pages
Pages should be placed inside the page directory. Each page must have it's own component.
What logic should go to a page: **_TODO_**: we need some rules.

### Components
We need a soft rule to determine where a component should be placed. There are 3 possibilities
 - Inside the page's directory (if it is used only by that page)
 - Inside a common top level directory
 - To the "commons angular library" (code name 'nyommons') - there can be more than one common library if thematisation will make sense.
 there are none yet.
 
### Responsiveness
Pages must work optimized to tablet and phone mode. 
 
### Testing
Rules of thumb
 - TDD would be great, but it is really hard to do right (at least for me :) )
 - e2e tests for the main functionality with some edge cases are a must.
 - use unit test, where it makes sense (component is easier to develop against a test)
 
## Execute development server on kubernetes using skaffold
You can use google's scaffold tool to run angular dev server inside kubernetes.
First you need to [install skaffold](https://skaffold.dev/docs/install/).

The install script installs the production version. Before executing the development server
you have to delete the production deployment:
```
kubectl delete -f k8s/webapp.yml
```

Scaffold builds and deploys a container for nyom-app development. Also it monitors the changes and triggers recompile.
To execute scaffold:
```
cd nyom-app
scaffold dev
```
 
# Angular CLI-s generated docs with some modification
This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.3.

## Development server

Run `npm start` for a dev server. This will setup the proxy for communication with the backend.
Navigate to `http://app.nyomio.local:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Akita's `ng generate` templates can also be used in the project.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

TODO

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

TODO
