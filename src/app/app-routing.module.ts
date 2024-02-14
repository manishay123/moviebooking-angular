import { AuthGuardGuard } from './auth-guard.guard';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { RoleGuardGuard } from './role-guard.guard';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { BookMovieComponent } from './book-movie/book-movie.component';
import { TicketTableComponent } from './ticket-table/ticket-table.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: "login", component: LoginComponent
  }, {
    path: "register", component: RegisterComponent
  },
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: "addMovie", component: AddMovieComponent, canActivate: [AuthGuardGuard, RoleGuardGuard]
  },
  {
    path: "updateMovie", component: UpdateMovieComponent, canActivate: [AuthGuardGuard, RoleGuardGuard]
  },
  {
    path: "bookTicket/:id", component: BookMovieComponent, canActivate: [AuthGuardGuard]
  },
  {
    path: "ticketTable", component: TicketTableComponent, canActivate: [AuthGuardGuard, RoleGuardGuard]
  },
  {
    path: "forgetPassword", component: ForgetPasswordComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
