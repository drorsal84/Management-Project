import { Component, OnInit, OnDestroy } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { StringService } from 'src/app/Services/string-service/StringService';
import { loginService } from 'src/app/Services/login-service/LoginService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-idle',
  templateUrl: './idle.component.html',
  styleUrls: ['./idle.component.css']
})
export class IdleComponent implements OnInit, OnDestroy {

  public idleState = 'Not started.'; // Idle state tracking .
  private userLoggedOut = false; // Boolean flag for when user initiates logout from idle modal.
  private eventSubIdleEnd: any;
  private eventSubTimedOut: any;
  private eventSubIdleStart: any;
  private eventSubTimeoutWarning: any;

  public number: number = 0;

  constructor(private idle: Idle, private stringService: StringService,
    public loginService: loginService, public router: Router) { }

  ngOnInit(): void {
    this.youAreIdle();
  }

  ngOnDestroy(): void {
    this.eventSubIdleEnd.unsubscribe();
    this.eventSubTimedOut.unsubscribe();
    this.eventSubIdleStart.unsubscribe();
    this.eventSubTimeoutWarning.unsubscribe();
    this.idle.ngOnDestroy();
  }

  youAreIdle() {
    // sets the number of seconds before user gets timeout modal warning.
    this.idle.setIdle(450);
    // sets the number of seconds before the user is logged out.
    this.idle.setTimeout(30);
    // sets the default interrupts, things like clicks, scrolls, touches to the document.
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.eventSubIdleEnd = this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    this.eventSubTimedOut = this.idle.onTimeout.subscribe(() => {
      if (!this.userLoggedOut) {
        this.logout();
      }
    });

    this.eventSubIdleStart = this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle! ' + this.number++;
      console.log(this.idleState);
      document.getElementById(this.stringService.youAreIdleModalOpen).click();
    });

    this.eventSubTimeoutWarning = this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = `${countdown} ${this.stringService.idle}`;
      console.log(this.idleState);
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
  }

  logout() {
    const observer: Observable<Login> = this.loginService.getToken();
    observer.subscribe(
      (res) => {
        const observer: Observable<Login> = this.loginService.logOut(res.loginToken);
        observer.subscribe(
          (res) => {
            this.userLoggedOut = true;
            document.getElementById(this.stringService.youAreIdleModalClose).click();
            sessionStorage.clear();
            this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
          },
          (error) => {
            alert(this.stringService.logoutFail);
          }
        );
      },
      (error) => {
        alert(this.stringService.tokenNotFound);
      }
    );
  }

}


