import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {CreatebeerComponent} from "./components/createbeer/createbeer.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChangepasswordComponent} from "./components/changepassword/changepassword.component";

const routes: Routes = [
  {path:"calculator",component:CalculatorComponent},
  {path:"brewingList",component:CreatebeerComponent},
  {path:"profile",component:ProfileComponent,children:[
    {path:"changepassword",component:ChangepasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
