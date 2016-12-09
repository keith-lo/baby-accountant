import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Customer, CustomersService } from '../../../../services/customers/customers.service';
import { HttpService } from '../../../../services/http/http.service';

@Component({
  selector: 'app-page-searchcustomers',
  templateUrl: './page-searchcustomers.component.html',
  styleUrls: ['./page-searchcustomers.component.sass'],
  providers: [CustomersService, HttpService]
})
export class PageSearchcustomersComponent implements OnInit {
  private _params: any;

  private _search: string;
  private _limit: number = 50;
  private _offset: number = 0;

  public customers: Customer[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _customersService: CustomersService
  ) { }

  ngOnInit() {    
    this._params = this._activatedRoute.params.subscribe(params => {
      this._search = ( params['by'] || '' );
      
      this._customersService.search(this._search, this._limit, this._offset).subscribe(
        customers => this.customers = customers
      );
    });
  }

  ngOnDestroy() {
    this._params.unsubscribe();
  }

  public onCustomerClicked(customer: Customer){
    this._router.navigate([`/admin/customer/${customer.id}`]);
  }

}
