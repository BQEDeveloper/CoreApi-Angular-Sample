import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activity/activities.component';
import { IndexComponent } from './index.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  { path: 'activities', component: ActivitiesComponent, pathMatch: 'full' },
  { path: 'activity', component: ActivityComponent, pathMatch: 'full' },
  { path: 'activity/:id', component: ActivityComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
