import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MainComponent} from "./components/main/main.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {CreatebeerComponent} from "./components/createbeer/createbeer.component";
import {CardComponent} from "./components/card/card.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChangepasswordComponent} from "./components/changepassword/changepassword.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomepageComponent} from "./components/homepage/homepage.component";

@NgModule({
  declarations:[
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    CalculatorComponent,
    CreatebeerComponent,
    CardComponent,
    ProfileComponent,
    ChangepasswordComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent
  ],
  imports:[
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[],
  bootstrap:[MainComponent]
})

export class AppModule{}
