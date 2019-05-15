import { Component, OnInit } from '@angular/core';
import { ActivityModel } from './shared/models/Activity.model';
import { AuthService } from './shared/services/Auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralMethodsService } from './shared/services/GeneralMethods.service';

@Component({
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  title = 'Core Api - Angular Sample';

  constructor(
    private authService: AuthService,
    private generalMethodsService: GeneralMethodsService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    try {
      this.activatedRoute.queryParams.subscribe(params => {
        const code = params.code;
        const state = params.state;
        // Authenticate (Code Exchange)
        if(code){
          // verfiy that the state parameter returned by the server is the same that was sent earlier.
          if(this.authService.isValidState(state)) {
            this.authService.authorize(code).subscribe(
              authResponse => {
                this.router.navigateByUrl('/activities');
              }
            );
          } else {
            throw new Error('State Parameter returned doesn\'t match to the one sent to Core API Server.');
          }
        } else { // Load Activity List
          if(this.generalMethodsService.getAuthResponse()) {
            this.router.navigateByUrl('/activities');
          }
        }
      });

    } catch (ex) {
      throw new Error(ex);
    }
  }

  ngOnInit() {
  }

  connectToCore(): void {
    try {
      this.authService.connectToCore();
    } catch(ex) {
      throw new Error(ex);
    }
  }

}
