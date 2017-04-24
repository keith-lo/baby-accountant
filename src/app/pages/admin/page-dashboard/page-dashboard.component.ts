import { Component, OnInit } from '@angular/core';

import { TransactionsService, AccountReceivalbe, PaymentTransaction } from '../../../services/transactions/transactions.service';

import { HttpService } from '../../../services/http/http.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.sass'],
  providers: [HttpService, TransactionsService]
})
export class PageDashboardComponent implements OnInit {
  //The starting date of dashbaord reports
  public fromDate: Date = new Date();

  //The ending date of dashboard reports
  public toDate: Date = new Date();

  public datetimeOpt = {
    autoclose: true,
    icon: 'fa fa-calendar'
  };

  public excelFormData = {
    fromDate: new Date(),
    toDate: new Date(),
    accessToken: null,
    url: null
  }

  public arTransactions: AccountReceivalbe[] = [];
  public customerTransactions: PaymentTransaction[] = [];


  public barChart = {
    labels: [], data: []
  };

  constructor(private _transactions: TransactionsService, private _http: HttpService) { }

  ngOnInit() {
    //To the first day of this month
    this.fromDate = new Date();
    this.fromDate.setDate(1);
    this.fromDate.setMonth(this.fromDate.getMonth());
    
    //The last day of 6 months later
    this.toDate = new Date();
    this.toDate.setDate(0);
    this.toDate.setMonth(this.toDate.getMonth()+6);

    this._redrawReport();

    this.excelFormData = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      accessToken: this._http.getAccessToken(),
      url: this._http.getApiUrl()
    }
  }

  public onDateChanged(){
    this.excelFormData.fromDate = this.fromDate;
    this.excelFormData.toDate = this.toDate;

    this._redrawReport();
  }

  private _redrawReport(): void{
    //Stop to redraw the report if date format is incorrect.
    if( this.fromDate > this.toDate ){ return; }

    this._getPaymentTransactions();
    this._getAccountsReceivable();
  }

  private _getPaymentTransactions(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this._transactions.listReceivedPayments(this.fromDate, this.toDate).subscribe(
        transactions => {
          this.customerTransactions = transactions;
          resolve(true);
        }
      );
    });
  }

  private _getAccountsReceivable(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this._transactions.listAccountsReceivable(this.fromDate, this.toDate)
      .subscribe(transactions => {
        this.arTransactions = transactions
        resolve(true);
      });
    });
    
  }

}
