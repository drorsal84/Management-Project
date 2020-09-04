import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IdleService {
  startIdle: Subject<any> = new Subject();
  endIdle: Subject<any> = new Subject();

  initIdleState() {
    //this.startIdle.next();
  }

  endIdleState() {
    //this.endIdle.next();
  }
}