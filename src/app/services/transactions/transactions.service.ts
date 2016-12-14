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

export interface BankInfo{
  id: number; name: string, methods: PaymentMethodInfo[];
}
export interface CurrencyInfo{
  id: number; name: string;
}
export interface PaymentMethodInfo{
  id: number; name: string;
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

  public getBankList(): Observable<{banks: BankInfo[], currencies: CurrencyInfo[]}>{
    return this._http.api('bank.list', {}).map(
      serverInfo => {
        console.log(serverInfo.data);
        let _banks:BankInfo[] = [];
        let _currencies = <CurrencyInfo[]> serverInfo.data.currencies;

        serverInfo.data.bankTypes.forEach(obj => {
          let _method: PaymentMethodInfo = <PaymentMethodInfo>{
            id: obj.type_id, name: obj.type_name
          };

          let _isFound: boolean = false;
          _banks.map(a => {
            if( a.id == obj.id ){
              _isFound = true;
              a.methods.push(_method);
            }
          });

          if( !_isFound ){
            _banks.push({id: obj.id, name: obj.name, methods: [_method]});
          }
        });

        return {banks:_banks, currencies:_currencies};
      }
    );
  }
}
