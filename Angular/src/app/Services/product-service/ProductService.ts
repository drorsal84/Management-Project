import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})

export class productService {

  constructor(private httpClient: HttpClient) { }

  public getProductById(productId): Observable<Product> {
    let params = new HttpParams()
    .set('productId', productId);

  return this.httpClient.get<Product>("http://localhost:8080/Shidroogim/getProductById", { params: params });
  }

  public searchProducts(searchInput): Observable<Product[]> {
    let params = new HttpParams()
      .set('searchInput', searchInput);

    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/searchProducts", { params: params });
  }

  public filterProductsByCategory(productCat): Observable<Product[]> {
    let params = new HttpParams()
      .set('productCat', productCat);

    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/filterProductsByCategory", { params: params });
  }

  public getAllProducts(): Observable<Product[]> {

    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/getAllProducts");
  }

  public newProductCatalogNumCheck(productCatalogNum): Observable<Product> {
    let params = new HttpParams()
      .set('productCatalogNum', productCatalogNum);
    return this.httpClient.get<Product>("http://localhost:8080/Shidroogim/newProductCatalogNumCheck", { params: params });
  }

  public editProductCatalogNumCheck(productId, productCatalogNum): Observable<Product> {
    let params = new HttpParams()
      .set('productCatalogNum', productCatalogNum)
      .set('productId', productId);
    return this.httpClient.get<Product>("http://localhost:8080/Shidroogim/editProductCatalogNumCheck", { params: params });
  }

  public createNewProduct(productCat, productName, productManuf, productCatalogNum, productQuan, productOnSaleQuan, productCost,
    productOnSaleCost, productImgFile): Observable<Product> {

    let params = new HttpParams()
      .set('productCat', productCat)
      .set('productName', productName)
      .set('productManuf', productManuf)
      .set('productCatalogNum', productCatalogNum)
      .set('productQuan', productQuan)
      .set('productOnSaleQuan', productOnSaleQuan)
      .set('productCost', productCost)
      .set('productOnSaleCost', productOnSaleCost)
      .set('productImgFile', productImgFile);

    return this.httpClient.get<Product>("http://localhost:8080/Shidroogim/createNewProduct", { params: params });
  }

  public editProduct(productId, productCat, productName, productManuf, productCatalogNum, productQuan, productOnSaleQuan, productCost,
    productOnSaleCost, productImgFile): Observable<Product> {

    let params = new HttpParams()
      .set('productId', productId)
      .set('productCat', productCat)
      .set('productName', productName)
      .set('productManuf', productManuf)
      .set('productCatalogNum', productCatalogNum)
      .set('productQuan', productQuan)
      .set('productOnSaleQuan', productOnSaleQuan)
      .set('productCost', productCost)
      .set('productOnSaleCost', productOnSaleCost)
      .set('productImgFile', productImgFile);

    return this.httpClient.get<Product>("http://localhost:8080/Shidroogim/editProduct", { params: params });
  }

  public deleteProduct(productId): Observable<Product> {
    let params = new HttpParams()
      .set('productId', productId);
    return this.httpClient.get<Product>("http://localhost:8080/Shidroogim/deleteProduct", { params: params });
  }

  public sortByProductIdAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductIdAsc");
  }

  public sortByProductIdDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductIdDesc");
  }

  public sortByProductCatAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCatAsc");
  }

  public sortByProductCatDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCatDesc");
  }

  public sortByProductNameAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductNameAsc");
  }

  public sortByProductNameDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductNameDesc");
  }

  public sortByProductManufAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductManufAsc");
  }

  public sortByProductManufDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductManufDesc");
  }

  public sortByProductCatalogNumAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCatalogNumAsc");
  }

  public sortByProductCatalogNumDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCatalogNumDesc");
  }

  public sortByProductQuanAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductQuanAsc");
  }

  public sortByProductQuanDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductQuanDesc");
  }

  public sortByProductOnSaleQuanAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductOnSaleQuanAsc");
  }

  public sortByProductOnSaleQuanDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductOnSaleQuanDesc");
  }

  public sortByProductCostAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCostAsc");
  }

  public sortByProductCostDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCostDesc");
  }

  public sortByProductOnSaleCostAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductOnSaleCostAsc");
  }

  public sortByProductOnSaleCostDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductOnSaleCostDesc");
  }

  public sortByProductTotalCostAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductTotalCostAsc");
  }

  public sortByProductTotalCostDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductTotalCostDesc");
  }

  public sortByProductOnSaleTotalCostAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductOnSaleTotalCostAsc");
  }

  public sortByProductOnSaleTotalCostDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductOnSaleTotalCostDesc");
  }

  public sortByProductCombinedTotalCostAsc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCombinedTotalCostAsc");
  }

  public sortByProductCombinedTotalCostDesc(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/Shidroogim/sortByProductCombinedTotalCostDesc");
  }
}