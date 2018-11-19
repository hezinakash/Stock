import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StockStatusModule, GlobalQuote } from 'src/app/modules/stock-status/stock-status/stock-status.module';


@Injectable({
  providedIn: 'root'
})
export class AlpaVantageService {

  queryUrl = 'https://www.alphavantage.co/query?';
  history_function = 'TIME_SERIES_INTRADAY';
  history_interval = '60min';
  status_function = 'GLOBAL_QUOTE';
  key = 'V9VZOXL8HM3GLHSH';
  // `${this.baseUrl}query?function=${this.function}&symbol=${symbol}&interval=${this.interval}&apikey=${this.key}`;

  constructor(private http: HttpClient) { }

  getStatus(symbol: string) {
    // tslint:disable-next-line:prefer-const
    const statusUrl = `${this.queryUrl}function=${this.status_function}&symbol=${symbol}&apikey=${this.key}`;

    return this.http.get<GlobalQuote>(statusUrl)
                    .pipe(
                      map((res: GlobalQuote) =>  new StockStatusModule(res['Global Quote'])                      )
                      );
  }
}
