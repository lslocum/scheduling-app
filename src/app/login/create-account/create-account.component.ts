import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createUserFormGroup: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.createUserFormGroup = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  createAccount(){
    this.userService.createUser(this.createUserFormGroup.value).subscribe(()=>{
      this.router.navigate(['./login']);
    })
  }
}
