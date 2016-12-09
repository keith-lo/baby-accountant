import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, User } from '../../services/users/users.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-page-login',
  providers: [UsersService, HttpService],
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.sass']
})
export class PageLoginComponent implements OnInit {
  public user : User;
  public errMsg : string;

  constructor(private _router: Router, private _usersService: UsersService) { }

  ngOnInit() {
    this.user = new User('root','dg123456');
    this.errMsg = '';
  }

  public login(): void{
    this._usersService.login(this.user.email, this.user.password)
    .subscribe(isSuccess => {
      if( isSuccess ){ this._router.navigate(['/dashboard']); }
    });
  }

}
