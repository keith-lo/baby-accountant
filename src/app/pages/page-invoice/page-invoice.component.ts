import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Customer, CustomersService } from '../../services/customers/customers.service';
import { TransactionsService, AccountReceivalbe, PaymentTransaction } from '../../services/transactions/transactions.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-page-invoice',
  templateUrl: './page-invoice.component.html',
  styleUrls: ['./page-invoice.component.sass'],
  providers: [TransactionsService, CustomersService, HttpService]
})
export class PageInvoiceComponent implements OnInit {

  private _params : any;

  public customer: Customer = new Customer();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _transactions: TransactionsService,
    private _customer: CustomersService
  ) { }

  ngOnInit() {
    this._params = this._activatedRoute.params.subscribe(params => {
      let customerId: number = parseInt(( params['id'] || '' ));
      
      this._customer.get(customerId).subscribe(
        customer => {
          this.customer = customer
          this._customer.joinedPurposes(customer).subscribe(
            purposes => {
              this.customer = customer;
              console.log(this.customer);
            }
          );
        }
      );
    });
  }

  ngOnDestroy() {
    this._params.unsubscribe();
  }

}
