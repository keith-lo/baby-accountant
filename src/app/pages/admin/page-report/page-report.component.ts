import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-report',
  templateUrl: './page-report.component.html',
  styleUrls: ['./page-report.component.sass']
})
export class PageReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('report component loaded.');
  }

}
