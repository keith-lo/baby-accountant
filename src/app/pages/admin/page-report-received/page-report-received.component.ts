import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { TransactionsService, AccountReceivalbe, PaymentTransaction } from '../../../services/transactions/transactions.service';
import { HttpService } from '../../../services/http/http.service';

@Component({
  selector: 'app-page-report-received',
  templateUrl: './page-report-received.component.html',
  styleUrls: ['./page-report-received.component.sass'],
  providers: [TransactionsService, HttpService]
})
export class PageReportReceivedComponent implements OnInit {

  private _params: any;

  public fromDate: Date = new Date();
  public toDate: Date = new Date();

  public reportData: any = [];
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _transactions: TransactionsService
  ) { }

  ngOnInit() {
    this._params = this._activatedRoute.params.subscribe(params => {
      let monthStr: string = ( params['month'] || '' );

      if( monthStr ){
        monthStr += '-01';
        this.fromDate = new Date(monthStr);
      }else{
        let tmp: Date = new Date();
        this.fromDate = new Date(tmp.getFullYear(), tmp.getMonth(), 1);
      }

      this.toDate = new Date(this.fromDate.getTime());
      this.toDate.setMonth(this.toDate.getMonth()+1);
      this.toDate.setDate(0);

      this._transactions.getReportRevenue(this.fromDate, this.toDate).subscribe(
        serverInfo => {
          let reportData: any = serverInfo.data.data;

          let fields: any[] = Object.keys(reportData),
            dataArr = [];

          fields.forEach((key: string) => {
            let purposesData: any = serverInfo.data.data[key].purposes;
            let purposeFields: any[] = Object.keys(purposesData),
              purposeDataArr = [];

            purposeFields.forEach(purpose => purposeDataArr.push(purposesData[purpose]));

            dataArr.push({'name': key, 'purposes': purposeDataArr});
          });

          this.reportData = dataArr;
      });
    });
  }

  ngOnDestroy() {
    this._params.unsubscribe();
  }

}
