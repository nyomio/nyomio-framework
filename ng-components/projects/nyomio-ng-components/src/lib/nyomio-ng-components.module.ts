import {NgModule} from '@angular/core';
import {NyomioNgComponentsLibComponent} from './nyomio-ng-components.component';
import {NyomTableComponent} from './nyom-table/nyom-table.component';
import {RevisionDateTimePickerComponent} from './revision-date-time-picker/revision-date-time-picker.component';
import {EntityEditorComponent} from './entity-editor/entity-editor.component';
import {EntityTableComponent} from './entity-table/entity-table.component';
import {EntityFormComponent} from './entity-form/entity-form.component';
import {MatIconModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {CovalentLayoutModule, CovalentLoadingModule, CovalentStepsModule} from '@covalent/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorComponent} from './error/error.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {OrganizationPageComponent} from './pages/organization-page/organization-page.component';

@NgModule({
  declarations: [
    NyomioNgComponentsLibComponent,
    NyomTableComponent,
    RevisionDateTimePickerComponent,
    EntityEditorComponent,
    EntityTableComponent,
    EntityFormComponent,
    ErrorComponent,
    UserPageComponent,
    OrganizationPageComponent,
  ],
  imports: [
    CovalentLayoutModule,
    CovalentStepsModule,
    BrowserModule,
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
    ReactiveFormsModule,
    FormsModule

  ],
  exports: [
    NyomioNgComponentsLibComponent,
    NyomTableComponent,
    EntityEditorComponent,
    EntityFormComponent,
    EntityTableComponent,
    RevisionDateTimePickerComponent,
    ErrorComponent,
    UserPageComponent,
    OrganizationPageComponent,
  ]
})
export class NyomioNgComponentsModule {
}
