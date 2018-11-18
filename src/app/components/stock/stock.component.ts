import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'b-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
// tslint:disable-next-line:no-input-rename
@Input('symbol') symbol: string;

  value: number;
  name: string;
  trend: number;
  precent: number;
  // chart: TODO

  constructor() {
    this.name = 'S&P 500';
    this.value = 2549.33;
    this.trend = -2.74;
    this.precent = this.calcTrendPrec();
   }

  ngOnInit() {
  }

  calcTrendPrec() {
    return (this.trend / this.value) * 100;
  }
}
