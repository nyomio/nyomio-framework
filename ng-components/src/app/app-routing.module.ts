import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {EntityEditorDemo1Component} from "./entity-editor-demo1/entity-editor-demo1.component";
import {EntityEditorDemo2Component} from "./entity-editor-demo2/entity-editor-demo2.component";
import {EntityEditorGuard} from "../../projects/nyomio-ng-components/src/lib/entity-editor/entity-editor.guard";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "/entity-editor-demo1"
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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
