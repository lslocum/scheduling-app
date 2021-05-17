import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    this.userService.loginUser(this.loginFormGroup.value.userName).subscribe(user=>{
      if(user){
        this.router.navigate(['./dashboard']);
      } else {
        alert(`${this.loginFormGroup.value.userName} does not exist. Please create an account.`);
      }
    });
  }
}
