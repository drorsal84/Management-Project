import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { PrintOfferComponent } from './print-offer/print-offer.component';
import { ActiveOffersComponent } from './active-offers/active-offers.component';
import { OffersHistoryComponent } from './offers-history/offers-history.component';
import { JobsHistoryComponent } from './jobs-history/jobs-history.component';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
import { SharedModule } from 'src/app/shared-module/shared.module';

@NgModule({
  declarations: [
    JobsComponent,
    NewOfferComponent,
    PrintOfferComponent,
    ActiveOffersComponent,
    OffersHistoryComponent,
    JobsHistoryComponent,
    ActiveJobsComponent,
  ],
  imports: [
    SharedModule,
    JobsRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JobsModule { }
