import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { DefaultPageComponent } from './task/default-page/default-page.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { EmployeePageComponent } from './user/employee-page/employee-page.component';
import { LoginComponent } from './user/login/login.component';
import { ManagerPageComponent } from './user/manager-page/manager-page.component';
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
      { path: 'editProfile', component: EditProfileComponent},
      { path: 'empPage', component: EmployeePageComponent,
          children: [
            { path: 'welcome', component: DefaultPageComponent},
            { path: 'viewTask', component: ViewTaskComponent},
          ]
        },
      { path: 'managerPage', component: ManagerPageComponent}
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
