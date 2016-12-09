import { Injectable } from '@angular/core';

import { HttpService, ServerInfo } from '../http/http.service';
import { Observable } from 'rxjs/Observable';

import { PurposeInfo } from '../purposes/purposes.service';

export class Customer{
  public referenceNumber: string;
  public id: number;
  public name: string;
  public age: number;
  public tel: string;
  public program: string;
  public remark: string;

  public purposes: CustomerPurposeInfo[];

  constructor(){}

  public isValid(): boolean{
    return ( this.referenceNumber && this.name ) ? true : false ;
  }
}

export interface CustomerPurposeInfo{
  id: number;
  purpose: PurposeInfo;
  remark: string;
  date: Date;
  amount: number;
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

  public deletePurpose(customer: Customer, purposeId: number): Observable<ServerInfo>{
    return this._http.api('customer.removepurpose', {'id': purposeId}).map(
      serverInfo => {
        customer.purposes.forEach((purpose: CustomerPurposeInfo, index: number) => {
          if( purpose.id == purposeId ){
            customer.purposes.slice(index, 1);
          }
        });
        
        return serverInfo;
      }
    );
  }

  public joinedPurposes(customer: Customer): Observable<PurposeInfo[]>{
    return this._http.api('customer.listpurposes', {"id": customer.id}).map(
      serverInfo => {
        let purposes = [];

        serverInfo.data.purposes.map(data => {
          let purposeInfo = <CustomerPurposeInfo>{
            'id': data.id,
            'purpose': {'id': data.purpose_id, 'name': data.purpose_name},
            'date': new Date(data.remindDate),
            'amount': data.amount,
            'remark': data.remark
          };

          purposes.push(purposeInfo);
        });

        customer.purposes = purposes;
        
        return purposes;
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
