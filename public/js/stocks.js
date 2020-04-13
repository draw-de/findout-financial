$(document).ready(function () {
  // APIKEY
  var apiKey = "IDVGEA9LHR3V88Y9";
  // TIME SERIES: INTRADAY, DAILY, DAILY_ADJUSTED, WEEKLY, WEEKLY_ADJUSTED, MONTHLY, MONTHLY_ADJUSTED
  var timeSeries = "TIME_SERIES_INTRADAY";
  // Use Search Endpoint to find symbols
  var symbol = "IBM";
  // 1min, 5min, 15min, 30min, 60min
  var timeIntervals = "5min";
  // For AJAX
  var url = `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&interval=${timeIntervals}&apikey=${apiKey}`;

  $.ajax({
    url: url,
    method: "GET",
  }).then(function (obj) {
    console.log(obj);
  });
});
