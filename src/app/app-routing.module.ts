import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './Login-folder/login/login.component';
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
import { SuggestTrajectComponent } from './suggest-traject/suggest-traject.component'
import { DashboardComponent } from './User-infos/dashboard/dashboard.component'
import { MyTripComponent } from './User-infos/my-trip/my-trip.component';
import { ForgotPasswordComponent } from './Forgot-Password/forgot-password/forgot-password.component';
import { VerificationComponent } from './Forgot-Password/verification/verification.component';
import { RideRequestListComponent } from './ride-request-list/ride-request-list.component';
import { DriverDashboardComponent } from './Driver-page/driver-dashboard/driver-dashboard.component';
import { DriverRideRequestComponent } from './Driver-page/driver-ride-request/driver-ride-request.component'
import { ChooseTypeUserComponent } from './Login-folder/choose-type-user/choose-type-user.component';
import { ConnexionDriverComponent } from './Login-folder/connexion-driver/connexion-driver.component';

const routes: Routes = [


  // {path : "admin", component : AdminComponent, canActivate : [AuthGuard], children : [
  {
    path: "", component: HeaderComponent, children: [
      // {
      //   path: "", canActivate: [AuthGuard], children: [
      //     { path: "", component: DashboardComponent },
      //     { path: "Dashboard", component: DashboardComponent },

      //   ]
      // },
      // { path: "", component: ChooseTypeUserComponent },

      { path: "", component: HomeComponent },
      { path: "home", component: HomeComponent },
      { path: "trip", component: TripComponent },

      { path: "login-client", component: LoginComponent },
      { path: "login-driver", component: ConnexionDriverComponent },
      { path: "choose-profile", component: ChooseTypeUserComponent },

      { path: "profile", component: ProfileComponent },
      { path: "students", component: StudentsComponent },
      { path: "payments", component: PaymentsComponent },
      { path: "reservation", component: ReservationComponent },
      { path: "add-trip", component: AddTripComponent },
      { path: "suggest-traject", component: SuggestTrajectComponent },
      { path: "Dashboard", component: DashboardComponent },
      { path: "my-trip", component: MyTripComponent },
      { path: "forgot-password", component: ForgotPasswordComponent },
      { path: "verification", component: VerificationComponent },
      { path: "ride-request", component: RideRequestListComponent },
      { path: "informations", component: DashboardComponent },
      {
        path: "driver-dashboard", component: DriverDashboardComponent,
        canActivate: [AuthorizationGuard], data: { roles: ['DRIVER'] }
      },
      {
        path: "driver-ride-request", component: DriverRideRequestComponent,
        canActivate: [AuthorizationGuard], data: { roles: ['DRIVER'] }
      },

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
