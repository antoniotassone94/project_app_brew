import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.module";

import {BeerManagerComponent} from "./components/beermanager/beermanager.component";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {CardComponent} from "./components/card/card.component";
import {ChangePasswordComponent} from "./components/changepassword/changepassword.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LoginComponent} from "./components/login/login.component";
import {MainComponent} from "./components/main/main.component";
import {ModalFormComponent} from "./components/modalform/modalform.component";
import {ModalMessageComponent} from "./components/modalmessage/modalmessage.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {RegisterComponent} from "./components/register/register.component";
import {UploadAvatarComponent} from "./components/uploadavatar/uploadavatar.component";

import {AuthService} from "./services/auth.service";
import {DialogManagerService} from "./services/dialogmanager.service";
import {HttpRequestService} from "./services/httprequest.service";
import {ResponsiveSidebarService} from "./services/responsivesidebar.service";
import {UpdateAvatarImageService} from "./services/updateavatarimage.service";
import {UpdateCardChangedService} from "./services/updatecardchanged.service";

@NgModule({
  declarations:[
    BeerManagerComponent,
    CalculatorComponent,
    CardComponent,
    ChangePasswordComponent,
    DashboardComponent,
    HomepageComponent,
    LoginComponent,
    MainComponent,
    ModalFormComponent,
    ModalMessageComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent,
    RegisterComponent,
    UploadAvatarComponent
  ],
  imports:[
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers:[
    AuthService,
    DialogManagerService,
    HttpRequestService,
    ResponsiveSidebarService,
    UpdateAvatarImageService,
    UpdateCardChangedService
  ],
  bootstrap:[MainComponent]
})

export class AppModule{}
