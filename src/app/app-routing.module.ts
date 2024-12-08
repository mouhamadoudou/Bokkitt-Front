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
import { Page404Component } from './page404/page404.component';
import { ClientMyTripComponent } from './User-infos/client-my-trip/client-my-trip.component';
import { ChangePasswordComponent } from './Forgot-Password/change-password/change-password.component';
import { CheckNumberComponent } from './check-number/check-number.component';
import { AuthGuardUserService } from './guards/auth-guard-user.service';

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


      // { path: "change-password", component: ChangePasswordComponent },

      {
        path: '',
        canActivate: [AuthGuardUserService], data: { profile: 'p-user' },
        children: [
          { path: "", component: HomeComponent },
          { path: "home", component: HomeComponent },
          { path: "trip/:id", component: TripComponent },
          { path: "suggest-traject", component: SuggestTrajectComponent },
        ]
      },

      {
        path: '',
        canActivate: [AuthGuardUserService], data: { profile: 'p-driver' },
        children: [
          { path: "add-trip", component: AddTripComponent },
        ]
      },

      // { path: "students", component: StudentsComponent },
      // { path: "payments", component: PaymentsComponent },
      // { path: "profile", component: ProfileComponent },

      // ---------------------DRIVER && PASSAGER LOGIN-----

      {
        path: "informations", component: DashboardComponent,
        canActivate: [AuthorizationGuard], data: { roles: ['DRIVER', 'USER'] }
      },

      { path: "change-password/:role", component: ChangePasswordComponent,
        canActivate: [AuthorizationGuard], data: { roles: ['DRIVER', 'USER'] }
      },

      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          { path: "login-client", component: LoginComponent },
          { path: "login-client/:id", component: LoginComponent },
          { path: "login-driver", component: ConnexionDriverComponent },
          { path: "choose-profile", component: ChooseTypeUserComponent },
          { path: "forgot-password/:role", component: ForgotPasswordComponent },
          { path: "verification/:number/:role", component: VerificationComponent },
          { path: "check-number/:number/:role", component: CheckNumberComponent },

        ]
      },
      // ---------------------DRIVER-----------------------
      {
        path: '',
        canActivate: [AuthorizationGuard],
        data: { roles: ['DRIVER'] },
        children: [
          { path: 'driver-dashboard', component: DriverDashboardComponent },
          { path: 'driver-ride-request', component: DriverRideRequestComponent },
          { path: "my-trip/:id", component: MyTripComponent },
          { path: "add-trip", component: AddTripComponent },

          // { path: "informations", component: DashboardComponent },
        ]
      },

      // ---------------------PASSAGER---------------------
      {
        path: '',
        canActivate: [AuthorizationGuard],
        data: { roles: ['USER'] },
        children: [
          { path: "reservation/:id", component: ReservationComponent },
          { path: "my-trip-client", component: ClientMyTripComponent },
          { path: "ride-request", component: RideRequestListComponent },
          // { path: "informations", component: DashboardComponent },
        ]
      },


      // ---------------------DRIVER && PASSAGER LOGIN-----

      // {
      //   path: "informations", component: DashboardComponent,
      //   canActivate: [AuthorizationGuard], data: { roles: ['DRIVER', 'USER'] }
      // },
      // {
      //   path: '',
      //   canActivate: [AuthorizationGuard],
      //   data: { roles: ['DRIVER', 'USER'] },
      //   children: [
      //     { path: "informations", component: DashboardComponent },
      //   ]
      // },




      { path: "**", component: Page404Component },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
