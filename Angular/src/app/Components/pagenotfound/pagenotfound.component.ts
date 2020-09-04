import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loginService } from 'src/app/Services/login-service/LoginService';
import { Keepalive } from '@ng-idle/keepalive';
import { StringService } from 'src/app/Services/string-service/StringService';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  idleState = 'Not started.'; // Idle state tracking .
  timedOut = false; // Bollean flag for user timeout.
  lastPing?: Date = null; // last ping Date for keepalive functions.

  constructor(public loginService: loginService, public router: Router,
    public route: ActivatedRoute, private idle: Idle, private keepalive: Keepalive,
    private stringService: StringService) {
    // sets the number of seconds befor user gets timeout modal warning.
    idle.setIdle(900);
    // sets the number of seconds before the user is logged out.
    idle.setTimeout(30);
    // sets the default interrupts, things like clicks, scrolls, touches to the document.
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      document.getElementById(this.stringService.youAreIdleModalClose).click();
      this.logout();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
      document.getElementById(this.stringService.youAreIdleModalOpen).click();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = `${countdown} ${this.stringService.idle}`;
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds.
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') == null) {
      this.logout();
    }
  }

  backToHomePage() {
    this.router.navigate([{ outlets: { primary: 'homepage', headerOutlet: 'navbar' } }]);
  }

  logout() {
    const observer: Observable<Login> = this.loginService.getToken();
    observer.subscribe(
      (res) => {
        const observer: Observable<Login> = this.loginService.logOut(res.loginToken);
        observer.subscribe(
          (res) => {
            this.router.navigate([{ outlets: { primary: 'login', headerOutlet: null } }]);
          },
          (error) => {
            alert(this.stringService.logoutFail)
          }
        );
      },
      (error) => {
        alert(this.stringService.tokenNotFound)
      }
    );
  }

}
