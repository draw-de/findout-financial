$(document).ready(function () {
  $(function () {
    var availableTags = ["AAPL", "IBM", "FB", "AMZN", "MSFT", "SHOP"];
    $("#symbols").autocomplete({
      source: availableTags,
    });
  });
  $("#submitSymbol").on("click", function () {
    showStock($("#symbols").val(), $("#options option:selected").val());
  });
  const apiKey = "IDVGEA9LHR3V88Y9";
  function showStock(symbol, option) {
    // APIKEY

    // TIME SERIES: INTRADAY, DAILY, DAILY_ADJUSTED, WEEKLY, WEEKLY_ADJUSTED, MONTHLY, MONTHLY_ADJUSTED
    const timeSeries = "TIME_SERIES_INTRADAY";
    // 1min, 5min, 15min, 30min, 60min
    const timeIntervals = "5min";
    // For AJAX
    const url = `https://www.alphavantage.co/query?function=${option}&symbol=${symbol}&interval=${timeIntervals}&apikey=${apiKey}`;
  
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (obj) {
      const chart = new SimpleStockChart();
      chart.element = document.getElementById("chart");
      chart.key = "IDVGEA9LHR3V88Y9";
      chart.ticker = "AAPL";
      chart.style.width = "70%";
      chart.style.height = "520px";
      chart.draw();
    });
  }

  function symbolInfo(symbol) {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${apiKey}`;

    $.ajax({
      url: url,
      method: "GET",
    }).then(function (obj) {
      const symbol = obj.bestMatches[0]["1. symbol"];
      const name = obj.bestMatches[0]["2. name"];
      const type = obj.bestMatches[0]["3. type"];
      const region = obj.bestMatches[0]["4. region"];
      const marketOpen = obj.bestMatches[0]["5. marketOpen"];
      const marketClose = obj.bestMatches[0]["6. marketClose"];
      const timezone = obj.bestMatches[0]["7. timezone"];
      const currency = obj.bestMatches[0]["8. currency"];

      $("#stock").html(
        `<h3>${name} (${symbol})</h3><br><ul><li>Type: ${type}</li><br><li> Region: ${region}</li><br><li>Market opens: ${marketOpen}</li><br><li>Market closes: ${marketClose}</li><br><li>Timezone: ${timezone}</li><br><li>Currency: ${currency}</li><ul>`
      );
    });
  }
});
