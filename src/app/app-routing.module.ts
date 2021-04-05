import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { WelcomePageComponent } from './project/welcome-page/welcome-page.component';
import { DefaultPageComponent } from './task/default-page/default-page.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { ViewAddTaskComponent } from './task/view-add-task/view-add-task.component';
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
      { path: 'managerPage', component: ManagerPageComponent,
        children: [
          { path: 'addProject', component: AddProjectComponent}, 
          { path: 'editProject', component: EditProjectComponent},
          { path: 'viewAddTask', component: ViewAddTaskComponent},
          { path: 'editTask', component: EditTaskComponent},
          { path: 'welcomeManager', component: WelcomePageComponent}
        ]
    }
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
