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
  public onChangeCountDate(date:string): void{
    this.today = new Date(date);
    this.calTargetDate();
  }

  public calTargetDate(): void{
    console.log('cal days');
    this.targetDate = new Date(this.today.getTime());
    console.log('today is ', this.today);

    this.targetDate.setDate(this.targetDate.getDate() + this.defaultSteps);
    console.log('target to ', this.targetDate);
  }

}
