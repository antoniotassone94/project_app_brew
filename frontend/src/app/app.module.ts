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
import {BeerManagerComponent} from "./components/beermanager/beermanager.component";
import {CardComponent} from "./components/card/card.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ChangePasswordComponent} from "./components/changepassword/changepassword.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {UploadAvatarComponent} from "./components/uploadavatar/uploadavatar.component";
import {ModalMessageComponent} from "./components/modalmessage/modalmessage.component";
import {UpdateAvatarImageService} from "./services/updateavatarimage.service";
import {AuthService} from "./services/auth.service";
import {HttpRequestService} from "./services/httprequest.service";
import {DialogManagerService} from "./services/dialogmanager.service";

@NgModule({
  declarations:[
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    CalculatorComponent,
    BeerManagerComponent,
    CardComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    UploadAvatarComponent,
    ModalMessageComponent
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
    HttpRequestService,
    UpdateAvatarImageService,
    DialogManagerService
  ],
  bootstrap:[MainComponent]
})

export class AppModule{}
