import { Intraday, StockHistory } from "./../../models/stock-history";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { StockStatus, GlobalQuote } from "./../../models/stock-status";
import { Observable } from "rxjs";

const HISTORY_FUNC = "TIME_SERIES_INTRADAY";
const STATUS_FUNC = "GLOBAL_QUOTE";
const API_KEY = "V9VZOXL8HM3GLHSH";

@Injectable({
  providedIn: "root"
})
export class AlpaVantageService {
  queryUrl = "https://www.alphavantage.co/query?";
  historyInterval = "60min";

  constructor(private http: HttpClient) {}

  getStatus(symbol: string): Observable<StockStatus> {
    // tslint:disable-next-line:prefer-const
    const statusUrl = `${
      this.queryUrl
    }function=${STATUS_FUNC}&symbol=${symbol}&apikey=${API_KEY}`;

    return this.http.get<GlobalQuote>(statusUrl).pipe(
      map((res: GlobalQuote) => {
        if (!(res && res["Global Quote"])) {
          throw new Error(res["Note"]);
        } else {
          return new StockStatus(res["Global Quote"]);
        }
      })
    );
  }

  getHistory(symbol: string): Observable<StockHistory> {
    // tslint:disable-next-line:max-line-length
    const historyUrl = `${
      this.queryUrl
    }function=${HISTORY_FUNC}&symbol=${symbol}&interval=${
      this.historyInterval
    }&apikey=${API_KEY}`;

    return this.http.get<Intraday>(historyUrl).pipe(
      map((res: Intraday) => {
        if (res["Note"]) {
          throw new Error(res["Note"]);
        } else {
          return new StockHistory(res);
        }
      })
    );
  }
}
