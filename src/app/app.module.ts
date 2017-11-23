import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { routing } from './app.routes';

import { customHttpProvider } from './injectables/helpers/index';
import { AlertComponent } from './components/alert/index';
import { AuthGuard } from './injectables/guards/index';
import { AlertService, AuthenticationService, UserService, SubjectService, CourseService, VersionService } from './services/index';
import { HomeComponent } from './components/home/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { ProfileComponent } from './components/profile/index';
import { CallComponent } from './components/call/call.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularMultiSelectModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RegisterComponent,
    CallComponent
  ],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    SubjectService,
    CourseService,
    VersionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
