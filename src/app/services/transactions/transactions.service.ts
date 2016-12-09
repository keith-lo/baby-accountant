import { Injectable } from '@angular/core';

import { HttpService, ServerInfo } from '../http/http.service';
import { Observable } from 'rxjs/Observable';

import { PurposeInfo } from '../purposes/purposes.service';

class Transaction{
  public referenceNumber: string;
  constructor(data: any){
    this.referenceNumber = data.referenceNumber;
  }
}

export class AccountReceivalbe extends Transaction{
  public balance: number;
  public purpose: PurposeInfo;
  public remindDate: Date;

  constructor(data: any){ 
    super({referenceNumber: data.referenceNumber});
    this.balance = data.balance;
    this.purpose = <PurposeInfo>{id: data.purpose_id, name: data.purpose_name}
    this.remindDate = new Date(data.remindDate);
  }
}

@Injectable()
export class TransactionsService {

  constructor(private _http: HttpService) { }

  public listAccountsReceivable(fromDate: Date, toDate: Date): Observable<AccountReceivalbe[]>{
    return this._http.api('customer.listbalance', {from: fromDate.toJSON(), to: toDate.toJSON()})
          .map(serverInfo => {
            return serverInfo.data.payments.map(
              payment => new AccountReceivalbe(payment)
            );
          });
  }
}
