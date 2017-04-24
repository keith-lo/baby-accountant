import { Injectable } from '@angular/core';

import { AppConfig, StorageKey } from '../../constants/app.config';

import { HttpService, ServerInfo } from '../http/http.service';
import { Observable } from 'rxjs/Observable';

export class User{
  constructor(public email: string, public password: string){

  }
}

@Injectable()
export class UsersService {

  //Indicate user whether is logged in.
  private _loggedIn: boolean = false;

  constructor(private _http: HttpService) {
    let token : String = _http.getAccessToken();
    if( token ){ this._loggedIn = true; }
  }

  public isLoggedIn(): boolean{ return this._loggedIn; }

  public login(email: string, password: string): Observable<boolean>{
    let params = {cmd: 'login', user: email, password: password};

    return this._http.api('login', params)
      .map(serverInfo => {
        let token: string = serverInfo.data.token;
        if( token ){
          this._http.setAccessToken(token);
        }
        return true;
      });
  }

  public logout(): void{
    this._http.removeAccessToken();
    this._loggedIn = false;
  }

  

}
