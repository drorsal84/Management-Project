import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StringService } from 'src/app/Services/string-service/StringService';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('animateCard', [

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(700)
      ]),
    ])
  ],
})
export class JobsComponent implements OnInit {

  constructor(private router: Router, private stringService: StringService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem(this.stringService.loginToken) === null) { // If there is no session token navigate to the login page.
      this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
    }
  }
}
