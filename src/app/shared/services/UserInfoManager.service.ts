import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GeneralMethodsService } from './GeneralMethods.service';
import { APIHelperService } from './APIHelper.service';
import { ConfigModel } from '../models/Config.model';
import { AuthService } from './Auth.service';
import { UserInfoModel } from '../models/UserInfo.model';

@Injectable()
export class UserInfoService {
  activities: UserInfoModel;
  httpHeaders: any;
  config: ConfigModel;

  constructor(
    private generalMethodsService: GeneralMethodsService,
    private apiHelperService: APIHelperService,
    private authService: AuthService
    ) {
      this.httpHeaders = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'authorization': 'Bearer ' + this.generalMethodsService.getAuthResponse().access_token
         })
      };
  }

  public getUserInfo(): Observable<any> {

    return new Observable((observer) => {
      this.generalMethodsService.getConfig()
        .subscribe(
          config => {
              this.config = config;
              this.apiHelperService.get(this.config.CoreIdentityBaseUrl + '/connect/userinfo', this.httpHeaders)
                .subscribe(
                    userInfo => {
                      observer.next(userInfo);
                      observer.complete();
                    },
                    errorResponse => {
                      if (errorResponse.status === 401) {
                        this.authService.connectToCore();
                      } else {
                        alert(errorResponse.error.Message);
                        console.error(errorResponse);
                      }
                    }
                );
          }
        );
      });
  }

}
