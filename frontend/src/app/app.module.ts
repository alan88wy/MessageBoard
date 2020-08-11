import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebService } from './web.service';

import { MessagesComponent } from './messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http'
import { NewMessageComponent } from './new.messages.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';

let routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
  {
    path: 'messages/:name',
    component: MessagesComponent
  },
];
@NgModule({
  declarations: [
    AppComponent, MessagesComponent,
    NewMessageComponent, NavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [WebService,],
  bootstrap: [AppComponent],
})
export class AppModule { }
