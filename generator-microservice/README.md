# generator-microservice
yeoman generator to generate DbService and Controller for entities. 

## Prerequisites
* install yeoman as a global node module
```
npm install -g yo
```

## usage
* link generator as a global node module. After that you can use the generator in any project.
```
npm link
```

* controller subcommand generates both DbService and Controller. You can execute it from anywhere within
your project, it will determine the project root by finding `.yo-rc.json` in the parent directories of
the execution directory.

```
yo nyomio-microservice:controller enityName
```
