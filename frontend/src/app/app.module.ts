import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http'
import { NewMessageComponent } from './new.messages.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebService } from './web.service';
import { MessagesComponent } from './messages.component';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { UserComponent } from './user.component';


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
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
];
@NgModule({
  declarations: [
    AppComponent, MessagesComponent,
    NewMessageComponent, NavComponent,
    HomeComponent, RegisterComponent,
    LoginComponent, UserComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule,
    MatButtonModule, MatCardModule, MatFormFieldModule,
    MatInputModule,
    FormsModule, ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  providers: [WebService, AuthService,],
  bootstrap: [AppComponent],
})
export class AppModule { }
