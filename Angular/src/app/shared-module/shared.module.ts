import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { ModalsComponent } from '../components/modals/modals.component';
import { IdleComponent } from '../components/idle/idle.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SnackbarComponent,
    ModalsComponent,
    IdleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgIdleKeepaliveModule.forRoot(),
  ],
  exports: [
    SnackbarComponent,
    IdleComponent,
    ModalsComponent,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    MomentModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    StorageServiceModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
