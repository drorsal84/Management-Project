import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/models/Login';
import { Router } from '@angular/router';
import { loginService } from 'src/app/Services/login-service/LoginService';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/Services/data-service/DataService';
import { SnackbarService } from 'src/app/Services/snackbar-service/SnackbarService';
import { StringService } from 'src/app/Services/string-service/StringService';
import { IdleService } from 'src/app/Services/idle-service/IdleService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;
  public userLogin: Login;
  public userToken: string;
  public title: string;

  constructor(public formBuilder: FormBuilder,
    public loginService: loginService, public router: Router, public dataService: DataService,
    private snackbarService: SnackbarService, private stringService: StringService,
    private idleService: IdleService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.title = "התחברות למערכת";
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    const userName = this.loginForm.controls[this.stringService.userName].value;
    const userPassword = this.loginForm.controls[this.stringService.password].value;

    const observer: Observable<Login> = this.loginService.loginCheck(userName, userPassword);

    observer.subscribe(
      (res) => {
        this.dataService.changeData(res.loginToken);
        sessionStorage.setItem(this.stringService.loginToken, res.loginToken);
        this.router.navigate([{ outlets: { primary: this.stringService.homepage, headerOutlet: this.stringService.navbar} }]);
      },
      (error) => {
        this.submitted = false;
        document.getElementById(this.stringService.loginFailedSnackbar).click();
      }
    );
  }

  // Snackbar functions
  loginFailed() {
    this.snackbarService.show(this.stringService.loginFailed, 'danger');
  }
}