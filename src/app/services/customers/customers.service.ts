import { Injectable } from '@angular/core';

import { HttpService, ServerInfo } from '../http/http.service';
import { Observable } from 'rxjs/Observable';

import { PurposeInfo } from '../purposes/purposes.service';
import { BankInfo, PaymentMethodInfo } from '../transactions/transactions.service';

export class Customer{
  public referenceNumber: string;
  public id: number;
  public name: string;
  public age: number;
  public tel: string;
  public program: string;
  public remark: string;

  public purposes: CustomerPurposeInfo[];
  public transactions: CustomerTransactionInfo[];

  constructor(){}

  public isValid(): boolean{
    return ( this.referenceNumber && this.name ) ? true : false ;
  }
}


export interface AddTransactionInfo{
  currency: string;
  bankId: number;
  methodId: number;
  value: number;
  netAmount: number;
  date: Date;
  customerPurposeId: number;
}

export interface CustomerTransactionInfo{
  id: number,
  customerPurposeId: number,
  bank: BankInfo,
  method: PaymentMethodInfo;
  date: Date;
  remark: string;
  salesman: string;
  currency: string;
  value: number;
  netAmount: number;
}

export interface CustomerPurposeInfo{
  id: number;
  purpose: PurposeInfo;
  remark: string;
  date: Date;
  amount: number;
  paid: number;
  balance: number;
  isDeleted: boolean;
}

@Injectable()
export class CustomersService {

  constructor(private _http: HttpService) { }

  /**
   * Get customer info by given customer id.
   */
  public get(customerId: number): Observable<Customer>{
    return this._http.api('customer.detail', {'id': customerId}).map(
      serverInfo => {
        let customer: Customer = new Customer();
        let keys = Object.keys(serverInfo.data.customer);

        let obj = {} as Customer;
        
        keys.forEach(key => customer[key] = serverInfo.data.customer[key]);

        return customer;
      }
    );
  }

  public addPurpose(customer: Customer, purposeInfo: CustomerPurposeInfo): Observable<ServerInfo>{
    let data = {
      'customer_id': customer.id,
      'purpose_id': purposeInfo.purpose.id,
      'amount': purposeInfo.amount,
      'remindDate': purposeInfo.date.toJSON(),
      'remark': purposeInfo.remark
    }

    return this._http.api('customer.addpurpose', data).map(
      serverInfo => {
        purposeInfo.id = serverInfo.data.id;
        customer.purposes.push(purposeInfo);
        return serverInfo;
      }
    );
  }

  public editPurpose(customer: Customer, purposeInfo: CustomerPurposeInfo): Observable<ServerInfo>{
    let data = {
      'id': purposeInfo.id,
      'amount': purposeInfo.amount,
      'remindDate': purposeInfo.date.toJSON(),
      'remark': purposeInfo.remark
    }

    return this._http.api('customer.updatepurpose', data).map(
      serverInfo => {
        customer.purposes.forEach((purpose: CustomerPurposeInfo, index:number) => {
          if( purpose.id == purposeInfo.id ){
            customer.purposes[index] = purposeInfo;
          }
        });

        return serverInfo;
      }
    );
  }

  public deletePurpose(customer: Customer, purposeId: number): Observable<Customer>{
    return this._http.api('customer.removepurpose', {'id': purposeId}).map(
      serverInfo => {
        customer.purposes.forEach((purpose: CustomerPurposeInfo, index: number) => {
          if( purpose.id == purposeId ){
            customer.purposes.slice(index, 1);
          }
        });
        
        console.log('deletePurpose', customer);
        return customer;
    });
  }

  public addTransaction(customer: Customer, info: CustomerTransactionInfo): Observable<ServerInfo>{
    let data = {
      'customer_id': customer.id, 'customerpurpose_id': info.customerPurposeId,
      'bank_id': info.bank.id, 'type_id': info.method.id,
      'value': info.value, 'netAmount': info.netAmount,
      'date': info.date.toJSON(), 'remark': info.remark,
      'salesman': info.salesman
    };

    return this._http.api('customer.addpayment', data).map(
      serverInfo => {
        info.id = serverInfo.data.id;
        customer.transactions.push(info);
        return serverInfo;
      }
    );
  }

  public deleteTransaction(customer: Customer, transactionId: number): Observable<Customer>{
    return this._http.api('customer.removepayment', {'id': transactionId}).map(
      serverInfo => {
        customer.transactions.forEach((transaction: CustomerTransactionInfo, index: number) => {
          if( transaction.id == transactionId ){
            customer.transactions.slice(index, 1);
          }
        });

        return customer;
      }
    );
  }

  public joinedPurposes(customer: Customer): Observable<CustomerPurposeInfo[]>{
    return this._http.api('customer.listpurposes', {"id": customer.id}).map(
      serverInfo => {
        let purposes: CustomerPurposeInfo[] = serverInfo.data.purposes.map(
          data => <CustomerPurposeInfo>{ 
            'id': data.id,
            'purpose': {'id': data.purpose_id, 'name': data.purpose_name},
            'date': new Date(data.remindDate),
            'amount': isNaN(+data.amount) ? 0 : +data.amount,
            'paid': isNaN(+data.paid) ? 0 : +data.paid,
            'balance': isNaN(+data.balance) ? 0 : +data.balance,
            'remark': data.remark
          }
        );
        customer.purposes = purposes;
        
        return purposes;
      }
    );
  }

  public paymentsHistory(customer: Customer): Observable<CustomerTransactionInfo[]>{
    return this._http.api('customer.paymentshistory', {'id': customer.id}).map(
      serverInfo => {
        console.log('Payments...', serverInfo.data.payments);
        let transactions: CustomerTransactionInfo[] = serverInfo.data.payments.map(
          data => <CustomerTransactionInfo>{
            id: data.id, customerPurposeId: data.customerpurpose_id,
            bank: {'id': data.bank_id, 'name': data.bank_name},
            method: {'id': data.type_id, 'name': data.type_name},
            date: new Date(data.paymentDate),
            salesman: data.salesman, remark: data.remark,
            currency: data.currency, value: data.value, netAmount: data.netAmount
          }
        );

        customer.transactions = transactions;

        return transactions;
      }
    );
  }

  /**
   * Save customer personal detail.
   * If customer id is not provided, create new customer instead.
   * 
   * @param Customer target customer info.
   * 
   * @access public
   * @return Observable<ServerInfo>
   */
  public save(customer: Customer): Observable<ServerInfo>{
    let data = JSON.parse(JSON.stringify(customer));
    return this._http.api('customer.save', data);
  }

  /**
   * Search customers
   */
  public search(search: string, limit: number, offset: number): Observable<Customer[]>{
    if( !limit ){ limit = 25; }
    if( !offset ){ offset = 0; }

    let data = { search: search, limit: limit, offset: offset }; 
    return this._http.api('customer.search', data).map(
      serverInfo => <Customer[]> serverInfo.data.customers
    );
  }
}
