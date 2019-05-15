import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { ActivityService } from './shared/services/Activity.service';
import { GeneralMethodsService } from './shared/services/GeneralMethods.service';
import { AuthService } from './shared/services/Auth.service';
import { APIHelperService } from './shared/services/APIHelper.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';
import { ActivitiesComponent } from './activity/activities.component';
import { UserInfoService } from './shared/services/UserInfoManager.service';
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ActivityComponent,
    ActivitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ActivityService,
    AuthService,
    APIHelperService,
    UserInfoService,
    GeneralMethodsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
