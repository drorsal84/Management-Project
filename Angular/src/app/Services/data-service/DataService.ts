import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public token = new BehaviorSubject<string>("");
  activeUser = this.token.asObservable();

  public productId = new BehaviorSubject<number>(0);
  activeProduct = this.productId.asObservable();

  constructor() { }

  changeData(token: string) {
    this.token.next(token);
  }

  changeId(productId: number) {
    this.productId.next(productId);
  }
}