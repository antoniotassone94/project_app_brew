import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {MainComponent} from "./components/main/main.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {CreatebeerComponent} from "./components/createbeer/createbeer.component";
import {CardComponent} from "./components/card/card.component";

@NgModule({
  declarations:[
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    CalculatorComponent,
    CreatebeerComponent,
    CardComponent
  ],
  imports:[
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers:[],
  bootstrap:[MainComponent]
})

export class AppModule{}
