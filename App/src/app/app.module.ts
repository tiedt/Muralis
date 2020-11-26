import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { FaleConoscoComponent } from './pages/fale-conosco/fale-conosco.component';
import { BrMaskerModule } from 'brmasker-ionic-3/dist/app.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    QuemSomosComponent,
    FaleConoscoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrMaskerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
