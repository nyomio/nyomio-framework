import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganizationPageComponent} from "./page/organization/organization-page/organization-page.component";
import {AuthGuard} from "./common/auth/auth.guard";
import {EntityEditorGuard} from "nyomio-ng-components";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "/company"
  },
  {
    component: OrganizationPageComponent,
    path: 'company',
    canActivate: [AuthGuard, EntityEditorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
