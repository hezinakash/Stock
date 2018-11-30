import { StockStatus } from './../../models/stock-status';
import { AlpaVantageService } from './../../services/alpaVantage-service/alpa-vantage.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { StockHistory, StockDetails } from './../../models/stock-history';
import { Chart } from 'angular-highcharts';

const STATUS_INTERVAL = 60 * 1000;
const HISTORY_INTERVAL = 60 * 60 * 1000;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('symbol') symbol: string;
  // tslint:disable-next-line:no-input-rename
  @Input('name') name: string;

  value: number;
  trend: number;
  precent: number;
  stockChart: Chart;
  statusInterval: Observable<StockStatus>;
  historyInterval: Observable<StockHistory>;
  statusSubscrptions: Subscription;
  historySubscription: Subscription;

  constructor(private service: AlpaVantageService) {}

  ngOnInit() {
    this.setStatusInterval();
    this.setHistoryInterval();
  }

  ngOnDestroy() {
    this.statusSubscrptions.unsubscribe();
    this.historySubscription.unsubscribe();
  }

  setStatusInterval() {
    this.statusInterval = interval(STATUS_INTERVAL).pipe(
      startWith(0),
      switchMap(() => this.service.getStatus(this.symbol))
    );

    this.statusSubscrptions = this.statusInterval.subscribe(stock =>
      this.updateStockStatus(stock),
      err => console.log(err)
      );

  }

  updateStockStatus(update: StockStatus) {
    this.value = update.price;
    this.trend = update.change;
    this.precent = update.changePercent;
  }

  setHistoryInterval() {
    this.historyInterval = interval(HISTORY_INTERVAL).pipe(
      startWith(0),
      switchMap(() => this.service.getHistory(this.symbol))
    );

    this.historySubscription = this.historyInterval.subscribe(
      history => this.updateChart(history),
      err => console.log(err)
      );
  }

  updateChart(history: StockHistory) {
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

  getStockHistoryDetails(history: StockHistory) {
    const details = [];

    history.timeSeriesMap.forEach((data: StockDetails, timeStamp: string) => {
      if (timeStamp && data) {
        const date = new Date(timeStamp);
      details.push([date.getTime(), +data['4. close']]);
      }
    });

    return details;
  }
}
