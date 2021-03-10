import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  
  updateUserForm: FormGroup;
  id: any;

  constructor(
    private userAPI: UserService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getUserData(this.id);
    this.updateUserForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

  getUserData(id) {
    this.userAPI.getUser(id).subscribe(res => {
      this.updateUserForm.setValue({
        name: res['name'],
        email: res['email'],
        password : res['password']
      });
    });
  }

  updateForm() {
    if (!this.updateUserForm.valid) {
      return false;
    } else {
      this.userAPI.updateUser(this.id, this.updateUserForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateUserForm.reset();
          this.router.navigate(['/home']);
        })
    }
  }

}