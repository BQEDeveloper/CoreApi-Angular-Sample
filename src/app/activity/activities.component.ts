import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/services/Activity.service';
import { ActivityModel } from '../shared/models/Activity.model';
import { AuthService } from '../shared/services/Auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../shared/services/UserInfoManager.service';
import { UserInfoModel } from '../shared/models/UserInfo.model';
@Component({
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent implements OnInit {
  title = 'Core Api - Angular Sample';
  activities: ActivityModel[];
  userInfo: UserInfoModel;

  constructor(
    private activityService: ActivityService,
    private authService: AuthService,
    private userInfoService: UserInfoService,
    public activatedRoute: ActivatedRoute,
  ) {
      this.userInfo = new UserInfoModel ();
      this.userInfo.company = '...';
  }

  ngOnInit() {
    try {
      this.getActivities();
      this.getUserInfo();
    } catch(ex) {
      throw new Error(ex);
    }
  }

  getActivities(): void {
    try {
      this.activityService.getActivities()
        .subscribe(activities => this.activities = activities);
    } catch(ex) {
      throw new Error(ex);
    }
  }

  deleteActivity(activity: ActivityModel): void {
    try {
      this.activityService.deleteActivity(activity)
        .subscribe(
          response => {
            this.getActivities();
          }
        );
    } catch(ex) {
      throw new Error(ex);
    }
  }

  getUserInfo(): void {
    try {
      this.userInfoService.getUserInfo()
        .subscribe(userInfo => this.userInfo = userInfo);
    } catch(ex) {
      throw new Error(ex);
    }
  }

  disconnectFromCore(): void {
    try {
      this.authService.disconnectFromCore();
    } catch(ex) {
      throw new Error(ex);
    }
  }

}
