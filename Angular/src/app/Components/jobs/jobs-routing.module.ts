import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsComponent } from './jobs.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { ActiveOffersComponent } from './active-offers/active-offers.component';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
import { OffersHistoryComponent } from './offers-history/offers-history.component';
import { JobsHistoryComponent } from './jobs-history/jobs-history.component';

const routes: Routes = [
  { path: "jobs", component: JobsComponent },
  { path: "new-offer", component: NewOfferComponent},
  { path: "active-offers", component: ActiveOffersComponent},
  { path: "active-jobs", component: ActiveJobsComponent},
  { path: "offers-history", component: OffersHistoryComponent},
  { path: "jobs-history", component: JobsHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
