import { Component, OnInit, Input } from '@angular/core';

import { Customer, CustomersService, CustomerPurposeInfo, CustomerTransactionInfo } from '../../services/customers/customers.service';
import { TransactionsService, BankInfo, CurrencyInfo, PaymentMethodInfo } from '../../services/transactions/transactions.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-customer-transactions',
  templateUrl: './customer-transactions.component.html',
  styleUrls: ['./customer-transactions.component.sass'],
  providers: [CustomersService, TransactionsService, HttpService]
})
export class CustomerTransactionsComponent implements OnInit {
  @Input() public customer: Customer;

  public totalReceived: number = 0;

  public banks: BankInfo[] = [];
  public currencies: CurrencyInfo[] = [];
  public addTransactionForm: CustomerTransactionInfo;
  public delTransactionForm: CustomerTransactionInfo;
  public today: Date = new Date();

  public customerPurposeBalance: number;
  public selectedPurposeId: number;
  public customerPurposeDate: Date;

  constructor(
    private _customersService : CustomersService,
    private _transactionsService : TransactionsService
  ) { }

  ngOnInit() {
    if( !this.customer.transactions ){ this.customer.transactions = []; }
    if( !this.customer.purposes ){ this.customer.purposes = []; }

    this._customersService.paymentsHistory(this.customer).subscribe(
      () => this._calTotalReceived()
    );

    this._getBankInfo();

    this.addTransactionForm = <CustomerTransactionInfo>{
      id: null, currency: '', date: new Date(), value:null, netAmount: null,
      bank: <BankInfo> {id:null,name:null}, method: <PaymentMethodInfo> {id:null,name:null},
      remark: null, salesman: null
    };
    this.delTransactionForm = <CustomerTransactionInfo>{
      id: null, currency: '', date: new Date(), value:null, netAmount: null,
      bank: <BankInfo> {id:null,name:null}, method: <PaymentMethodInfo> {id:null,name:null},
      remark: null, salesman: null
    };
  }

  public openCreateDialog(model: any): void{
    model.open();
  }

  public openDeleteDialog(i: number, model: any): void{
    this.delTransactionForm = this.customer.transactions[i];
    
    model.open();
  }

  public onAddTransactionInfoSubmitted(model: any): void{
    this._customersService.addTransaction(this.customer, this.addTransactionForm)
    .subscribe(() => {
      this._calTotalReceived();
      model.close();
    });
  }

  public onConfirmedDeleteTransaction(model: any): void{
    this._customersService.deleteTransaction(this.customer, this.delTransactionForm.id)
    .subscribe((customer: Customer) => {
      this.customer = customer;
      this._calTotalReceived();
      model.close();
    });
  }

  public onSelectedPurpose(): void{
    let purpose: CustomerPurposeInfo = this.customer.purposes[this.selectedPurposeId];
    this.customerPurposeBalance = purpose.balance;
    this.customerPurposeDate = purpose.date;

    this.addTransactionForm.customerPurposeId = purpose.id;
  }

  public onTransactionChange(value: string): void{
    this.addTransactionForm.date = new Date(value);
  }

  public onSelectedBank(value: string): void{
    let arr = value.split(':');
    let bankIndex: number = +arr[0]; let methodIndex: number = +arr[1];
    let bankInfo: BankInfo = this.banks[bankIndex];

    this.addTransactionForm.bank = bankInfo;
    this.addTransactionForm.method = bankInfo.methods[methodIndex];
  }

  private _calTotalReceived(): void{
    this.totalReceived = 0;
    this.customer.transactions.forEach(transaction => {
      this.totalReceived += +transaction.netAmount;
    });
  }

  private _getBankInfo(): void{
    this._transactionsService.getBankList().subscribe(
      data => {
        this.banks = data.banks;
        this.currencies = data.currencies;
      }
    );
  }

}
