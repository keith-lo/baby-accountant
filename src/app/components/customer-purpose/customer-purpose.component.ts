import { Component, OnInit, Input } from '@angular/core';

import { Customer, CustomerPurposeInfo, CustomersService } from '../../services/customers/customers.service';
import { PurposesService, PurposeInfo } from '../../services/purposes/purposes.service';

import { HttpService } from '../../services/http/http.service';

interface AddPurposeForm{
  _action: string;
  _id: number;
  purpose: number;
  date: Date;
  amount: number;
  remark: string;
}
interface DeletePurposeForm{
  purpose: CustomerPurposeInfo;
}

interface CounterInfo{
  amount: number; paid: number; balance: number;
}

@Component({
  selector: 'app-customer-purpose',
  templateUrl: './customer-purpose.component.html',
  styleUrls: ['./customer-purpose.component.sass'],
  providers: [CustomersService, PurposesService, HttpService]
})
export class CustomerPurposeComponent implements OnInit {
  @Input() public customer: Customer;

  public purposes: PurposeInfo[];
  public counter: CounterInfo = <CounterInfo>{'amount':0,'paid':0,'balance':0};
  public today: Date = new Date();
  public purposeForm: AddPurposeForm = <AddPurposeForm>{};
  public deleteForm: DeletePurposeForm = <DeletePurposeForm>{};

  constructor(
    private _purposesService: PurposesService,
    private _customersService: CustomersService
  ) { }

  ngOnInit() {
    //Collect purposes list for adding items used.
    this.purposeForm = {'_action': 'new', '_id': null, 'purpose': null,'date': new Date(), 'amount': null, 'remark': null}
    this._purposesService.list().subscribe( 
      purposes => {
        this.purposes = purposes;
        if( purposes.length > 0 ){
          this.purposeForm.purpose = 0;
        }
    });

    if( !this.customer.purposes ){ this.customer.purposes = []; }
    this._customersService.joinedPurposes(this.customer).subscribe(
      () => {

        this.counter = {'amount': 0, 'paid': 0, 'balance': 0};

        this.customer.purposes.forEach(purpose => {
          
          this.counter.amount += purpose.amount;
          this.counter.paid += purpose.paid;
          this.counter.balance += purpose.balance;
        });
      }
    );
  }

  public onPurposeModalSave(modal: any): void{
    let action: string = this.purposeForm._action;

    let index = this.purposeForm.purpose;
    let selectedPurpose: PurposeInfo = this.purposes[index];

    if( action == 'new' ){
      this._createNewCustomerPurpose(selectedPurpose, modal);
    }else{
      this._editCustomerPurpose(selectedPurpose, modal);
    }
  }

  public onAddCustomerPurpose(modal: any){
    this.purposeForm = {'_action': 'new', '_id': null, 'purpose': 0,'date': new Date(), 'amount': null, 'remark': null}
    modal.open();
  }

  public onEditCustomerPurpose(index: number, modal: any){
    let customerPurpose: CustomerPurposeInfo = this.customer.purposes[index];

    let selectedPurpose: number = 0;
    this.purposes.forEach((purpose: PurposeInfo, index: number) => {
      if( purpose.id == customerPurpose.purpose.id ){ 
        selectedPurpose = index;
      }
    });

    this.purposeForm = {
      '_action': 'edit', '_id': customerPurpose.id,
      'purpose': selectedPurpose,
      'date': customerPurpose.date,
      'amount': customerPurpose.amount, 
      'remark': customerPurpose.remark
    }

    modal.open();
  }

  public onDeleteCustomerPurpose(index: number, modal: any){
    this.deleteForm = {'purpose': this.customer.purposes[index]};

    modal.open();
  }
  public onConfirmedDelete(modal: any){
    this._customersService.deletePurpose(this.customer, this.deleteForm.purpose.id).subscribe(
      () => modal.close()
    );
  }

  public onPurposeChanged(value: string): void{
    this.purposeForm.date = new Date(value);
  }

  private _createNewCustomerPurpose(selectedPurpose: PurposeInfo, modal: any): void{
    let customerPurpose = <CustomerPurposeInfo>{
      'purpose': selectedPurpose,
      'date': this.purposeForm.date,
      'amount': this.purposeForm.amount,
      'remark': this.purposeForm.remark
    };

    this._customersService.addPurpose(this.customer, customerPurpose).subscribe(
      () => modal.close()
    );
  }

  private _editCustomerPurpose(selectedPurpose: PurposeInfo, modal: any): void{
    let customerPurpose = <CustomerPurposeInfo>{
      'id': this.purposeForm._id,
      'purpose': selectedPurpose,
      'date': this.purposeForm.date,
      'amount': this.purposeForm.amount,
      'remark': this.purposeForm.remark
    };

    this._customersService.editPurpose(this.customer, customerPurpose).subscribe(
      () => modal.close()
    );
  }

}
