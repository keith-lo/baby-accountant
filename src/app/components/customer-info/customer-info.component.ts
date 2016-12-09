import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Customer, CustomersService } from '../../services/customers/customers.service';
import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.sass'],
  providers: [CustomersService, HttpService]
})
export class CustomerInfoComponent implements OnInit {
  @Input() public customer: Customer;

  @Output() public customerSaved: EventEmitter<{customer: Customer}> = new EventEmitter();
  @Output() public customerCreated: EventEmitter<{customer: Customer}> = new EventEmitter();

  private isLoading: boolean = false;
  public errMsg: string;

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    if( !this.customer ){
      this.customer = new Customer();
    }
  }

  /**
   * When form any changes.
   * 
   * Save the customer information
   * Create as a new customer if id doesn't provided.
   */
  public onFormChanged(): void{
    //Skip the save progress if customer is not complete yet.
    if( !this.customer.isValid() ){ return ; }

    let isNewCustomer: boolean = ( !this.customer.id ) ? true : false;
    
    this.isLoading = true;

    this.customerService.save(this.customer)
    .subscribe(serverInfo => {
      this.isLoading = false;

      let customerId: number = parseFloat(serverInfo.data.id);
      this.customer.id = customerId;

      if( isNewCustomer ){
        this.customerCreated.emit({'customer': this.customer});
      }else{
        this.customerSaved.emit({'customer': this.customer}); 
      }
    });
  }

}
