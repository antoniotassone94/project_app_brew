import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.module";
import {MainComponent} from "./components/main/main.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {BeermanagerComponent} from "./components/beermanager/beermanager.component";
import {CardComponent} from "./components/card/card.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChangepasswordComponent} from "./components/changepassword/changepassword.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {UploadavatarComponent} from "./components/uploadavatar/uploadavatar.component";
import {UpdateavatarimageService} from "./services/updateavatarimage.service";
import {AuthService} from "./services/auth.service";
import {HttprequestService} from "./services/httprequest.service";
import {ModalmessageComponent} from "./components/modalmessage/modalmessage.component";

@NgModule({
  declarations:[
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    CalculatorComponent,
    BeermanagerComponent,
    CardComponent,
    ProfileComponent,
    ChangepasswordComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    UploadavatarComponent,
    ModalmessageComponent
  ],
  imports:[
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers:[
    AuthService,
    HttprequestService,
    UpdateavatarimageService
  ],
  bootstrap:[MainComponent]
})

export class AppModule{}
