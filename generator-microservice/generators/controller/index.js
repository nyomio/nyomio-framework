let Generator = require('yeoman-generator');
let v = require('voca');

module.exports = class extends Generator {
  writing() {

    let context =
        {entityNameU1: v.capitalize(this.options.entityName), entityNameL1: v.decapitalize(this.options.entityName)};
    let basePath = 'src/main/kotlin/admin/'+ v.decapitalize(this.options.entityName)+'/';

    this.fs.copyTpl(
        this.templatePath('DbService.kt'),
        this.destinationPath(
            basePath + v.capitalize(this.options.entityName) + 'DbService.kt'),
        context
    );
    this.fs.copyTpl(
        this.templatePath('Controller.kt'),
        this.destinationPath(
            basePath + v.capitalize(this.options.entityName) + 'Controller.kt'),
        context
    );
  }

  end() {
    this.log("You have to add the generated table to the DbConfiguration of Application.kt.")
  }

  // The name `constructor` is important here
  constructor(args, opts) {
    super(args, opts);

    this.argument("entityName", {type: String, required: true});

  }
};

