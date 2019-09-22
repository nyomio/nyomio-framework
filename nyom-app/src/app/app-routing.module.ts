import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationPageComponent} from "./organization/organization-page/organization-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "/company"
  },
  {
    component: OrganizationPageComponent,
    path: 'company'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
