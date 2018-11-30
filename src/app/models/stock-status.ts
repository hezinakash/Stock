import { Inject } from '@angular/core';

export interface GlobalQuote {
    'Global Quote': StockStatus;
  }

  export interface StockStatus {
    '01. symbol': string;
    '02. open': number;
    '03. high': number;
    '04. low': number;
    '05. price': number;
    '06. volume': number;
    '07. latest trading day': string;
    '08. previous close': number;
    '09. change': number;
    '10. change percent': string;
  }


export class StockStatus {
    symbol: string;
    open: number;
    high: number;
    low: number;
    price: number;
    volume: number;
    latestTradingDay: string;
    previousClose: number;
    change: number;
    changePercent: number;

    constructor(@Inject('status') status: StockStatus) {
      this.setData(status);
    }

    setData(status: StockStatus) {
      if (status) {
        this.symbol = status['01. symbol'];
        this.open = status['02. open'];
        this.high = status['03. high'];
        this.low = status['04. low'];
        this.price = status['05. price'];
        this.volume = status['06. volume'];
        this.latestTradingDay = status['07. latest trading day'];
        this.previousClose = status['08. previous close'];
        this.change = status['09. change'];
        this.changePercent = Number.parseFloat(status['10. change percent'].split('%')[0]);
      }
    }
}
