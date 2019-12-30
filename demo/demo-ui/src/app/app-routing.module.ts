import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationPageComponent} from './page/organization/organization-page.component';
import {AuthGuard} from './common/auth/auth.guard';
import {EntityEditorGuard} from 'nyomio-ng-components';
import {UserComponent} from './page/user/user.component';

export const ROUTES = {
  organizations: 'organizations',
  users: 'users',
};

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/' + ROUTES.organizations
  },
  {
    component: OrganizationPageComponent,
    path: ROUTES.organizations,
    canActivate: [AuthGuard, EntityEditorGuard]
  },
  {
    component: UserComponent,
    path: ROUTES.users,
    canActivate: [AuthGuard, EntityEditorGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
