import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PaymentTransaction } from '../../../services/transactions/transactions.service';

@Component({
  selector: 'app-ct-list',
  templateUrl: './ct-list.component.html',
  styleUrls: ['./ct-list.component.sass']
})
export class CtListComponent implements OnInit {
  @Input()
  public transactions: PaymentTransaction[] = [];

  constructor(private _router: Router) { }

  ngOnInit() {
    
  }

  public onTransactionClicked(transaction: PaymentTransaction){
    this._router.navigate([`/admin/customer/${transaction.customerId}`]);
  }

}
