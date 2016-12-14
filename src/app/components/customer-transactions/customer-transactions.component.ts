import { Component, OnInit, Input } from '@angular/core';

import { Customer, CustomersService, CustomerPurposeInfo, AddTransactionInfo } from '../../services/customers/customers.service';
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
  public addTransactionForm: AddTransactionInfo = <AddTransactionInfo>{};
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
      () => {
        this.customer.transactions.forEach(transaction => {
          this.totalReceived += +transaction.netAmount;
        });
      }
    );

    this._getBankInfo();

    this.addTransactionForm = <AddTransactionInfo>{
      currency: '', date: new Date(), value:null, netAmount: null,
      bankId:null, methodId:null, customerPurposeId: null
    };
  }

  public onAddTransaction(model: any): void{
    model.open();
  }

  public onAddTransactionInfoSubmitted(model): void{
    console.log("Add form object");
    console.log(this.addTransactionForm);

    this._customersService.addTransaction(this.customer,this.addTransactionForm).subscribe(
      () => model.close() 
    );
    
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
    let bankIndex = arr[0]; let methodIndex = arr[1];
    let bankInfo: BankInfo = this.banks[bankIndex];

    this.addTransactionForm.bankId = bankInfo.id;
    this.addTransactionForm.methodId = bankInfo.methods[methodIndex].id;
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
