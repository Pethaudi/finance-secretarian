import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie-service/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string;
    password: string;

    disableForms: boolean;
    failedLogin: boolean;

    constructor(private userService: UserService, private router: Router) {
        this.disableForms = false;
        this.failedLogin = false;
        if (this.userService.isLoggedIn) {
            this.router.navigate(["main"]);
        }
    }

    async login() {
        this.disableForms = true;
        await this.userService.login(this.email, this.password);
        this.disableForms = false;

        if (this.userService.isLoggedIn) {
            this.router.navigate(["main"]);
        } else {
            this.failedLogin = true;
            this.email = "";
            this.password = "";
        }
    }
}
