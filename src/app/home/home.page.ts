import { Component } from '@angular/core';
import { UserService } from './../shared/user.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Users : any = [];

  constructor(private userService : UserService) {}

  ngOnInit(){}

  ionViewDidEnter() {
    this.getData();
  }

  getData(){
    this.userService.getUserList().subscribe((res) => {
      console.log(res)
      this.Users = res;
    })
  }
  

  deleteUser(user, i) {
    if (window.confirm('Do you want to delete this user?')) {
      this.userService.deleteUser(user._id)
        .subscribe(() => {
          this.Users.splice(i, 1);
          console.log('User deleted!')
          this.getData();
        }
        )
    }
  }

}
