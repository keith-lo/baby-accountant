import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { TransactionsService, AccountReceivalbe, PaymentTransaction } from '../../services/transactions/transactions.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-page-invoice',
  templateUrl: './page-invoice.component.html',
  styleUrls: ['./page-invoice.component.sass'],
  providers: [TransactionsService, HttpService]
})
export class PageInvoiceComponent implements OnInit {

  private _params : any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _transactions: TransactionsService
  ) { }

  ngOnInit() {
    console.log('invoice loaded.');
    this._params = this._activatedRoute.params.subscribe(params => {
      console.log('received params', params);
      let monthStr: string = ( params['id'] || '' );
    });
  }

  ngOnDestroy() {
    this._params.unsubscribe();
  }

}
