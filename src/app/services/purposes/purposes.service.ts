import { Injectable } from '@angular/core';

import { HttpService, ServerInfo } from '../http/http.service';
import { Observable } from 'rxjs/Observable';

export interface PurposeInfo{
  id: number;
  name: string;
}

@Injectable()
export class PurposesService {

  constructor(private _http: HttpService) { }

  public list(): Observable<PurposeInfo[]>{
    return this._http.api('purpose.list', {}).map(
      serverInfo => serverInfo.data.purposes as PurposeInfo[]
    );
  }

}
