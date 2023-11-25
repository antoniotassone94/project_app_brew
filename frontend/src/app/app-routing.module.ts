import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {authGuardParent,authGuardChildren} from "./services/auth.guard";
import {BeerManagerComponent} from "./components/beermanager/beermanager.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {ChangePasswordComponent} from "./components/changepassword/changepassword.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UploadAvatarComponent} from "./components/uploadavatar/uploadavatar.component";

const routes:Routes = [
  {path:"",pathMatch:"full",component:HomepageComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[authGuardParent],canActivateChild:[authGuardChildren],children:[
    {path:"calculator",component:CalculatorComponent},
    {path:"brewingList",component:BeerManagerComponent},
    {path:"profile",component:ProfileComponent,canActivateChild:[authGuardChildren],children:[
      {path:"changepassword",component:ChangePasswordComponent},
      {path:"uploadavatar",component:UploadAvatarComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
