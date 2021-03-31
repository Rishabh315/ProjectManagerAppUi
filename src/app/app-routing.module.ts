import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { UserHomeComponent } from './user/user-home/user-home.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent,
    children : [ 
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent }
    ]
},
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: 'userhome', component: UserHomeComponent,
    children: [
      { path: 'editProfile', component: EditProfileComponent}
    ]
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
