import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core'

import { ActivityService } from './shared/services/Activity.service';
import { GeneralMethodsService } from './shared/services/GeneralMethods.service';
import { AuthService } from './shared/services/Auth.service';
import { APIHelperService } from './shared/services/APIHelper.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';
import { ActivitiesComponent } from './activity/activities.component';
import { UserInfoService } from './shared/services/UserInfoManager.service';
import { ActivityComponent } from './activity/activity.component';
import { JWTService } from './shared/services/JWT.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, ObservableInput, of } from 'rxjs';

function loadConfig(http: HttpClient, generalMethodsService: GeneralMethodsService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('assets/config.json')
         .pipe(
           map((x: any) => {
            generalMethodsService.config = x;
             resolve(true);
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
             if (x.status !== 404) {
               resolve(false);
             }
             resolve(true);
             return of({});
           })
         ).subscribe();
    });
  };
}

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
    JWTService,
    APIHelperService,
    UserInfoService,
    GeneralMethodsService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [
        HttpClient,
        GeneralMethodsService
      ],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
