import { Component, OnInit, Input } from '@angular/core';

import { AccountReceivalbe } from '../../../services/transactions/transactions.service';

@Component({
  selector: 'app-ar-list',
  templateUrl: './ar-list.component.html',
  styleUrls: ['./ar-list.component.sass']
})
export class ArListComponent implements OnInit {
  @Input()
  public transactions: AccountReceivalbe[] = [];
  constructor() { }

  ngOnInit() {
  }

  public onTransactionClicked(transaction: AccountReceivalbe){
    let refNo: string = transaction.referenceNumber;
    console.log("Go to customer : "+refNo);
  }

}
