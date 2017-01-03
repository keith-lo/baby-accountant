import { Component, OnInit } from '@angular/core';

import { TransactionsService, AccountReceivalbe, PaymentTransaction } from '../../../services/transactions/transactions.service';
import { HttpService } from '../../../services/http/http.service';


@Component({
  selector: 'app-page-report',
  templateUrl: './page-report.component.html',
  styleUrls: ['./page-report.component.sass'],
  providers: [HttpService, TransactionsService]
})
export class PageReportComponent implements OnInit {
  //The starting date of dashbaord reports
  public fromDate: Date = new Date();

  //The ending date of dashboard reports
  public toDate: Date = new Date();

  public reportData: any = [];

  constructor(private _transactions: TransactionsService) { }

  ngOnInit() {
    //To the first day of this month
    this.fromDate = new Date();
    this.fromDate.setDate(1);
    this.fromDate.setMonth(this.fromDate.getMonth());
    
    //The last day of 6 months later
    this.toDate = new Date();
    this.toDate.setDate(0);
    this.toDate.setMonth(this.toDate.getMonth()+5);

    this._redrawReport();    
  }

  private _redrawReport(): void{
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
      }
    );
  }

}
