import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Offer } from 'src/app/Models/Offer';
import { OfferProduct } from 'src/app/Models/OfferProducts';


@Injectable({
  providedIn: 'root'
})

export class offerService {

  constructor(private httpClient: HttpClient) { }

  searchOffers(searchInput): Observable<Offer[]> {
    let params = new HttpParams()
    .set('searchInput', searchInput);

    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/searchOffers", { params: params });
  }

  searchOfferssByJobNumber(searchInputInt): Observable<Offer[]> {
    let params = new HttpParams()
    .set('searchInputInt', searchInputInt);

    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/searchOfferssByJobNumber", { params: params });
  }

  getOfferProductsList(): Observable<OfferProduct[]> {
   
    return this.httpClient.get<OfferProduct[]>("http://localhost:8080/Shidroogim/getOfferProductsList");
  }

  offerNumberCheck(offerNumber): Observable<Offer> {
    let params = new HttpParams()
    .set('offerNumber', offerNumber);

    return this.httpClient.get<Offer>("http://localhost:8080/Shidroogim/offerNumberCheck", { params: params });
  }

  offerNumberCheckForEdit(offerNumber, tempOfferNumber): Observable<Offer> {
    let params = new HttpParams()
    .set('offerNumber', offerNumber)
    .set('tempOfferNumber', tempOfferNumber);

    return this.httpClient.get<Offer>("http://localhost:8080/Shidroogim/offerNumberCheckForEdit", { params: params });
  }

  offerProductIdCheck(offerProductId): Observable<OfferProduct> {
    let params = new HttpParams()
    .set('offerProductId', offerProductId);

    return this.httpClient.get<OfferProduct>("http://localhost:8080/Shidroogim/offerProductIdCheck", { params: params });
  }

  offerProductIdCheckForEdit(offerProductId, tempOfferProductId): Observable<OfferProduct> {
    let params = new HttpParams()
    .set('offerProductId', offerProductId)
    .set('tempOfferProductId', tempOfferProductId);

    return this.httpClient.get<OfferProduct>("http://localhost:8080/Shidroogim/offerProductIdCheckForEdit", { params: params });
  }

  offerProductIdCheckForActiveOfferAdd(oId, offerProductId): Observable<OfferProduct> {
    let params = new HttpParams()
    .set('oId', oId)
    .set('offerProductId', offerProductId);
     
    return this.httpClient.get<OfferProduct>("http://localhost:8080/Shidroogim/offerProductIdCheckForActiveOfferAdd", { params: params });
  }

  offerProductIdCheckForActiveOfferEdit(oId, offerProductId, tempOfferProductId): Observable<OfferProduct> {
    let params = new HttpParams()
    .set('oId', oId)
    .set('offerProductId', offerProductId)
    .set('tempOfferProductId', tempOfferProductId);
     

    return this.httpClient.get<OfferProduct>("http://localhost:8080/Shidroogim/offerProductIdCheckForActiveOfferEdit", { params: params });
  }

  createNewOffer(offerNumber, offerCustName, offerCustAddress, offerDescription, offerOrigin, offerType, offerRemarks, 
     offerCustPayment, offerReceived, dateOfOffer): Observable<Offer> {
    let params = new HttpParams()
      .set('offerNumber', offerNumber)
      .set('offerCustName', offerCustName)
      .set('offerCustAddress', offerCustAddress)
      .set('offerDescription', offerDescription)
      .set('offerOrigin', offerOrigin)
      .set('offerType', offerType)
      .set('offerRemarks', offerRemarks)
      .set('offerCustPayment', offerCustPayment)
      .set('offerReceived', offerReceived)
      .set('dateOfOffer', dateOfOffer);

    return this.httpClient.get<Offer>("http://localhost:8080/Shidroogim/createNewOffer", { params: params });
  }

  editOffer(offerId, offerNumber, offerCustName, offerCustAddress, offerDescription, offerOrigin, offerType, 
    offerRemarks,  offerReceived, dateOfOffer): Observable<Offer> {
    let params = new HttpParams()
      .set('offerId', offerId)
      .set('offerNumber', offerNumber)
      .set('offerCustName', offerCustName)
      .set('offerCustAddress', offerCustAddress)
      .set('offerDescription', offerDescription)
      .set('offerOrigin', offerOrigin)
      .set('offerType', offerType)
      .set('offerRemarks', offerRemarks)
      .set('offerReceived', offerReceived)
      .set('dateOfOffer', dateOfOffer);

    return this.httpClient.get<Offer>("http://localhost:8080/Shidroogim/editOffer", { params: params });
  }

  deleteOffer(offerId): Observable<Offer> {
    let params = new HttpParams()
    .set('offerId', offerId);
     
    return this.httpClient.get<Offer>("http://localhost:8080/Shidroogim/deleteOffer", { params: params });
  }

