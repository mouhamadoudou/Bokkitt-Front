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
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { LoadPaymentsComponent } from './load-payments/load-payments.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { TripComponent } from './trip/trip.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { DateInputComponent } from './component/date-input/date-input.component';

import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthGuard } from './guards/auth.guard';

import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nFr } from './class/ngb-datepicker-i18n-fr'; // Importer la classe de localisation

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

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { TimePickerComponent } from './component/time-picker/time-picker.component';
import { PriceSliderComponent } from './component/price-slider/price-slider.component';

import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { SuggestTrajectComponent } from './suggest-traject/suggest-traject.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    DashboardComponent,
    StudentsComponent,
    PaymentsComponent,
    LoadStudentsComponent,
    LoadPaymentsComponent,
    CardComponent,
    CardListComponent,
    TripComponent,
    ReservationComponent,
    AddTripComponent,
    DateInputComponent,
    TimePickerComponent,
    PriceSliderComponent,
    SuggestTrajectComponent,
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
    _MatSlideToggleRequiredValidatorModule
  ],
  providers: [
    AuthorizationGuard,
    AuthGuard,
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nFr },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
