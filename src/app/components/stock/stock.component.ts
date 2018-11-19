import { StockDetails, Intraday } from './../../modules/stock-history/stock-history/stock-history.module';
import { StockStatusModule } from 'src/app/modules/stock-status/stock-status/stock-status.module';
import { AlpaVantageService } from './../../services/alpaVantage-service/alpa-vantage.service';
import { Component, OnInit, Input } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { StockHistoryModule } from 'src/app/modules/stock-history/stock-history/stock-history.module';
import { Chart } from 'angular-highcharts';

const STATUS_INTERVAL = 60 * 1000;
const HISTORY_INTERVAL = 60 * 60 * 1000;

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
  stockChart: Chart;
  status_interval: Observable<StockStatusModule>;
  history_interval: Observable<StockHistoryModule>;

  constructor(private service: AlpaVantageService) {}

  ngOnInit() {
    this.setStatusInterval();
    this.setHistoryInterval();
  }

  setStatusInterval() {
    this.status_interval = interval(STATUS_INTERVAL).pipe(
      startWith(0),
      switchMap(() => this.service.getStatus(this.symbol))
    );

    this.status_interval.subscribe(stock => this.updateStockStatus(stock));
  }

  updateStockStatus(update: StockStatusModule) {
    this.value = update.price;
    this.trend = update.change;
    this.precent = update.change_percent;
  }

  setHistoryInterval() {
    this.history_interval = interval(HISTORY_INTERVAL).pipe(
      startWith(0),
      switchMap(() => this.service.getHistory(this.symbol))
    );

    this.history_interval.subscribe(history => this.updateChart(history));
  }

  updateChart(history: StockHistoryModule) {
    const details = this.getStockHistoryDetails(history);

    this.stockChart = new Chart({
      chart: {
        zoomType: 'x',
        height: '65%',
        width: 130
      },
      xAxis: {
        type: 'datetime',
        visible: false
      },
      title: {
        text: ''
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Rate',
          data: details
        }
      ]
    });
  }

  getStockHistoryDetails(history: StockHistoryModule) {
    const details = [];

    history.timeSeriesMap.forEach((data: StockDetails, timeStamp: string) => {
      const date = new Date(timeStamp);
      details.push([date.getTime(), +data['4. close']]);
    });

    return details;
  }
}
