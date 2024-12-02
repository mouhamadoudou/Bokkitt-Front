import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './Login-folder/login/login.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { LoadPaymentsComponent } from './load-payments/load-payments.component';
import { TripComponent } from './trip/trip.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { DateInputComponent } from './component/date-input/date-input.component';

import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthGuard } from './guards/auth.guard';

import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { TimePickerComponent } from './component/time-picker/time-picker.component';
import { PriceSliderComponent } from './component/price-slider/price-slider.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { SuggestTrajectComponent } from './suggest-traject/suggest-traject.component';
import { DashboardComponent } from './User-infos/dashboard/dashboard.component';
import { PopupComponent } from './component/popup/popup.component';
import { NewPasswordComponent } from './component/new-password/new-password.component';
import { ProfileInfosComponent } from './User-infos/profile-infos/profile-infos.component';
import { ReservationListComponent } from './User-infos/reservation-list/reservation-list.component';
import { MyTripComponent } from './User-infos/my-trip/my-trip.component';
import { ForgotPasswordComponent } from './Forgot-Password/forgot-password/forgot-password.component';
import { VerificationComponent } from './Forgot-Password/verification/verification.component';
import { RideRequestListComponent } from './ride-request-list/ride-request-list.component';
import { DriverDashboardComponent } from './Driver-page/driver-dashboard/driver-dashboard.component';
import { DriverRideRequestComponent } from './Driver-page/driver-ride-request/driver-ride-request.component';
import { ChooseTypeUserComponent } from './Login-folder/choose-type-user/choose-type-user.component';
import { ConnexionDriverComponent } from './Login-folder/connexion-driver/connexion-driver.component';
import { LogDialogComponent } from './log-dialog/log-dialog.component';
import { Page404Component } from './page404/page404.component';
import { ClientMyTripComponent } from './User-infos/client-my-trip/client-my-trip.component';
import { ReservationClientComponent } from './User-infos/reservation-client/reservation-client.component';
import { InformationsClientComponent } from './User-infos/informations-client/informations-client.component';


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TimePickerHourComponent } from './component/time-picker-hour/time-picker-hour.component';
import { PushPopupComponent } from './component/push-popup/push-popup.component';
import { PopupGenericComponent } from './component/popup-generic/popup-generic.component';
import { ChangePasswordComponent } from './Forgot-Password/change-password/change-password.component';
import { CheckNumberComponent } from './check-number/check-number.component';


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    StudentsComponent,
    PaymentsComponent,
    LoadStudentsComponent,
    LoadPaymentsComponent,
    TripComponent,
    ReservationComponent,
    AddTripComponent,
    DateInputComponent,
    TimePickerComponent,
    PriceSliderComponent,
    SuggestTrajectComponent,
    DashboardComponent,
    PopupComponent,
    NewPasswordComponent,
    ProfileInfosComponent,
    ReservationListComponent,
    MyTripComponent,
    ForgotPasswordComponent,
    VerificationComponent,
    RideRequestListComponent,
    DriverDashboardComponent,
    DriverRideRequestComponent,
    ChooseTypeUserComponent,
    ConnexionDriverComponent,
    LogDialogComponent,
    Page404Component,
    ClientMyTripComponent,
    ReservationClientComponent,
    InformationsClientComponent,
    TimePickerHourComponent,
    PushPopupComponent,
    PopupGenericComponent,
    ChangePasswordComponent,
    CheckNumberComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDialogModule,
    _MatSlideToggleRequiredValidatorModule
  ],
  providers: [
    AuthorizationGuard,
    AuthGuard,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'fr-FR' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
