import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  private search: string;
  public today: Date;
  public datetimeOpt = {
    autoclose: true,
    icon: 'fa fa-calendar'
  };
  public defaultSteps: number;
  public targetDate: Date;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.today = new Date();
    this.defaultSteps = 80;

    this.calTargetDate();
  }

  public onSearchSubmitted(): void{
    if( this.search.length >= 2 ){
      this._router.navigate([`/admin/customer-search/${this.search}`]);
    }
  }

  public calTargetDate(): void{
    this.targetDate = new Date(this.today.getTime());
    this.targetDate.setDate(this.targetDate.getDate() + this.defaultSteps);
  }

}
