import { AuthInterceptorService } from './authInterceptorService';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { AlertComponent } from './alert/alert.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { BookMovieComponent } from './book-movie/book-movie.component';
import { TicketTableComponent } from './ticket-table/ticket-table.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    AlertComponent,

    AddMovieComponent,
     BookMovieComponent,
     TicketTableComponent,
     ForgetPasswordComponent,
     UpdateMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
