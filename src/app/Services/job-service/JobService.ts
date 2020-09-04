import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Job } from 'src/app/Models/Job';
import { JobProduct } from 'src/app/Models/JobProduct';


@Injectable({
  providedIn: 'root'
})

export class jobService {

  constructor(private httpClient: HttpClient) { }

  searchJobs(searchInput): Observable<Job[]> {
    let params = new HttpParams()
    .set('searchInput', searchInput);

    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/searchJobs", { params: params });
  }

  searchJobsByJobNumber(searchInputInt): Observable<Job[]> {
    let params = new HttpParams()
    .set('searchInputInt', searchInputInt);

    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/searchJobsByJobNumber", { params: params });
  }

  getJobProductsList(): Observable<JobProduct[]> {
   
    return this.httpClient.get<JobProduct[]>("http://localhost:8080/Shidroogim/getJobProductsList");
  }

  jobNumberCheck(jobNumber): Observable<Job> {
    let params = new HttpParams()
    .set('jobNumber', jobNumber);

    return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/jobNumberCheck", { params: params });
  }

  jobNumberCheckForEdit(jobNumber, tempJobNumber): Observable<Job> {
    let params = new HttpParams()
    .set('jobNumber', jobNumber)
    .set('tempJobNumber', tempJobNumber);

    return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/jobNumberCheckForEdit", { params: params });
  }

  jobProductIdCheck(jobProductId): Observable<JobProduct> {
    let params = new HttpParams()
    .set('jobProductId', jobProductId);

    return this.httpClient.get<JobProduct>("http://localhost:8080/Shidroogim/jobProductIdCheck", { params: params });
  }

  jobProductIdCheckForEdit(jobProductId, tempJobProductId): Observable<JobProduct> {
    let params = new HttpParams()
    .set('jobProductId', jobProductId)
    .set('tempJobProductId', tempJobProductId);

    return this.httpClient.get<JobProduct>("http://localhost:8080/Shidroogim/jobProductIdCheckForEdit", { params: params });
  }

  jobProductIdCheckForActiveJobAdd(jId, jobProductId): Observable<JobProduct> {
    let params = new HttpParams()
    .set('jId', jId)
    .set('jobProductId', jobProductId);
     
    return this.httpClient.get<JobProduct>("http://localhost:8080/Shidroogim/jobProductIdCheckForActiveJobAdd", { params: params });
  }

  jobProductIdCheckForActiveJobEdit(jId, jobProductId, tempProductId): Observable<JobProduct> {
    let params = new HttpParams()
    .set('jId', jId)
    .set('jobProductId', jobProductId)
    .set('tempProductId', tempProductId);
    
    return this.httpClient.get<JobProduct>("http://localhost:8080/Shidroogim/jobProductIdCheckForActiveJobEdit", { params: params });
  }

  editJob(jobId, jobDescription, jobOrigin, jobType, jobRemarks, 
    laborCost, dateOfInstall): Observable<Job> {
    let params = new HttpParams()
      .set('jobId', jobId)
      .set('jobDescription', jobDescription)
      .set('jobOrigin', jobOrigin)
      .set('jobType', jobType)
      .set('jobRemarks', jobRemarks)
      .set('laborCost', laborCost)
      .set('dateOfInstall', dateOfInstall);

    return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/editJob", { params: params });
  }

  deleteJob(jobId): Observable<Job> {
    let params = new HttpParams()
    .set('jobId', jobId);
     
    return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/deleteJob", { params: params });
  }

  setJobDateOfCompleat(jobId, dateOfCompleat): Observable<Job> {
    let params = new HttpParams()
    .set('jobId', jobId)
    .set('dateOfCompleat', dateOfCompleat);
     
    return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/setJobDateOfCompleat", { params: params });
  }

  getActiveJobJobProductsList(jId): Observable<JobProduct[]> {
    let params = new HttpParams()
    .set('jId', jId);

    return this.httpClient.get<JobProduct[]>("http://localhost:8080/Shidroogim/getActiveJobJobProductsList", { params: params });
  }