  addToOfferProductTable(offerProductNumber, offerProductId, offerProductName, offerProductQuantity, 
    offerProductCost, offerProductSubtotal): Observable<OfferProduct[]> {
    let params = new HttpParams()
    .set('offerProductNumber', offerProductNumber)
    .set('offerProductId', offerProductId)
    .set('offerProductName', offerProductName)
    .set('offerProductQuantity', offerProductQuantity)
    .set('offerProductCost', offerProductCost)
    .set('offerProductSubtotal', offerProductSubtotal);

    return this.httpClient.get<OfferProduct[]>("http://localhost:8080/Shidroogim/addToOfferProductTable", { params: params });
  }

  editOfferProducts(offerProductNumber, tempOfferProductId, offerProductId, offerProductName, 
    offerProductQuantity, offerProductCost, offerProductSubtotal): Observable<OfferProduct[]> {
    let params = new HttpParams()
    .set('offerProductNumber', offerProductNumber)
    .set('tempOfferProductId', tempOfferProductId)
    .set('offerProductId', offerProductId)
    .set('offerProductName', offerProductName)
    .set('offerProductQuantity', offerProductQuantity)
    .set('offerProductCost', offerProductCost)
    .set('offerProductSubtotal', offerProductSubtotal);

    return this.httpClient.get<OfferProduct[]>("http://localhost:8080/Shidroogim/editOfferProducts", { params: params });
  }

  deleteOfferProducts(offerProductId): Observable<OfferProduct[]> {
    let params = new HttpParams()
    .set('offerProductId', offerProductId);

    return this.httpClient.get<OfferProduct[]>("http://localhost:8080/Shidroogim/deleteOfferProducts", { params: params });
  }

  getActiveOfferProductsList(oId): Observable<OfferProduct[]> {
    let params = new HttpParams()
    .set('oId', oId);

    return this.httpClient.get<OfferProduct[]>("http://localhost:8080/Shidroogim/getActiveOfferProductsList", { params: params });
  }

  addActiveOfferProduct(oId, offerProductId, offerProductNumber, offerProductName, offerProductQuantity, 
    offerProductCost, offerProductSubtotal): Observable<OfferProduct> {
    let params = new HttpParams()
    .set('oId', oId)
    .set('offerProductId', offerProductId)
    .set('offerProductNumber', offerProductNumber)
    .set('offerProductName', offerProductName)
    .set('offerProductQuantity', offerProductQuantity)
    .set('offerProductCost', offerProductCost)
    .set('offerProductSubtotal', offerProductSubtotal);

    return this.httpClient.get<OfferProduct>("http://localhost:8080/Shidroogim/addActiveOfferProduct", { params: params });
  }

  editActiveOfferProduct(oId, offerProductId, tempOfferProductId, offerProductNumber, offerProductName, offerProductQuantity, 
    offerProductCost, offerProductSubtotal): Observable<OfferProduct> {
    let params = new HttpParams()
    .set('oId', oId)
    .set('offerProductId', offerProductId)
    .set('tempOfferProductId', tempOfferProductId)
    .set('offerProductNumber', offerProductNumber)
    .set('offerProductName', offerProductName)
    .set('offerProductQuantity', offerProductQuantity)
    .set('offerProductCost', offerProductCost)
    .set('offerProductSubtotal', offerProductSubtotal);

    return this.httpClient.get<OfferProduct>("http://localhost:8080/Shidroogim/editActiveOfferProduct", { params: params });
  }

  deleteActiveOfferProducts(oId, offerProductId): Observable<OfferProduct> {
    let params = new HttpParams()
    .set('oId', oId)
    .set('offerProductId', offerProductId);

    return this.httpClient.get<OfferProduct>("http://localhost:8080/Shidroogim/deleteActiveOfferProducts", { params: params });
  }

  public sortByOfferIdAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferIdAsc");
  }

  public sortByOfferIdDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferIdDesc");
  }

  public sortByOfferNumberAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferNumberAsc");
  }

  public sortByOfferNumberDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferNumberDesc");
  }

  public sortByOfferCustNameAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferCustNameAsc");
  }

  public sortByOfferCustNameDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferCustNameDesc");
  }

  public sortByOfferCustAddressAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferCustAddressAsc");
  }

  public sortByOfferCustAddressDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferCustAddressDesc");
  }

  public sortByOfferDescriptionAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferDescriptionAsc");
  }

  public sortByOfferDescriptionDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferDescriptionDesc");
  }

  public sortByOfferOriginAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferOriginAsc");
  }

  public sortByOfferOriginDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferOriginDesc");
  }

  public sortByOfferTypeAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferTypeAsc");
  }

  public sortByOfferTypeDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferTypeDesc");
  }

  public sortByOfferRemarksAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferRemarksAsc");
  }

  public sortByOfferRemarksDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferRemarksDesc");
  }

  public sortByOfferCustPaymentsAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferCustPaymentsAsc");
  }

  public sortByOfferCustPaymentDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferCustPaymentDesc");
  }

  public sortByDateOfOfferAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByDateOfOfferAsc");
  }

  public sortByDateOfOfferDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByDateOfOfferDesc");
  }


  public sortByOfferReceivedAsc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferReceivedAsc");
  }

  public sortByOfferReceivedDesc(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:8080/Shidroogim/sortByOfferReceivedDesc");
  }
}