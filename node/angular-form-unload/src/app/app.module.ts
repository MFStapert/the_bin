import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { FormDirective } from './form/form.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, FormDirective],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
