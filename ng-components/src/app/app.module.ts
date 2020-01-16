import {CovalentLayoutModule} from '@covalent/core/layout';
import {CovalentStepsModule} from '@covalent/core/steps';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NyomioNgComponentsModule} from '../../projects/nyomio-ng-components/src/lib/nyomio-ng-components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NG_ENTITY_SERVICE_CONFIG} from '@datorama/akita-ng-entity-service';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {AkitaNgRouterStoreModule} from '@datorama/akita-ng-router-store';
import { EntityEditorDemo1Component } from './entity-editor-demo1/entity-editor-demo1.component';
import { EntityEditorDemo2Component } from './entity-editor-demo2/entity-editor-demo2.component';
import {HttpMockRequestInterceptor} from './mockdata/interceptor.mock';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { MapTestComponent } from './map-test/map-test.component';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    EntityEditorDemo1Component,
    EntityEditorDemo2Component,
    MapTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NyomioNgComponentsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: {baseUrl: 'https://jsonplaceholder.typicode.com'}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
