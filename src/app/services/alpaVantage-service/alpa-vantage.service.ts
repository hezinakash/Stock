import { StockStatus, GlobalQuote } from './alpa-vantage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

export interface GlobalQuote {
  'Global Quote': StockStatus;
}

export class StockObj {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  latest_trading_day: string;
  previous_close: number;
  change: number;
  change_percent: number;

  constructor(status: StockStatus) {
    this.symbol = status['01. symbol'];
    this.open = status['02. open'];
    this.high = status['03. high'];
    this.low = status['04. low'];
    this.price = status['05. price'];
    this.volume = status['06. volume'];
    this.latest_trading_day = status['07. latest trading day'];
    this.previous_close = status['08. previous close'];
    this.change = status['09. change'];
    this.change_percent = Number.parseFloat(status['10. change percent'].split('%')[0]);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AlpaVantageService {

  baseUrl = 'https://www.alphavantage.co/';
  function = 'TIME_SERIES_INTRADAY';
  key = 'V9VZOXL8HM3GLHSH';
  interval = '1min';
  // `${this.baseUrl}query?function=${this.function}&symbol=${symbol}&interval=${this.interval}&apikey=${this.key}`;

  constructor(private http: HttpClient) { }

  getStock(symbol: string) {
    // tslint:disable-next-line:prefer-const
    const fullUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=' + this.key;

    return this.http.get<GlobalQuote>(fullUrl)
                    .pipe(map( (res: GlobalQuote) => new StockObj(res['Global Quote'])));
  }
}
