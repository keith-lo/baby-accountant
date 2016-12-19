import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AccountReceivalbe } from '../../../services/transactions/transactions.service';

@Component({
  selector: 'app-ar-list',
  templateUrl: './ar-list.component.html',
  styleUrls: ['./ar-list.component.sass']
})
export class ArListComponent implements OnInit {
  @Input()
  public transactions: AccountReceivalbe[] = [];
  
  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  public onTransactionClicked(transaction: AccountReceivalbe){
    this._router.navigate([`/admin/customer/${transaction.customerId}`]);
  }

}
