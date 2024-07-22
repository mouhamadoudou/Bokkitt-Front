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
import { AdminComponent } from './admin/admin.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthGuard } from './guards/auth.guard';
import { TripComponent } from './trip/trip.component'

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent },
  { path: "trip", component: TripComponent },


  // {path : "admin", component : AdminComponent, canActivate : [AuthGuard], children : [
  {
    path: "", component: AdminComponent,  children: [
      
      { path: "home", component: HomeComponent },

      { path: "profile", component: ProfileComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "students", component: StudentsComponent },
      { path: "payments", component: PaymentsComponent },



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
