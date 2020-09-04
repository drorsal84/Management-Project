import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Offer } from 'src/app/Models/Offer';
import { OfferProduct } from 'src/app/Models/OfferProducts';
import { Job } from 'src/app/Models/Job';


@Injectable({
  providedIn: 'root'
})

export class WorkService {

    constructor(private httpClient: HttpClient) { }

    createNewJob(offerId, laborCost, dateOfInstall): Observable<Job> {
      let params = new HttpParams()
      .set('offerId', offerId)
      .set('laborCost', laborCost)
      .set('dateOfInstall', dateOfInstall);
  
      return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/createNewJob", { params: params });
    }

    offerListSwitcher(offerStage): Observable<Offer[]> {
      let params = new HttpParams()
      .set('offerStage', offerStage);
  
      return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/offerListSwitcher", { params: params });
    }

    jobListSwitcher(jobStage): Observable<Job[]> {
        let params = new HttpParams()
        .set('jobStage', jobStage);
    
        return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/jobListSwitcher", { params: params });
      }

      offerStageSwitcher(offerId, prevOfferStage, currOfferStage): Observable<Offer> {
        let params = new HttpParams()
        .set('offerId', offerId)
        .set('prevOfferStage', prevOfferStage)
        .set('currOfferStage', currOfferStage);
    
        return this.httpClient.get<Offer>("http://localhost:8080/Shidroogim/offerStageSwitcher", { params: params });
      }

      jobStageSwitcher(jobId, prevJobStage, currJobStage): Observable<Job> {
        let params = new HttpParams()
        .set('jobId', jobId)
        .set('prevJobStage', prevJobStage)
        .set('currJobStage', currJobStage);
    
        return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/jobStageSwitcher", { params: params });
      }
  
}