import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {CreatebeerComponent} from "./components/createbeer/createbeer.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChangepasswordComponent} from "./components/changepassword/changepassword.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"calculator",component:CalculatorComponent,canActivate:[AuthGuard]},
  {path:"brewingList",component:CreatebeerComponent,canActivate:[AuthGuard]},
  {path:"profile",component:ProfileComponent,children:[
    {path:"changepassword",component:ChangepasswordComponent}
  ],canActivate:[AuthGuard],canActivateChild:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
