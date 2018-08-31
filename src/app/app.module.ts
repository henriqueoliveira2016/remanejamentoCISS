import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpModule,  Http, XHRBackend, RequestOptions, JsonpModule } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask'
import { httpFactory } from './http.factory';
import { PessoaService } from '../services/pessoa.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    TextMaskModule,
    JsonpModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
