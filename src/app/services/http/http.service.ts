import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';


import { AppConfig, StorageKey } from '../../constants/app.config';

export interface ServerInfo{
  data: any;
  message: string;
  isSuccess: boolean;
}

@Injectable()
export class HttpService {
  private _headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });

  private _accessToken: string = '';

  constructor(private _http: Http) { 
    this._accessToken = localStorage.getItem(StorageKey.authToken);
    if( this._accessToken ){
      this._headers.set('Authorization', `Bearer ${this._accessToken}`);
    }
  }

  public setAccessToken(token: string){ 
    this._accessToken = token;
    this._headers.set('Authorization', `Bearer ${this._accessToken}`);
    localStorage.setItem(StorageKey.authToken, token);
  }
  public getAccessToken(): string{ return this._accessToken; }
  public removeAccessToken(): void{
    this._accessToken = '';
    localStorage.removeItem(StorageKey.authToken);
  }

  public api(cmd: string, params: any): Observable<ServerInfo>{
    params = ( params ) ? params : {};
    params.cmd = cmd;

    return this._http.post(AppConfig.api, params, {headers: this._headers}).map(response => <ServerInfo>response.json());            
  }

  private _httpException(error: any): Promise<any>{
    console.error("Connection error.", error);
    return Promise.reject(error.message || error);
  }

}