  addActiveJobProduct(jId, jobProductId, jobProductNumber, jobProductName, jobProductQuantity, 
    jobProductCost, jobProductSubtotal): Observable<JobProduct> {
    let params = new HttpParams()
    .set('jId', jId)
    .set('jobProductId', jobProductId)
    .set('jobProductNumber', jobProductNumber)
    .set('jobProductName', jobProductName)
    .set('jobProductQuantity', jobProductQuantity)
    .set('jobProductCost', jobProductCost)
    .set('jobProductSubtotal', jobProductSubtotal);

    return this.httpClient.get<JobProduct>("http://localhost:8080/Shidroogim/addActiveJobProduct", { params: params });
  }

  editActiveJobProduct(jId, jobProductId, tempProductId, jobProductNumber, jobProductName, prevJobProductQuantity, 
    jobProductQuantity,  jobProductCost, jobProductSubtotal, editJobProductInst): Observable<JobProduct> {
    let params = new HttpParams()
    .set('jId', jId)
    .set('jobProductId', jobProductId)
    .set('tempProductId', tempProductId)
    .set('jobProductNumber', jobProductNumber)
    .set('jobProductName', jobProductName)
    .set('prevJobProductQuantity', prevJobProductQuantity)
    .set('jobProductQuantity', jobProductQuantity)
    .set('jobProductCost', jobProductCost)
    .set('jobProductSubtotal', jobProductSubtotal)
    .set('editJobProductInst', editJobProductInst);

    return this.httpClient.get<JobProduct>("http://localhost:8080/Shidroogim/editActiveJobProduct", { params: params });
  }

  deleteActiveJobProducts(jId, jobProductId): Observable<Job> {
    let params = new HttpParams()
    .set('jId', jId)
    .set('jobProductId', jobProductId);

    return this.httpClient.get<Job>("http://localhost:8080/Shidroogim/deleteActiveJobProducts", { params: params });
  }

  public sortByJobIdAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobIdAsc");
  }

  public sortByJobIdDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobIdDesc");
  }

  public sortByJobNumberAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobNumberAsc");
  }

  public sortByJobNumberDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobNumberDesc");
  }

  public sortByCustNameAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByCustNameAsc");
  }

  public sortByCustNameDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByCustNameDesc");
  }

  public sortByCustAddressAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByCustAddressAsc");
  }

  public sortByCustAddressDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByCustAddressDesc");
  }

  public sortByJobDescriptionAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobDescriptionAsc");
  }

  public sortByJobDescriptionDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobDescriptionDesc");
  }

  public sortByJobOriginAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobOriginAsc");
  }

  public sortByJobOriginDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobOriginDesc");
  }

  public sortByJobTypeAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobTypeAsc");
  }

  public sortByJobTypeDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobTypeDesc");
  }

  public sortByJobRemarksAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobRemarksAsc");
  }

  public sortByJobRemarksDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobRemarksDesc");
  }

  public sortByMatCostAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByMatCostAsc");
  }

  public sortByMatCostDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByMatCostDesc");
  }

  public sortByLaborCostAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByLaborCostAsc");
  }

  public sortByLaborCostDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByLaborCostDesc");
  }

  public sortByCustPaymentAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByCustPaymentAsc");
  }

  public sortByCustPaymentDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByCustPaymentDesc");
  }

  public sortByProfitAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByProfitAsc");
  }

  public sortByProfitDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByProfitDesc");
  }

  public sortByProfitPercAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByProfitPercAsc");
  }

  public sortByProfitPercDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByProfitPercDesc");
  }

  public sortByJobDateOfOfferAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobDateOfOfferAsc");
  }

  public sortByJobDateOfOfferDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByJobDateOfOfferDesc");
  }

  public sortByDateOfInstallAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByDateOfInstallAsc");
  }

  public sortByDateOfInstallDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByDateOfInstallDesc");
  }

  public sortByDateOfCompleatAsc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByDateOfCompleatAsc");
  }

  public sortByDateOfCompleatDesc(): Observable<Job[]> {
    return this.httpClient.get<Job[]>("http://localhost:8080/Shidroogim/sortByDateOfCompleatDesc");
  }

}