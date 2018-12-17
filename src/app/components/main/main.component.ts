import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  title = "Stocks";
  stocks = [
    {
      name: "S&P 500",
      symbol: "INX"
    },
    {
      name: "Dow 30",
      symbol: "DJI"
    },
    {
      name: "Nasdaq",
      symbol: "IXIC"
    },
    {
      name: "Amazon.com",
      symbol: "AMZN"
    },
    {
      name: "Alphabet Inc",
      symbol: "GOOGL"
    }
  ];
  selectedStocks = [];

  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  onSelect(event) {
    if (event.value && event.value.length > 2) {
      event.source.value = event.source.value.slice(0, 2);
      this.toastr.error(
        "For demo version you can select up to 2 stocks at a time!",
        "Limit",
        {
          positionClass: "toast-top-center"
        }
      );
    }

    this.selectedStocks = this.stocks.filter((stock, index) => {
      return event.source.value.includes(index);
    });
  }
}
