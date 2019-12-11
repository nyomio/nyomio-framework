import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationPageComponent} from "./page/organization/organization-page/organization-page.component";
import {AuthGuard} from "./common/auth/auth.guard";
import {EntityEditorGuard} from "nyomio-ng-components";
import {UserComponent} from "./page/user/user.component";
import {DeviceComponent} from "./page/device/device.component";

export const ROUTES = {
  organizations: 'organizations',
  users: 'users',
  devices: 'devices',
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
  {
    component: DeviceComponent,
    path: ROUTES.devices,
    canActivate: [AuthGuard, EntityEditorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
