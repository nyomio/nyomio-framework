import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyPageComponent} from "./company/company-page/company-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "/company"
  },
  {
    component: CompanyPageComponent,
    path: 'company'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
