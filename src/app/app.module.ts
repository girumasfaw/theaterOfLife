import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { AppMaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AreaComponent } from './components/area/area.component';
import { ActionComponent } from './components/action/action.component';
import { CheckerComponent } from './components/checker/checker.component';
import { AddAreaDialogComponent } from './components/add-area-dialog/add-area-dialog.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CreateActionDialogComponent } from './components/create-action-dialog/create-action-dialog.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/reducers/app.reducer';
import { DayComponent } from './components/day/day.component';


@NgModule({
  declarations: [
    AddAreaDialogComponent,
    AppComponent,
    ContainerComponent,
    AreaComponent,
    ActionComponent,
    CheckerComponent,
    CreateActionDialogComponent,
    DayComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  entryComponents:[AddAreaDialogComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
