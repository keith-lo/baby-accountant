import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from 'ng2-translate';

import { Customer, CustomersService } from '../../services/customers/customers.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-page-newcustomer',
  templateUrl: './page-newcustomer.component.html',
  styleUrls: ['./page-newcustomer.component.sass'],
  providers: [CustomersService, HttpService]
})
export class PageNewcustomerComponent implements OnInit {
  
  public selectedCustomer: Customer;
  public title: string;

  private _params: any;

  constructor(
    private _customersService: CustomersService,
    private _translate: TranslateService,
    private _router: Router, private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectedCustomer = new Customer(); //Initialize a blank customer.

    this._translate.get('customers.newCustomer').subscribe(
      data => this.title = data
    );
    this._params = this._activatedRoute.params.subscribe(params => {
      let id: number = parseInt(params['id']);

      id = 10;
      if( id ){ this._getCustomerInfo(id); }
    });
  }
  ngOnDestroy() {
    this._params.unsubscribe();
  }

  public onCustomerCreated(data: {'customer': Customer}): void{
    this.selectedCustomer = data.customer;
    this._setTitle();
    //this._router.navigate(['/customers', data.customer.id]);
  }

  private _getCustomerInfo(id:number): void{
    this._customersService.get(id).subscribe(
      customer => {
        this.selectedCustomer = customer
        this._setTitle();
      }
    );
  }

  private _setTitle(){
    if( this.selectedCustomer.referenceNumber ){
      this.title = '#'+this.selectedCustomer.referenceNumber;
    }
  }

}
