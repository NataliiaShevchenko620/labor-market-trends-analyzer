/***********
  INIT MAP
************/
// Creating the map objects
// Employment map
let employmentMap = L.map("map-employment", {
  center: [38.5, -96],
  zoom: 4,
  maxZoom: 8
});

// Adding the tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO'
}).addTo(employmentMap);

// Initialize variables to make them global. It will enable cleanup of a choropleth layer and a legend during map refreshes
let employmentChoroplethLayer;
let employmentLegend;

// reset EmploymentMap
function resetEmploymentMap() {
  if (employmentChoroplethLayer) {
    employmentChoroplethLayer.remove();
    employmentChoroplethLayer = null;
  }

  if (employmentLegend) {
    employmentMap.removeControl(employmentLegend);
    employmentLegend = null;
  }
}

/***********
  FUNCTIONS
************/

// Refresh Employment map
function refreshEmploymentMap(state_code, industry_code, reduction) {
  // Reset map
  resetEmploymentMap();

  // Emulate API call and get data from the predefined JSON
  let response = get_employment_map;

  console.log(response);

  // Create a new choropleth layer.
  employmentChoroplethLayer = 
    // Define which property in the features to use.
    valueProperty: "reduced_industry_share",

    // Set the color scale.
    

    // The number of breaks in the step range
    

    // Set mode: q for quartile, e for equidistant, k for k-means
    

    // Define style


    // Binding a popup to each layer, show state or state + county and metrics


  }).addTo(employmentMap);

  // Focus map on a selected state or a whole mainland US
  if (state_code === "US") {
    employmentMap.setView([38.5, -96], 4);
  } else {
    employmentMap.fitBounds(employmentChoroplethLayer.getBounds());
  }
  
  // Set up the legend
  employmentLegend = L.control({ position: 'bottomright' })

  // Define a function that creates a legend


  // Add the legend to the map
  employmentLegend.addTo(employmentMap);
}

// Initial page load
function init() {
  // Set default values for main variables
  let state_code = "US";
  let industry_code = "1011";
  let reduction = 15;

  // Call refresh_page function
  refreshEmploymentMap(state_code, industry_code, reduction);
}

/***********
  INIT
************/
//  Call init() function - this code will be executed once, during the initial page load
init();