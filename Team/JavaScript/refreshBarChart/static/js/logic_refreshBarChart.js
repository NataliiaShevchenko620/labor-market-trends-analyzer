/***********
  FUNCTIONS
************/

// Refresh bar chart
function refreshBarChart(state_code, industry_code, reduction) {

  // Emulate API call and get data from the predefined JSON
  let response = get_unemployment_rate;

  console.log(response);

  // Declare empty variables
  let areas, unemploymentRate, forecastedUnemploymentRate, averageUnemploymentRate, averageLine, plotData;

  // Read data from API response

  // Reverse arrays to show them alphabetically

  // Set average line. Use mode: 'lines', type: 'scatter'
  averageLine = 

  // Horizontal bar for Unemployment rate
  let barUnemploymentRate = 

  // Horizontal bar for Forecasted Unemployment rate
  let barForecastedUnemploymentRate = 

  // Define plot data
  plotData = [barForecastedUnemploymentRate, barUnemploymentRate, averageLine];

  // Layout configuration. Use barmode: 'group', bargap: 0.2
  let layout = 

  Plotly.newPlot('bar-chart', plotData, layout);
}

// Initial page load
function init() {
  // Set default values for main variables
  let state_code = "US";
  let industry_code = "1011";
  let reduction = 15;

  // Call refresh_page function
  refreshBarChart(state_code, industry_code, reduction);
}

/***********
  INIT
************/
//  Call init() function - this code will be executed once, during the initial page load
init();