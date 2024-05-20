/***********
  FUNCTIONS
************/

// Refresh line chart
function refreshLineChart(state_code, industry_code, reduction) {

  // Emulate API call and get data from the predefined JSON
  let response = get_employment_trend;
  
  console.log(response);

  // Declare empty variables
  let years, trend, trace, plotData;

  // Read data from API response
  

  // Define trend and trace. Use type: 'scatter', mode: 'lines+markers'

  // Define plot data
  plotData = [trace] 
  
  // Layout configuration
  let layout = 

  Plotly.newPlot('line-chart', plotData, layout);
}

// Initial page load
function init() {
  // Set default values for main variables
  let state_code = "US";
  let industry_code = "1011";
  let reduction = 15;

  // Call refresh_page function
  refreshLineChart(state_code, industry_code, reduction);
}

/***********
  INIT
************/
//  Call init() function - this code will be executed once, during the initial page load
init();