import {
  Rule, Tree, SchematicsException,
  apply, url, applyTemplates, move,
  chain, mergeWith
} from '@angular-devkit/schematics';

import {strings, normalize, experimental} from '@angular-devkit/core';

import {Schema as MyServiceSchema} from './schema';

export function generate(options: MyServiceSchema): Rule {
  return (tree: Tree) => {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    // convert workspace to string
    const workspaceContent = workspaceConfig.toString();

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);
    if (!options.project) {
      options.project = workspace.defaultProject;
    }
    const projectName = options.project as string;

    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';
    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    let nyomioNgComponentsBasePath = 'nyomio-ng-components';
    let nyomioNgComponentsPath = 'nyomio-ng-components';
    if (projectName === 'nyomio-ng-components-parent') {
      nyomioNgComponentsBasePath = '../../../../projects/nyomio-ng-components/src';
      nyomioNgComponentsPath = '../../../../projects/nyomio-ng-components/src/public-api';
    }
  const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        decapitalize: decapitalize,
        nyomioNgComponentsPath: nyomioNgComponentsPath,
        nyomioNgComponentsBasePath: nyomioNgComponentsBasePath,
        name: options.name
      }),
      move(normalize(options.path as string))
    ]);
    return chain([mergeWith(templateSource)]);
  };
}

function decapitalize (s: string) {
  return s.charAt(0).toLowerCase() + s.substring(1);
}
