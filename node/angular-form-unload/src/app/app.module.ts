import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HasFormChangedDirective } from './form/has-form-changed.directive';

@NgModule({
  declarations: [
    HasFormChangedDirective,
    AppComponent,
    HomeComponent,
    AboutComponent,
  ],
  exports: [HasFormChangedDirective],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
