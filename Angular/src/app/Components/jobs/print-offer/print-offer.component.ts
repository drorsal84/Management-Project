import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print-offer',
  templateUrl: './print-offer.component.html',
  styleUrls: ['./print-offer.component.css']
})
export class PrintOfferComponent implements OnInit {
  
 

  constructor(route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
  
  }

}
