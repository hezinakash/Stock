import { StockStatusModule } from 'src/app/modules/stock-status/stock-status/stock-status.module';
import { AlpaVantageService } from './../../services/alpaVantage-service/alpa-vantage.service';
import { Component, OnInit, Input } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
// tslint:disable-next-line:no-input-rename
@Input('symbol') symbol: string;
// tslint:disable-next-line:no-input-rename
@Input('name') name: string;

  value: number;
  trend: number;
  precent: number;
  // chart: TODO
  interval: Observable<StockStatusModule>;

  constructor(private service: AlpaVantageService) {
   }

  ngOnInit() {
    this.interval = interval(36000)
    .pipe(
      startWith(0),
      switchMap(() => this.service.getStatus(this.symbol))
    );

    this.interval.subscribe(stock => {
      this.value = stock.price;
      this.trend = stock.change;
      this.precent = stock.change_percent;
    });

    this.service.getHistory(this.symbol);
  }

  calcTrendPrec() {
    return (this.trend / this.value) * 100;
  }
}
