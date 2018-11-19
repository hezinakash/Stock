import { Intraday, StockHistoryModule } from './../../modules/stock-history/stock-history/stock-history.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { StockStatusModule, GlobalQuote } from 'src/app/modules/stock-status/stock-status/stock-status.module';
import { Observable } from 'rxjs';


const HISTORY_FUNC = 'TIME_SERIES_INTRADAY';
const STATUS_FUNC = 'GLOBAL_QUOTE';
const API_KEY = 'V9VZOXL8HM3GLHSH';

@Injectable({
  providedIn: 'root'
})
export class AlpaVantageService {

  queryUrl = 'https://www.alphavantage.co/query?';
  history_interval = '60min';

  constructor(private http: HttpClient) { }

  getStatus(symbol: string): Observable<StockStatusModule> {
    // tslint:disable-next-line:prefer-const
    const statusUrl = `${this.queryUrl}function=${STATUS_FUNC}&symbol=${symbol}&apikey=${API_KEY}`;

    return this.http.get<GlobalQuote>(statusUrl)
                    .pipe(
                      map((res: GlobalQuote) => {
                        if (!(res && res['Global Quote'])) {
                        throw new Error(res['Note']);
                        } else {
                          return new StockStatusModule(res['Global Quote']);
                        }
                      }),
                      retry(2)
                      );
  }

  getHistory(symbol: string): Observable<StockHistoryModule> {
    // tslint:disable-next-line:max-line-length
    const historyUrl = `${this.queryUrl}function=${HISTORY_FUNC}&symbol=${symbol}&interval=${this.history_interval}&apikey=${API_KEY}`;

    return this.http.get<Intraday>(historyUrl).pipe(
                    map((res: Intraday) =>  {
                        if (res['Note']) {
                          throw new Error(res['Note']);
                        } else {
                          return new StockHistoryModule(res);
                        }
                    }),
                    retry(2)
                  );
  }
}
