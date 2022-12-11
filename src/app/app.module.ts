import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { ArcaptchaAngularModule, ArcaptchaAngularComponent } from 'arcaptcha-angular';
import { ArcaptchaAngularModule } from '../../projects/arcaptcha-angular/src/lib/arcaptcha-angular.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ArcaptchaAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
