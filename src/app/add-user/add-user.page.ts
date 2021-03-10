import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  userForm : FormGroup;

  constructor(
    private userAPI: UserService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      password : ['']
    })
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userAPI.addUser(this.userForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.userForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }

}
