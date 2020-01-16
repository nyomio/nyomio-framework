import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EntityEditorDemo1Component} from './entity-editor-demo1/entity-editor-demo1.component';
import {EntityEditorDemo2Component} from './entity-editor-demo2/entity-editor-demo2.component';
import {EntityEditorGuard} from '../../projects/nyomio-ng-components/src/lib/entity-editor/entity-editor.guard';
import {OrganizationPageComponent} from '../../projects/nyomio-ng-components/src/lib/pages/organization-page/organization-page.component';
import {UserPageComponent} from '../../projects/nyomio-ng-components/src/lib/pages/user-page/user-page.component';
import {NyomioMapComponent} from '../../projects/nyomio-ng-components/src/lib/components/map-component/nyomio-map-component';
import {MapTestComponent} from './map-test/map-test.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/entity-editor-demo1'
  },
  {
    component: EntityEditorDemo1Component,
    path: 'entity-editor-demo1',
    canActivate: [EntityEditorGuard]
  },
  {
    component: EntityEditorDemo2Component,
    path: 'entity-editor-demo2',
    canActivate: [EntityEditorGuard]
  },
  {
    component: OrganizationPageComponent,
    path: 'organizations',
    canActivate: [EntityEditorGuard]
  },
  {
    component: UserPageComponent,
    path: 'users',
    canActivate: [EntityEditorGuard]
  },
  {
    component: MapTestComponent,
    path: 'map'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
