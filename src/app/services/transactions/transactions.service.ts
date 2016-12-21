import { Injectable } from '@angular/core';

import { HttpService, ServerInfo } from '../http/http.service';
import { Observable } from 'rxjs/Observable';

import { PurposeInfo } from '../purposes/purposes.service';

import { CustomerTransactionInfo } from '../customers/customers.service';

class Transaction{
  public referenceNumber: string;
  public customerId: number;
  constructor(data: any){
    this.referenceNumber = data.referenceNumber;
    this.customerId = data.customerId;
  }
}

export class AccountReceivalbe extends Transaction{
  public balance: number;
  public purpose: PurposeInfo;
  public remindDate: Date;
  

  constructor(data: any){ 
    super({referenceNumber: data.referenceNumber, customerId: data.customer_id});
    this.balance = data.balance;
    this.purpose = <PurposeInfo>{id: data.purpose_id, name: data.purpose_name}
    this.remindDate = new Date(data.remindDate);
  }
}

export class PaymentTransaction extends Transaction{
  public value: number;
  public netAmount: number;
  public currency: string;
  public customerId: number;
  public date: Date;
  public salesman: string;
  public bank: BankInfo;
  public paymentMethod: PaymentMethodInfo;

  constructor(data: any){
    super({referenceNumber: data.referenceNumber, customerId: data.customer_id});
    this.netAmount = data.netAmount;
    this.value = data.value;
    this.date = new Date(data.date);
    this.salesman = data.salesman;
    this.currency = data.currency;
    this.bank = {id: data.bank_id, name: data.bank_name, methods: []};
    this.paymentMethod = {id: data.type_id, name: data.type_name};
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

  public listReceivedPayments(fromDate: Date, toDate: Date){
    return this._http.api('customer.listpayments', {from: fromDate.toJSON(), to: toDate.toJSON()})
          .map(serverInfo => {
            return serverInfo.data.payments.map(
              data => new PaymentTransaction(data)
            )
          });
  }

  public listAccountsReceivable(fromDate: Date, toDate: Date): Observable<AccountReceivalbe[]>{
    return this._http.api('customer.listbalance', {from: fromDate.toJSON(), to: toDate.toJSON()})
          .map(serverInfo => {
            return serverInfo.data.payments.map(
              payment => new AccountReceivalbe(payment)
            );
          });
  }

  public getReportRevenue(fromDate: Date, toDate: Date){
    return this._http.api('report.revenue', {from: fromDate.toJSON(), to: toDate.toJSON()})
          .map(serverInfo => {
            console.log(serverInfo);
          });
  }

  public getReportTList(fromDate: Date, toDate: Date): Observable<ServerInfo>{
    console.log('get report tlist');
    return this._http.api('report.tlist', {from: fromDate.toJSON(), to: toDate.toJSON()})
          .map(serverInfo => {
            return serverInfo;
          });
  }

  public getBankList(): Observable<{banks: BankInfo[], currencies: CurrencyInfo[]}>{
    return this._http.api('bank.list', {}).map(
      serverInfo => {
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
