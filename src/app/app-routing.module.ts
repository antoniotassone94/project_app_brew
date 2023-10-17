import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {CreatebeerComponent} from "./components/createbeer/createbeer.component";

const routes: Routes = [
  {path:"calculator",component:CalculatorComponent},
  {path:"brewingList",component:CreatebeerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
