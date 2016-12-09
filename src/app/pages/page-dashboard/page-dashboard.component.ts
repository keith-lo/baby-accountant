import { Component, OnInit } from '@angular/core';

import { TransactionsService, AccountReceivalbe } from '../../services/transactions/transactions.service';
import { HttpService } from '../../services/http/http.service';

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

  public arTransactions: AccountReceivalbe[] = [];

  constructor(private _transactions: TransactionsService) { }

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
  }

  public onFromDateChanged(value: string, nextElement: HTMLElement){
    this.fromDate = new Date(value);
    nextElement.focus();  //Focus to #toDate
    this._redrawReport();
  }

  public onToDateChanged(value: string){
    this.toDate = new Date(value);
    this._redrawReport();
  }

  private _redrawReport(): void{
    //Stop to redraw the report if date format is incorrect.
    if( this.fromDate > this.toDate ){ return; }

    this._getAccountsReceivable();
  }

  private _getAccountsReceivable(): void{
    this._transactions.listAccountsReceivable(this.fromDate, this.toDate)
    .subscribe(transactions => {
      this.arTransactions = transactions;
    });
  }

}
