/***********
  INIT MAP
************/
// Creating the map objects
// Income map
let incomeMap = L.map("map-income", {
  center: [38.5, -96],
  zoom: 4,
  maxZoom: 8
});

// Adding the tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO'
}).addTo(incomeMap);

// Initialize variables to make them global. It will enable cleanup of a choropleth layer and a legend during map refreshes
let incomeChoroplethLayer;
let incomeLegend;

// reset IncomeMap
function resetIncomeMap() {
  if (incomeChoroplethLayer) {
    incomeChoroplethLayer.remove();
    incomeChoroplethLayer = null;
  }

  if (incomeLegend) {
    incomeMap.removeControl(incomeLegend);
    incomeLegend = null;
  }
}

/***********
  FUNCTIONS
************/

// Refresh Income map
function refreshIncomeMap(state_code, industry_code, reduction) {
  // Reset map
  resetIncomeMap();

  // Emulate API call and get data from the predefined JSON
  let response = get_income_map;

  console.log(response);

  // Create a new choropleth layer.
  incomeChoroplethLayer = 
    // Define which property in the features to use.
    valueProperty: "per_capita_reduced_income",

    // Set the color scale.
    

    // The number of breaks in the step range
    

    // Set mode: q for quartile, e for equidistant, k for k-means


    // Define style


    // Binding a popup to each layer, show state or state + county and metrics


  }).addTo(incomeMap);

  // Focus map on a selected state or a whole mainland US
  if (state_code === "US") {
    incomeMap.setView([38.5, -96], 4);
  } else {
    incomeMap.fitBounds(incomeChoroplethLayer.getBounds());
  }
  
  // Set up the legend
  incomeLegend = L.control({ position: 'bottomright' })

  // Define a function that creates a legend
  

  // Add the legend to the map
  incomeLegend.addTo(incomeMap);
}

// Initial page load
function init() {
  // Set default values for main variables
  let state_code = "US";
  let industry_code = "1011";
  let reduction = 15;

  // Call refresh_page function
  refreshIncomeMap(state_code, industry_code, reduction);
}

/***********
  INIT
************/
//  Call init() function - this code will be executed once, during the initial page load
init();