import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StringService } from 'src/app/Services/string-service/StringService';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('animateCard', [

      /* the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})), */

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(700)
      ]),

      /* fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0}))) */
    ])
  ],
})
export class HomepageComponent implements OnInit {

  constructor( private router: Router, private stringService: StringService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem(this.stringService.loginToken) == null) { // If there is no session token navigate to the login page.
      this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
    }
  }

  
}
