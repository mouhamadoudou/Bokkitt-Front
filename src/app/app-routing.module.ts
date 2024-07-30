import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { LoadPaymentsComponent } from './load-payments/load-payments.component';
import { HeaderComponent } from './header/header.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthGuard } from './guards/auth.guard';
import { TripComponent } from './trip/trip.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddTripComponent } from './add-trip/add-trip.component';

const routes: Routes = [


  // {path : "admin", component : AdminComponent, canActivate : [AuthGuard], children : [
  {
    path: "", component: HeaderComponent,  children: [
      { path: "", component: HomeComponent },
      { path: "home", component: HomeComponent },
      { path: "trip", component: TripComponent },
      { path: "login", component: LoginComponent },
      { path: "profile", component: ProfileComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "students", component: StudentsComponent },
      { path: "payments", component: PaymentsComponent },
      { path: "reservation", component: ReservationComponent },
      { path: "add-trip", component: AddTripComponent },



      {
        path: "load-students", component: LoadStudentsComponent, canActivate: [AuthorizationGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: "load-payments", component: LoadPaymentsComponent, canActivate: [AuthorizationGuard],
        data: { roles: ['ADMIN'] }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
