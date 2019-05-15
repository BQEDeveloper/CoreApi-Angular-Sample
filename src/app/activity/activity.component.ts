import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/services/Activity.service';
import { ActivityModel } from '../shared/models/Activity.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './activity.component.html',
})
export class ActivityComponent implements OnInit {
  activity: ActivityModel;

  constructor(
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() { 
    try {
      const id = this.activatedRoute.snapshot.params.id;
      if (id) {
        this.getActivity(id);
      } else {
        this.activity = new ActivityModel();
      }

    } catch (ex) {
      throw new Error(ex);
    }
  }

  getActivity(id: string): void {
    try {
      this.activityService.getActivity(id)
        .subscribe(activity => this.activity = activity);
    } catch (ex) {
      throw new Error(ex);
    }
  }

  submitActivity(): void {
    try {
      const id = this.activity.id;
      if (id) {
        this.activityService.updateActivity(id, this.activity)
          .subscribe(
            response => {
              this.router.navigateByUrl('/activities');
            }
          );
      } else {
        this.activityService.createActivity(this.activity)
          .subscribe(
            response => {
              this.router.navigateByUrl('/activities');
            }
          );
      }
    } catch (ex) {
      throw new Error(ex);
    }
  }

}
