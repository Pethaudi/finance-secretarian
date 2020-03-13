import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string;
    password: string;

    disableForms: boolean;

    constructor(private userService: UserService, private router: Router) {
        this.disableForms = false;
    }

    async login() {
        this.disableForms = true;
        await this.userService.login(this.email, this.password);

        if (this.userService.isLoggedIn) {
            this.router.navigate(["other"]);
        } else {
            this.email = "";
            this.password = "";
        }
    }
}
