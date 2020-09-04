import { Component, OnInit, Inject } from '@angular/core';
import { loginService } from 'src/app/Services/login-service/LoginService';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { StringService } from 'src/app/Services/string-service/StringService';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  public loginToken: string;
  
  constructor(public loginService: loginService, public router: Router,
    public route: ActivatedRoute, private stringService: StringService) { }

  ngOnInit() {
  }

  logout() {
    const observer: Observable<Login> = this.loginService.getToken();

    observer.subscribe(
      (res) => {
  
        const observer: Observable<Login> = this.loginService.logOut(res.loginToken);

        observer.subscribe(
          (res) => {
            sessionStorage.clear();
            this.router.navigate([{ outlets: { primary: this.stringService.login, headerOutlet: null } }]);
            
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
