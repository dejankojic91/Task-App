
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { AuthorisationService } from './authorisation/authorisation.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftNavbarComponent } from './left-navigation/left-navigation.component';
import { RegisterComponent } from './authorisation/register/register.component';
import { LoginComponent } from './authorisation/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsModule, BsDropdownModule  } from 'ngx-bootstrap';
import { AppService } from './app.service';
import { AuthGuard } from './shared/gards/auth-guard.service';
import { NotAuthGuard } from './shared/gards/notAuth-guard.service';
import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    FieldErrorDisplayComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LeftNavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    FlashMessagesModule.forRoot()
    
  ],
  providers: [
    AppService, 
    AuthGuard,
    NotAuthGuard,
    AuthorisationService, 
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
