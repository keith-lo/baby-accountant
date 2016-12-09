import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users/users.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
  providers: [UsersService, HttpService]
})
export class NavComponent implements OnInit {

  constructor(private _router: Router, private _usersService: UsersService) { }

  ngOnInit() {
  }


  logout(): void{
    this._usersService.logout();
    this._router.navigate(['/login']);
  }

}
