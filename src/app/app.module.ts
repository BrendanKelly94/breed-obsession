import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostingsComponent } from './components/postings/postings.component';

import {DataService} from './services/data.service';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'postings', component:PostingsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostingsComponent,
    NavbarComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
