import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stocks';
  stocks = [
    {
      name: 'S&P 500',
      symbol: 'INX'
    },
    {
      name: 'Dow 30',
      symbol: 'DJI'
    },
    {
      name: 'Nasdaq',
      symbol: 'IXIC'
    },
    {
      name: 'Amazon.com',
      symbol: 'AMZN'
    },
    {
      name: 'Alphabet Inc',
      symbol: 'GOOGL'
    }
   ];
}
