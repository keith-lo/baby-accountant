import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  private search: string;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  public onSearchSubmitted(): void{
    if( this.search.length >= 2 ){
      this._router.navigate([`/admin/customer-search/${this.search}`]);
    }
  }

}
