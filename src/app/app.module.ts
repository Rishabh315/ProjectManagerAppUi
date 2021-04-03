import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './user/signup/signup.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { RouterModule } from '@angular/router';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { EmployeePageComponent } from './user/employee-page/employee-page.component';
import { ManagerPageComponent } from './user/manager-page/manager-page.component';
import { DefaultPageComponent } from './task/default-page/default-page.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    UserHomeComponent,
    EditProfileComponent,
    EmployeePageComponent,
    ManagerPageComponent,
    DefaultPageComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

