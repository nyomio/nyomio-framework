import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CovalentLayoutModule, CovalentLoadingModule, CovalentStepsModule} from "@covalent/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NG_ENTITY_SERVICE_CONFIG} from '@datorama/akita-ng-entity-service';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {AkitaNgRouterStoreModule} from '@datorama/akita-ng-router-store';
import {environment} from '../environments/environment';
import {OrganizationPageComponent} from './page/organization/organization-page/organization-page.component';
import {CovalentDynamicFormsModule} from "@covalent/dynamic-forms";
import {ErrorComponent} from "./common/error/error.componet";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {NyomTableComponent} from './common/nyom-table/nyom-table.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter"
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ReactiveFormsModule} from "@angular/forms";
import { RevisionDateTimePickerComponent } from './common/revision-date-time-picker/revision-date-time-picker.component';
import { EntityEditorComponent } from './common/entity-editor/entity-editor.component';
import { EntityTableComponent } from './common/entity-table/entity-table.component';
import { EntityFormComponent } from './common/entity-form/entity-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationPageComponent,
    ErrorComponent,
    NyomTableComponent,
    RevisionDateTimePickerComponent,
    EntityEditorComponent,
    EntityTableComponent,
    EntityFormComponent
  ],
  imports: [
    CovalentLayoutModule,
    CovalentStepsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    CovalentDynamicFormsModule,
    CovalentLoadingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{
    provide: NG_ENTITY_SERVICE_CONFIG,
    useValue: {baseUrl: 'https://jsonplaceholder.typicode.com'}
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
