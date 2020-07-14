import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ActivityModel } from '../models/Activity.model';
import { GeneralMethodsService } from './GeneralMethods.service';
import { APIHelperService } from './APIHelper.service';
import { AuthResponseModel } from '../models/AuthResponse.model';
import { AuthService } from './Auth.service';

@Injectable()
export class ActivityService {
  activities: Observable<ActivityModel[]>;
  httpHeaders: any;
  authResponse: AuthResponseModel;

  constructor(
    private generalMethodsService: GeneralMethodsService,
    private apiHelperService: APIHelperService,
    private authService: AuthService
    ) {
      try {
        this.authResponse = this.generalMethodsService.getAuthResponse();
        this.httpHeaders = {
          headers: new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'authorization': 'Bearer ' + this.authResponse.access_token
          })
        };
      } catch (ex) {
        throw new Error(ex);
      }
  }

  public getActivities(): Observable<any> {

    try {
      return new Observable((observer) => {
        this.apiHelperService.get(this.authResponse.endpoint + '/activity?page=0,1000&orderby=name', this.httpHeaders)
          .subscribe(
            activities => {
              observer.next(activities);
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
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public deleteActivity(activity: ActivityModel): Observable<any> {

    try {
      return new Observable((observer) => {
        this.apiHelperService.delete(this.authResponse.endpoint + '/activity/' + activity.id, this.httpHeaders)
          .subscribe(
            response => {
              observer.next(response);
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
        });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public getActivity(id: string): Observable<any> {

    try {
      return new Observable((observer) => {
        this.apiHelperService.get(this.authResponse.endpoint + '/activity/' + id, this.httpHeaders)
          .subscribe(
            activity => {
              observer.next(activity);
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
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public createActivity(activity: ActivityModel): Observable<any> {
    try {
      return new Observable((observer) => {
        this.apiHelperService.post(this.authResponse.endpoint + '/activity/', activity, this.httpHeaders)
          .subscribe(
            activityObject => {
              observer.next(activity);
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
        });
    } catch(ex) {
      throw new Error(ex);
    }
  }

  public updateActivity(id: string, activity: ActivityModel): Observable<any> {

    try {
      return new Observable((observer) => {
        this.apiHelperService.put(this.authResponse.endpoint + '/activity/' + id, activity, this.httpHeaders)
          .subscribe(
            activityObject => {
              observer.next(activity);
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
      });
    } catch(ex) {
      throw new Error(ex);
    }
  }

}
