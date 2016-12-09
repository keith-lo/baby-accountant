import { Component, OnInit, Input } from '@angular/core';

import { Customer, CustomersService } from '../../services/customers/customers.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-customer-transactions',
  templateUrl: './customer-transactions.component.html',
  styleUrls: ['./customer-transactions.component.sass'],
  providers: [CustomersService, HttpService]
})
export class CustomerTransactionsComponent implements OnInit {
  @Input() public customer: Customer;

  public totalReceived: number = 0;

  constructor(
    private _customersService : CustomersService
  ) { }

  ngOnInit() {
    if( !this.customer.transactions ){ this.customer.transactions = []; }
    this._customersService.paymentsHistory(this.customer).subscribe(
      () => {
        this.customer.transactions.forEach(transaction => {
          this.totalReceived += +transaction.netAmount;
        });
      }
    );
  }

}
