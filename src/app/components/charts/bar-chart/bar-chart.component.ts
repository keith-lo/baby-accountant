import { Component, OnInit, Input } from '@angular/core';


export class BarChartData{
  data: number[];
  label: string;
}

export class BarChartInfo{
  showLegend: boolean = true;
  label: string[];
  data: BarChartData[];
}

export class BarChartOptions{
  scaleShowVerticalLines?: boolean; 
  responsive?: boolean
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  
  constructor() { }

  ngOnInit(){
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }


}
